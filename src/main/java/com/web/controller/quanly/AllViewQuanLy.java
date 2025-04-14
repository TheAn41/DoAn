package com.web.controller.quanly;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class AllViewQuanLy {

    @RequestMapping(value = {"/quanly/baiviet"}, method = RequestMethod.GET)
    public String baiviet() {
        return "quanly/baiviet";
    }

    @RequestMapping(value = {"/quanly/dangtin"}, method = RequestMethod.GET)
    public String dangtin() {
        return "quanly/dangtin";
    }

    @RequestMapping(value = {"/quanly/lienhe"}, method = RequestMethod.GET)
    public String lienhe() {
        return "quanly/lienhe";
    }

    @RequestMapping(value = {"/quanly/quanlytin"}, method = RequestMethod.GET)
    public String quanlytin() {
        return "quanly/quanlytin.html";
    }

    @RequestMapping(value = {"/quanly/taikhoan"}, method = RequestMethod.GET)
    public String taikhoan() {
        return "quanly/taikhoan";
    }

    @RequestMapping(value = {"/quanly/thembaiviet"}, method = RequestMethod.GET)
    public String thembaiviet() {
        return "quanly/thembaiviet";
    }

    @RequestMapping(value = {"/quanly/lichsunap"}, method = RequestMethod.GET)
    public String lichsunap() {
        return "quanly/lichsunap";
    }

    @RequestMapping(value = {"/quanly/naptien"}, method = RequestMethod.GET)
    public String naptien() {
        return "quanly/naptien";
    }

    @RequestMapping(value = {"/quanly/thanhcong"}, method = RequestMethod.GET)
    public String thanhcong() {
        return "quanly/thanhcong";
    }
}
