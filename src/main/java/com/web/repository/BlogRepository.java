package com.web.repository;

import com.web.entity.Blog;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface BlogRepository extends JpaRepository<Blog, Long> {

    @Query(value = "select * from blog order by id desc", nativeQuery = true)
    public List<Blog> findAllDesc();

    @Query(value = "select b from Blog b where b.user.id = ?1 order by b.id desc ")
    public List<Blog> blogCuaToi(Long userId);

    @Query(value = "select b from Blog b where b.user.id = ?1 and b.viPham = ?2 order by b.id desc ")
    public List<Blog> blogCuaToiAndViPham(Long userId, Integer trangthau);

    @Query(value = "select b.* from blog b where b.vi_pham = 0 order by b.id desc limit 6", nativeQuery = true)
    public List<Blog> baiVietMoiNhat();

    @Query(value = "select b from Blog b where b.viPham = 0 order by b.id desc ")
    public Page<Blog> tinTucNguoiDung(Pageable pageable);
}

