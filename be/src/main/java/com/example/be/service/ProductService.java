package com.example.be.service;

import com.example.be.dto.request.ProductFilterRequest;
import com.example.be.dto.request.ProductRequest;
import com.example.be.dto.request.admin.ProductCreateRequest;
import com.example.be.dto.request.admin.ProductUpdateRequest;
import com.example.be.dto.response.ProductResponse;
import com.example.be.entity.Category;
import com.example.be.entity.Product;
import com.example.be.enums.ProductStatus;
import com.example.be.enums.ProductType;
import com.example.be.enums.exception.ErrorCode;
import com.example.be.exception.AppException;
import com.example.be.mapper.ProductAdminMapper;
import com.example.be.mapper.ProductMapper;
import com.example.be.mapper.detail.FilterCartridgeDetailMapper;
import com.example.be.mapper.detail.NonElectricPurifierDetailMapper;
import com.example.be.mapper.detail.PrefilterHousingDetailMapper;
import com.example.be.mapper.detail.WaterPurifierDetailMapper;
import com.example.be.repository.CategoryRepository;
import com.example.be.repository.ProductRepository;
import com.example.be.specification.ProductSpecs;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.apache.commons.lang3.tuple.Pair;


import java.math.BigDecimal;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    private final ProductMapper productMapper;
    private final ProductAdminMapper productAdminMapper;

    // inject các mappers chi tiết
    private final WaterPurifierDetailMapper waterMapper;
    private final FilterCartridgeDetailMapper filterMapper;
    private final NonElectricPurifierDetailMapper nonElectricMapper;
    private final PrefilterHousingDetailMapper prefilterMapper;

    @Transactional
    public ProductResponse createProduct(ProductRequest request) {
        // Chuyển đổi từ DTO sang entity Product
        Product product = productMapper.toEntity(request);

        Set<Category> categories = new HashSet<>();

        if (request.getCategoryIds() != null && !request.getCategoryIds().isEmpty()) {
            // Dùng repository lấy danh sách category cùng parent (custom query để fetch parent)
            List<Category> existingCategories = categoryRepository.findAllByIdWithParent(request.getCategoryIds());

            System.out.println(">> Category IDs from request: " + request.getCategoryIds());
            System.out.println(">> Categories found in DB: " + existingCategories.stream().map(Category::getId).toList());

            for (Category category : existingCategories) {
                Category current = category;
                while (current != null) {
                    categories.add(current);
                    current = current.getParent();
                }
            }
        }

        // Set danh sách categories cho product
        product.setCategories(categories);

        // Đảm bảo cập nhật ngược lại để Hibernate quản lý quan hệ 2 chiều
        for (Category category : categories) {
            category.getProducts().add(product);
        }

        // Debug log
        System.out.println("Categories set for product:");
        categories.forEach(cat -> System.out.println("Category ID: " + cat.getId() + ", Name: " + cat.getName()));

        // Lưu product, cascade sẽ tự động xử lý liên kết
        Product savedProduct = productRepository.save(product);

        return productMapper.toResponse(savedProduct, waterMapper, filterMapper, nonElectricMapper, prefilterMapper);
    }

    @Transactional
    public Page<ProductResponse> getAllProducts(Pageable pageable) {
        Page<Product> products = productRepository.findByStatusOrderByCreatedAtDesc(ProductStatus.AVAILABLE, pageable);
        return products.map(product -> productMapper.toResponse(product, waterMapper, filterMapper, nonElectricMapper, prefilterMapper));
    }

    @Transactional
    public List<ProductResponse> getNewProducts(int limit) {
        Pageable pageable = Pageable.ofSize(limit);
        Page<Product> products = productRepository.findByStatusOrderByCreatedAtDesc(ProductStatus.AVAILABLE, pageable);
        return products.map(product ->
                productMapper.toResponse(product, waterMapper, filterMapper, nonElectricMapper, prefilterMapper)
        ).getContent();
    }

    @Transactional
    public List<ProductResponse> getBestSellingProducts(int limit) {
        Pageable pageable = Pageable.ofSize(limit);
        Page<Product> products = productRepository.findByIsFeaturedTrueAndStatus(ProductStatus.AVAILABLE, pageable);
        return products.map(product ->
                productMapper.toResponse(product, waterMapper, filterMapper, nonElectricMapper, prefilterMapper)
        ).getContent();
    }

    @Transactional
    public Page<ProductResponse> getProductsByCategory(Integer categoryId, Pageable pageable) {
        Page<Product> products = productRepository.findByCategoryIdAndStatus(categoryId, ProductStatus.AVAILABLE, pageable);
        return products.map(product ->
                productMapper.toResponse(product, waterMapper, filterMapper, nonElectricMapper, prefilterMapper)
        );
    }

    @Transactional
    public ProductResponse getProductById(Integer id) {
        Product product = productRepository.findByIdAndStatus(id, ProductStatus.AVAILABLE)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy sản phẩm với id: " + id));

        return productMapper.toResponse(product, waterMapper, filterMapper, nonElectricMapper, prefilterMapper);
    }

    public Pair<BigDecimal, BigDecimal> getPriceRangeByCategory(Integer categoryId) {
        BigDecimal min = productRepository.findMinPriceByCategoryId(categoryId, ProductStatus.AVAILABLE);
        BigDecimal max = productRepository.findMaxPriceByCategoryId(categoryId, ProductStatus.AVAILABLE);
        return Pair.of(min, max);
    }

    //    xu ly sap xep
    @Transactional
    public Page<ProductResponse> getSortedProducts(String sortBy, int page, int size){
        Sort sort = switch (sortBy){
            case "priceAsc" -> Sort.by("price").ascending();
            case "priceDesc" -> Sort.by("price").descending();
            case "nameAsc" -> Sort.by("name").ascending();
            case "nameDesc" -> Sort.by("name").descending();
            case "newest" -> Sort.by("createdAt").descending(); // moi nhat
            default ->  Sort.by("createAt").descending(); //mac dinh
        };

        Pageable pageable = PageRequest.of(page, size, sort);
        Page<Product> products = productRepository.findByStatus(ProductStatus.AVAILABLE, pageable);
        return  products.map(product ->
                productMapper.toResponse(product, waterMapper, filterMapper,nonElectricMapper, prefilterMapper));
    }
