package com.web.repository;

import com.web.entity.Category;
import com.web.entity.Province;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface CategoryRepository extends JpaRepository<Category, Long> {

    @Query("select c from Category c where c.deleted = 0 order by c.id desc ")
    public List<Category> findAllDesc();

    @Query("select c from Category c where c.deleted = 0 and c.id = ?1")
    public Optional<Category> findById(Long id);

    @Query(value = "SELECT c.id, c.name, (SELECT COUNT(r.id) from room r where r.category_id = c.id and r.status_room = 1) from category c where c.deleted != 1", nativeQuery = true)
    public List<Object[]> tatCaDanhMuc();

}
