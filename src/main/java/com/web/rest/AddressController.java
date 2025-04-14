package com.web.rest;
import com.web.entity.Districts;
import com.web.entity.Province;
import com.web.entity.Wards;
import com.web.repository.DistrictsRepository;
import com.web.repository.ProvinceRepository;
import com.web.repository.WardsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class AddressController {

    @Autowired
    private ProvinceRepository provinceRepository;

    @Autowired
    private DistrictsRepository districtsRepository;

    @Autowired
    private WardsRepository wardsRepository;

    @GetMapping("/public/province")
    public List<Province> findAllProvince(){
        return provinceRepository.findAll();
    }

    @GetMapping("/public/districts")
    public List<Districts> getTownByProvinceId(@RequestParam("id") Long id){
        return districtsRepository.findByProvin(id);
    }

    @GetMapping("/public/wards")
    public List<Wards> getVillageByTownId(@RequestParam("id") Long id){
        return wardsRepository.findByDis(id);
    }

    @GetMapping("/public/wardsById")
    public Wards findById(@RequestParam("id") Long id){
        return wardsRepository.findById(id).get();
    }
    @GetMapping("/public/districtsById")
    public Districts districtsById(@RequestParam("id") Long id){
        return districtsRepository.findById(id).get();
    }
    @GetMapping("/public/provinceById")
    public Province provinceById(@RequestParam("id") Long id){
        return provinceRepository.findById(id).get();
    }

}
