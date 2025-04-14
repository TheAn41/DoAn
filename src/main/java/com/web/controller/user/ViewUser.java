package com.web.controller.user;

import com.web.entity.User;
import com.web.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class ViewUser {

    @Autowired
    private UserRepository userRepository;

    @RequestMapping(value = {"/chitietphong"}, method = RequestMethod.GET)
    public String chitietphong() {
        return "user/chitietphong";
    }

    @RequestMapping(value = {"/chitiettintuc"}, method = RequestMethod.GET)
    public String chitiettintuc() {
        return "user/chitiettintuc";
    }

    @RequestMapping(value = {"/dangky"}, method = RequestMethod.GET)
    public String dangky() {
        return "user/dangky";
    }

    @RequestMapping(value = {"/danhsachphong"}, method = RequestMethod.GET)
    public String danhsachphong() {
        return "user/danhsachphong";
    }

    @RequestMapping(value = {"/index","/","/trang-chu"}, method = RequestMethod.GET)
    public String index() {
        return "user/index";
    }

    @RequestMapping(value = {"/login"}, method = RequestMethod.GET)
    public String login() {
        return "user/login";
    }

    @RequestMapping(value = {"/phongdanhmuc"}, method = RequestMethod.GET)
    public String phongdanhmuc() {
        return "user/phongdanhmuc";
    }

    @RequestMapping(value = {"/quenmatkhau"}, method = RequestMethod.GET)
    public String quenmatkhau() {
        return "user/quenmatkhau";
    }

    @RequestMapping(value = {"/quydinh"}, method = RequestMethod.GET)
    public String quydinh() {
        return "user/quydinh";
    }

    @RequestMapping(value = {"/tintuc"}, method = RequestMethod.GET)
    public String tintuc() {
        return "user/tintuc";
    }

    @RequestMapping(value = {"/yeuthich"}, method = RequestMethod.GET)
    public String yeuthich() {
        return "user/yeuthich";
    }


    @RequestMapping(value = "/active", method = RequestMethod.GET)
    public String finishRegis(@RequestParam("key") String key){
        User user = userRepository.getUserByActivationKey(key).get();
        user.setActivation_key(null);
        user.setActived(1);
        userRepository.save(user);
        return "redirect:login";
    }
}
