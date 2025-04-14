package com.web.controller.admin;

import com.web.entity.User;
import com.web.repository.UserRepository;
import com.web.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class AllViewAdminController {

    @RequestMapping(value = {"/admin/addblog"}, method = RequestMethod.GET)
    public String addblog() {
        return "admin/addblog";
    }

    @RequestMapping(value = {"/admin/adduser"}, method = RequestMethod.GET)
    public String adduser() {
        return "admin/adduser";
    }

    @RequestMapping(value = {"/admin/blog"}, method = RequestMethod.GET)
    public String blog() {
        return "admin/blog";
    }

    @RequestMapping(value = {"/admin/category"}, method = RequestMethod.GET)
    public String category() {
        return "admin/category";
    }

    @RequestMapping(value = {"/admin/index"}, method = RequestMethod.GET)
    public String index() {
        return "admin/index";
    }

    @RequestMapping(value = {"/admin/tindang"}, method = RequestMethod.GET)
    public String tindang() {
        return "admin/tindang";
    }

    @RequestMapping(value = {"/admin/user"}, method = RequestMethod.GET)
    public String user() {
        return "admin/user";
    }

    @RequestMapping(value = {"/admin/doanhthu"}, method = RequestMethod.GET)
    public String doanhthu() {
        return "admin/doanhthu";
    }

    @RequestMapping(value = {"/admin/lichsunap"}, method = RequestMethod.GET)
    public String lichsunap() {
        return "admin/lichsunap";
    }

}
