package com.web.repository;

import com.web.entity.SavedFilter;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SavedFilterRepository extends JpaRepository<SavedFilter, Long> {
    List<SavedFilter> findByUserId(Long userId);

    void deleteByUserId(Long userId);

    void deleteById(Long id);
}
