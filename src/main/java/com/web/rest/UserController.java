package com.web.rest;

import com.web.dto.CustomUserDetails;
import com.web.entity.User;
import com.web.jwt.JwtTokenProvider;
import com.web.repository.UserRepository;
import com.web.service.MailService;
import com.web.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.sql.Date;
import java.sql.Time;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class UserController {

    private final UserRepository userRepository;

    private final JwtTokenProvider jwtTokenProvider;

    private final UserService userService;

    private final MailService mailService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public UserController(UserRepository userRepository, JwtTokenProvider jwtTokenProvider, UserService userService, MailService mailService) {
        this.userRepository = userRepository;
        this.jwtTokenProvider = jwtTokenProvider;
        this.userService = userService;
        this.mailService = mailService;
    }
    @PostMapping("/authenticate")
    public ResponseEntity<String> authenticate(@RequestBody User user) throws URISyntaxException {
        Optional<User> users = userService.findByUsernameAndPassword(user.getUsername(), user.getPassword());
        System.out.println(users);
        if(users.isPresent() == false){
            return ResponseEntity.status(401)
                    .body(null);
        }
        CustomUserDetails customUserDetails = new CustomUserDetails(users.get());
        String token = jwtTokenProvider.generateToken(customUserDetails);
        return ResponseEntity
                .created(new URI("/api/authen/" ))
                .body(token);
    }

    @PostMapping("/register")
    public ResponseEntity<Integer> save(@RequestBody User user) throws URISyntaxException {
        if(userRepository.findByUsername(user.getUsername()).isPresent() == true){
            HttpHeaders headers = new HttpHeaders();
            return ResponseEntity.status(500).headers(headers)
                    .body(2);
        }
        User result = userService.save(user);
        mailService.sendEmail(user.getUsername(), "Xác nhận tài khoản của bạn","Cảm ơn bạn đã tin tưởng và xử dụng dịch vụ của chúng tôi:<br>" +
                "Để kích hoạt tài khoản của bạn, hãy nhấp vào nút bên dưới<br><br>" +
                "<a href=\"http://localhost:8080/active?key="+result.getActivation_key()+"\" style=\"background-color: #fcf003; padding: 10px; color: #fff; font-size: 18px; font-weight: bold;\">Xác nhận tài khoản</a>",false, true);
        System.out.println(result);
        return ResponseEntity
                .created(new URI("/api/save/" + result.getId()))
                .body(0);
    }

    @PostMapping("/userlogged")
    public User getUserLogged(){
        return userService.getUserWithAuthority();
    }


    @PostMapping("/admin/activeUser")
    public void activeOrUnactiveUser(@RequestParam("id") Long id){
        User user = userRepository.findById(id).get();
        if(user.getActived() == 1){
            user.setActived(0);
        }
        else{
            user.setActived(1);
        }
        userRepository.save(user);
    }

    @PostMapping("/resetpass")
    public ResponseEntity<String> forgotpass(@RequestBody String email) throws URISyntaxException {
        Optional<User> user = userRepository.findByUsernameLogin(email);
        if(user.isPresent() == false){
            return ResponseEntity.status(500)
                    .body("this email not exist");
        }
        else{
            String newPass = userService.randomPass();
            User users = user.get();
            users.setPassword(passwordEncoder.encode(newPass));
            userRepository.save(users);
            mailService.sendEmail(email,"Đặt lại mật khẩu","Mật khẩu mới của bạn là: "+newPass,false, false);
        }
        return ResponseEntity.status(200)
                .body("check your email");
    }

    @GetMapping("/public/findUserNotDtoById")
    public User findUserById(@RequestParam("id") Long id) {
        return userRepository.findById(id).get();
    }


    @PostMapping("/all/changePassword")
    public void changePassword(@RequestParam("old") String oldPass, @RequestParam("new") String newPass) throws Exception {
        User user = userService.getUserWithAuthority();
        if(passwordEncoder.matches(oldPass, user.getPassword())){
            user.setPassword(passwordEncoder.encode(newPass));
        }
        else{
            throw new Exception("password khong dung");
        }
        userRepository.save(user);
    }

    @PostMapping("/user/updateinfor")
    public void updateInfor(@RequestBody User user){
        User userUpdate = userService.getUserWithAuthority();
        userUpdate.setFullname(user.getFullname());
        userUpdate.setPhone(user.getPhone());
        userUpdate.setLinkFace(user.getLinkFace());
        userUpdate.setAvatar(user.getAvatar());
        userRepository.save(userUpdate);
    }

    @PostMapping("/admin/addAdmin")
    public ResponseEntity<Integer> addAdmin(@RequestBody User user) throws URISyntaxException {
        if(userRepository.countUserByUserName(user.getUsername()) > 0){
            HttpHeaders headers = new HttpHeaders();
            headers.add("username already exist ", user.getUsername());
            return ResponseEntity.status(300).headers(headers)
                    .body(1);
        }
        user.setActived(1);
        user.setCreatedDate(new Date(System.currentTimeMillis()));
        user.setCreatedTime(new Time(System.currentTimeMillis()));
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        User result = userRepository.save(user);
        System.out.println(result);
        return ResponseEntity
                .created(new URI("/api/save/" + result.getId()))
                .body(0);
    }

    @GetMapping("/admin/getUserByRole")
    public List<User> getUserNotAdmin(@RequestParam(value = "role", required = false) String role) {
        if(role == null){
            return userRepository.findAll();
        }
        return userRepository.getUserByRole(role);
    }


    @GetMapping("/admin/checkroleAdmin")
    public void checkroleAdmin(){
        System.out.println("admin role");
    }

    @GetMapping("/user/checkroleUser")
    public void checkroleUser(){
        System.out.println("user role");
    }

    @GetMapping("/all/checkAllRole")
    public void checkAllRole(){
        System.out.println("user role");
    }

    @GetMapping("/admin/soLuongTaiKhoan")
    public Long soLuongTaiKhoan(){
        return userRepository.count();
    }
}
