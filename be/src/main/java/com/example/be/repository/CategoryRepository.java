package com.example.be.repository;

import com.example.be.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Integer> {
    Optional<Category> findBySlug(String slug);

    List<Category> findByParentId(Integer parentId);
    @Query("SELECT c FROM Category c LEFT JOIN FETCH c.parent WHERE c.id IN :ids")
    List<Category> findAllByIdWithParent(@org.springframework.data.repository.query.Param("ids") List<Integer> ids);

}

