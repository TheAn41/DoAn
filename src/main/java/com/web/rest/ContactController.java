package com.web.rest;

import com.web.entity.Contact;
import com.web.repository.ContactRepository;
import com.web.service.MailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.sql.Date;
import java.sql.Time;
import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class ContactController {

    @Autowired
    private ContactRepository contactRepository;

    @Autowired
    private MailService mailService;

    @GetMapping("/admin/contact")
    public List<Contact> findAll(){
        List<Contact> list =  contactRepository.findAllDesc();
        contactRepository.updateAll();
        return list;
    }

    @GetMapping("/admin/demChuaXem")
    public Double demChuaXem(){
        return contactRepository.demChuaXem();
    }

    @PostMapping("/public/createContact")
    public void create(@RequestBody Contact contact){
        contact.setCreatedDate(new Date(System.currentTimeMillis()));
        contact.setCreatedTime(new Time(System.currentTimeMillis()));
        contact.setDaXem(0);
        contactRepository.save(contact);
    }

    @GetMapping("/admin/deleteContact")
    public void delete(@RequestParam("id") Long id){
        contactRepository.deleteById(id);
    }
}
