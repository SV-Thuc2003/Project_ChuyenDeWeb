package com.example.be.dto.request;

import org.apache.commons.lang3.tuple.Pair;
import lombok.*;

import java.math.BigDecimal;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor @AllArgsConstructor @Builder
public class ProductFilterRequest {
    private Integer categoryId;
    private String categorySlug;
    private List<Integer> brandIds;
    private BigDecimal minPrice;
    private BigDecimal maxPrice;
    //    private List<Pair<Integer, String>> filterPairs; // [(3,"RO"), (4,"5 lõi")]
    private int page = 0;
    private int size = 12;
    private String sort = "createdAt,desc";
    private List<FilterPair> filterPairs; // đại diện cho các bộ lọc tùy biến

    @Data
    public static class FilterPair {
        private Integer filterId; // ví dụ: Công nghệ lọc = 1
        private String value;     // ví dụ: RO
    }
}
