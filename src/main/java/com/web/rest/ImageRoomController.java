package com.web.rest;

import com.web.entity.ImageRoom;
import com.web.repository.ImageRoomRepository;
import com.web.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class ImageRoomController {

    @Autowired
    private ImageRoomRepository imageRoomRepository;

    @Autowired
    private UserService userService;

    @PostMapping("/all/image-room-upload")
    public void save(@RequestBody ImageRoom imageRoom){
        imageRoomRepository.save(imageRoom);
    }

    @GetMapping("/public/listAnhPhong")
    public List<ImageRoom> findByRoom(@RequestParam(value = "id") Long idPhong){
        return imageRoomRepository.findByRoom(idPhong);
    }

    @DeleteMapping("/user/xoaAnhPhong")
    public void xoaPhong(@RequestParam(value = "id") Long id){
        ImageRoom imageRoom = imageRoomRepository.findById(id).orElse(null);
        if(imageRoom == null){
            return;
        }
        if(userService.getUserWithAuthority().getId() != imageRoom.getRoom().getUser().getId()){
            return;
        }
        imageRoomRepository.delete(imageRoom);
    }
}