//    lọc sản phẩm theo brand và danh mục theo giá
@Transactional
public Page<ProductResponse> filterProducts(ProductFilterRequest request) {

    String[] sortSplit = Optional.ofNullable(request.getSort())
            .orElse("createdAt,desc").split(",");

    if (sortSplit.length != 2) {
        throw new IllegalArgumentException("Sort format must be 'field,direction'");
    }

    Sort sort = Sort.by(Sort.Direction.fromString(sortSplit[1]), sortSplit[0]);
    Pageable pageable = PageRequest.of(request.getPage(), request.getSize(), sort);

    Specification<Product> spec = Specification.where(null);

    // Thay đổi dùng categoryId thay cho categorySlug
    if (request.getCategoryId() != null) {
        spec = spec.and(ProductSpecs.categoryId(request.getCategoryId()));
    } else if (request.getCategorySlug() != null) {
        spec = spec.and(ProductSpecs.categorySlug(request.getCategorySlug()));
    }

    spec = spec
            .and(ProductSpecs.brandIds(request.getBrandIds()))
            .and(ProductSpecs.priceBetween(request.getMinPrice(), request.getMaxPrice()))
            .and(ProductSpecs.hasFilterPairs(request.getFilterPairs()))
            .and(ProductSpecs.status(ProductStatus.AVAILABLE));

    Page<Product> products = productRepository.findAll(spec, pageable);

    return products.map(p -> productMapper.toResponse(p, waterMapper, filterMapper, nonElectricMapper, prefilterMapper));
}

    @Transactional
    public Page<ProductResponse> searchProducts(String keyword, int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());
        Specification<Product> spec = Specification
                .where(ProductSpecs.nameOrDescriptionOrBrandContains(keyword))
                .and(ProductSpecs.status(ProductStatus.AVAILABLE));

        Page<Product> products = productRepository.findAll(spec, pageable);
        return products.map(product -> productMapper.toResponse(
                product, waterMapper, filterMapper, nonElectricMapper, prefilterMapper));
    }


    // admin

    @Transactional
    public ProductResponse createProduct(ProductCreateRequest req) {
        Product product = productMapper.toEntity(req);  // đúng rồi
        Set<Category> categories = new HashSet<>();
        if (req.getCategoryIds() != null) {
            categoryRepository.findAllById(req.getCategoryIds())
                    .forEach(categories::add);
        }
        product.setCategories(categories);
        categories.forEach(cat -> cat.getProducts().add(product));
        Product saved = productRepository.save(product);
        return productAdminMapper.toResponse(saved);  // phải dùng productAdminMapper
    }

    @Transactional
    public ProductResponse updateProduct(Integer id, ProductUpdateRequest req) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.PRODUCT_NOT_FOUND));

        productMapper.updateEntity(product, req);  // giả sử bạn có method updateEntity trong adminMapper
        Set<Category> categories = new HashSet<>();
        if (req.getCategoryIds() != null) {
            categoryRepository.findAllById(req.getCategoryIds())
                    .forEach(categories::add);
        }
        product.setCategories(categories);
        Product saved = productRepository.save(product);
        return productAdminMapper.toResponse(saved);
    }

    @Transactional
    public Page<ProductResponse> getAllForAdmin(int page, int size, String sortStr) {
        String[] parts = sortStr.split(",");
        Sort sort = Sort.by(Sort.Direction.fromString(parts[1]), parts[0]);
        Pageable pageable = PageRequest.of(page, size, sort);
        return productRepository.findAll(pageable)
                .map(productAdminMapper::toResponse);
    }

    @Transactional
    public ProductResponse getProductByIdAdmin(Integer id) {
        Product p = productRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.PRODUCT_NOT_FOUND));
        return productAdminMapper.toResponse(p);
    }

    @Transactional
    public void toggleProductStatus(Integer id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.PRODUCT_NOT_FOUND));

        ProductStatus currentStatus = product.getStatus();
        if (currentStatus == ProductStatus.AVAILABLE) {
            product.setStatus(ProductStatus.OUT_OF_STOCK);
        } else if (currentStatus == ProductStatus.OUT_OF_STOCK) {
            product.setStatus(ProductStatus.AVAILABLE);
        }
        // Nếu DISCONTINUED thì giữ nguyên hoặc xử lý khác nếu muốn

        productRepository.save(product);
    }

    @Transactional
    public void deleteProduct(Integer id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.PRODUCT_NOT_FOUND));
        productRepository.delete(product); // xóa thật sự khỏi database
    }

}





//    @Transactional
//    public Page<ProductResponse> searchProducts(String keyword, int page, int size) {
//        Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());
//        Specification<Product> spec = Specification
//                .where(ProductSpecs.nameOrDescriptionContains(keyword))
//                .and(ProductSpecs.status(ProductStatus.AVAILABLE)); // chỉ lấy sản phẩm có sẵn
//
//        Page<Product> products = productRepository.findAll(spec, pageable);
//        return products.map(product -> productMapper.toResponse(
//                product, waterMapper, filterMapper, nonElectricMapper, prefilterMapper));
//    }