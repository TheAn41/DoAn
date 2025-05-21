package com.web.rest;

import com.web.dto.BaiVietTheoNgayDTO;
import com.web.entity.Blog;
import com.web.repository.BlogRepository;
import com.web.service.BlogService;
import com.web.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.sql.Date;
import java.sql.Time;
import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class BlogController {
    private static final Logger logger = LoggerFactory.getLogger(BlogController.class);

    @Autowired
    private BlogRepository blogRepository;

    @Autowired
    private UserService userService;

    private final BlogService blogService;

    public BlogController(BlogService blogService) {
        this.blogService = blogService;
    }

    @PostMapping("/all/addBlog")
    public void save(@RequestBody Blog blog){
        if(blog.getId() == null){
            blog.setCreatedDate(new Date(System.currentTimeMillis()));
            blog.setCreatedTime(new Time(System.currentTimeMillis()));
            blog.setUser(userService.getUserWithAuthority());
            blog.setViPham(0);
        }
        else{
            Blog b = blogRepository.findById(blog.getId()).get();
            blog.setCreatedDate(b.getCreatedDate());
            blog.setCreatedTime(b.getCreatedTime());
            blog.setUser(b.getUser());
            blog.setViPham(b.getViPham());
            if(blog.getImageBanner() == null){
                blog.setImageBanner(b.getImageBanner());
            }
        }
        blogRepository.save(blog);
    }

    @GetMapping("/public/allBlog")
    public List<Blog> findAll(){
        return blogRepository.findAllDesc();
    }


    @GetMapping("/user/blogCuaToi")
    public List<Blog> blogCuaToi(@RequestParam(value = "id", required = false) Integer vipham){
        if(vipham != null){
            return blogRepository.blogCuaToiAndViPham(userService.getUserWithAuthority().getId(), vipham);
        }
        return blogRepository.blogCuaToi(userService.getUserWithAuthority().getId());
    }

    @DeleteMapping("/user/xoaBlog")
    public void xoaBlog(@RequestParam("id") Long id){
        Blog blog = blogRepository.findById(id).get();
        if (blog.getUser().getId() != userService.getUserWithAuthority().getId())
        {
            return;
        }
        blogRepository.deleteById(id);
    }

    @GetMapping("/public/blogById")
    public Blog findById(@RequestParam("id") Long id){
        return blogRepository.findById(id).get();
    }

    @DeleteMapping("/admin/deleteBlog")
    public void deleteCategory(@RequestParam("id") Long id){
        blogRepository.deleteById(id);
    }

    @GetMapping("/public/allbloguser")
    public Page<Blog> findAllPage(Pageable pageable){
        return blogRepository.findAll(pageable);
    }

    @GetMapping("/admin/soLuongBaiViet")
    public Long soLuongBaiViet(){
        return blogRepository.count();
    }

    @GetMapping("/public/baiVietMoiNhat")
    public List<Blog> baiDangMoiNhat(){

        return blogRepository.baiVietMoiNhat();
    }

    @GetMapping("/public/tinTucNguoiDung")
    public Page<Blog> tinTuc(Pageable pageable){
        return blogRepository.tinTucNguoiDung(pageable);
    }

    @PostMapping("/admin/khoaBaiViet")
    public void khoaBaiViet(@RequestParam(value = "id") Long id){
        Blog blog = blogRepository.findById(id).orElse(null);
        if(blog.getViPham() == 0){
            blog.setViPham(1);
            blogRepository.save(blog);
            return;
        }
        if(blog.getViPham() == 1){
            blog.setViPham(0);
            blogRepository.save(blog);
            return;
        }
    }

    @GetMapping("/admin/soLuongBaiVietTheoNgay")
    public List<BaiVietTheoNgayDTO> thongKeTheoNgay() {
        return blogService.thongKeBaiVietTheoThu();
    }
}
