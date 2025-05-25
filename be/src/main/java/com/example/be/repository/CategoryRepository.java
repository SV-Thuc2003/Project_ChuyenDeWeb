package com.example.be.repository;

import com.example.be.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.List;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Integer> {
//    Collection<Ca> findAllById(List<Integer> categoryIds);
}

