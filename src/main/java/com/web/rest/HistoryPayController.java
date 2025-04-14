package com.web.rest;

import com.web.entity.HistoryPay;
import com.web.repository.HistoryPayRepository;
import com.web.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class HistoryPayController {

    @Autowired
    private HistoryPayRepository historyPayRepository;

    @Autowired
    private UserService userService;

    @GetMapping("/all/history-pay")
    public List<HistoryPay> findByUser(){
        return historyPayRepository.findByUser(userService.getUserWithAuthority().getId());
    }

    @GetMapping("/admin/all-history-pay")
    public List<HistoryPay> findbyAdmin(@RequestParam(value = "start", required = false) Date start,
                                        @RequestParam(value = "end", required = false) Date end){
        if(start == null || end == null){
            start = Date.valueOf("2000-01-01");
            end = Date.valueOf("2100-01-01");
        }
        return historyPayRepository.findByAdmin(start, end);
    }

    @GetMapping("/admin/doanhthu")
    public List<Double> doanhThu(@RequestParam("nam") Integer nam){
        List<Double> list = new ArrayList<>();
        for(int i=1; i< 13; i++){
            Double tong = historyPayRepository.tinhDoanhThu(i, nam);
            list.add(tong);
        }
        return list;
    }

}
