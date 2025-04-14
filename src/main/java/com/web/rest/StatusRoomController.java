package com.web.rest;

import com.web.entity.StatusRoom;
import com.web.repository.StatusRoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class StatusRoomController {

    @Autowired
    private StatusRoomRepository statusRoomRepository;

    @GetMapping("/public/allStatusRoom")
    public List<StatusRoom> allStatusRoom(){
        return statusRoomRepository.findAll();
    }
}
