package com.web.service;

import com.web.config.SecurityUtils;
import com.web.dto.CustomUserDetails;
import com.web.entity.Authority;
import com.web.entity.User;
import com.web.repository.AuthorityRepository;
import com.web.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Date;
import java.sql.Time;
import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@Service
@Transactional
public class UserService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthorityRepository authorityRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<User> user = userRepository.findByUsername(username);
        if (user.get() == null) {
            throw new UsernameNotFoundException(username);
        }
        return new CustomUserDetails(user.get());
    }

    public User getUserWithAuthority(){
        Long id =Long.valueOf(SecurityUtils.getCurrentUserLogin().get());
        return userRepository.findById(id).get();
    }

    public User save(User user){
        Authority authority = authorityRepository.findByName(Contains.ROLE_USER);
        Set<Authority> set = new HashSet<>();
        set.add(authority);
        user.setAuthorities(set);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setActived(0);
        user.setAmount(0D);
        user.setActivation_key(randomKey());
        user.setCreatedDate(new Date(System.currentTimeMillis()));
        user.setCreatedTime(new Time(System.currentTimeMillis()));
        User result = userRepository.save(user);
        return user;
    }

    public void update(User user){
        userRepository.save(user);
    }

    public Optional<User> findByUsernameAndPassword(String username, String password){
        Optional<User> user = userRepository.findByUsernameLogin(username);
        if(user.isPresent()){
            if(passwordEncoder.matches(password, user.get().getPassword())){
                return user;
            }
        }
        return null;
    }

    public String randomKey(){
        String str = "qwert1yui2op3as4dfg5hj6klzx7cvb8nmQ9WE0RTYUIOPASDFGHJKLZXCVBNM";
        Integer length = str.length()-1;
        StringBuilder stringBuilder = new StringBuilder("");
        for(int i=0; i<10; i++){
            Integer ran = (int)(Math.random()*length);
            stringBuilder.append(str.charAt(ran));
        }
        return String.valueOf(stringBuilder);
    }

    public boolean checkEmailexist(String email){
        if(userRepository.countUserByEmail(email)>0){
            return true;
        }
        return false;
    }


    public String randomPass(){
        String str = "qwert1yui2op3as4dfg5hj6klzx7cvb8nmQ9WE0RTYUIOPASDFGHJKLZXCVBNM";
        Integer length = str.length()-1;
        StringBuilder stringBuilder = new StringBuilder("");
        for(int i=0; i<7; i++){
            Integer ran = (int)(Math.random()*length);
            stringBuilder.append(str.charAt(ran));
        }
        return String.valueOf(stringBuilder);
    }
}

