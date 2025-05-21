package com.web.repository;

import com.web.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigInteger;
import java.util.List;
import java.util.Optional;

@SuppressWarnings("unused")
@Repository
public interface UserRepository extends JpaRepository<User,Long> {

    @Query(value = "select u.* from user u",nativeQuery = true)
    Page<User> findAll(Pageable pageable);

    @Query(value = "select u.* from user u where u.username = ?1 and u.password = ?2 and actived = 1", nativeQuery = true)
    Optional<User> findByUsernameAndPassword(String username, String password);

    @Query(value = "select u.* from user u where u.username = ?1", nativeQuery = true)
    Optional<User> findByUsername(String username);

    @Query(value = "select u.* from user u where (u.username = ?1 or u.phone = ?1) and actived = 1", nativeQuery = true)
    Optional<User> findByUsernameLogin(String username);

    @Query(value = "select u.* from user u where u.id = ?1", nativeQuery = true)
    Optional<User> findById(Long id);


    @Query(value = "select count(id) from user WHERE email =?1", nativeQuery = true)
    Long countUserByEmail(String email);

    @Query(value = "select * from user WHERE activation_key =?1", nativeQuery = true)
    Optional<User> getUserByActivationKey(String activationkey);

    @Query(value = "select * from user WHERE email =?1", nativeQuery = true)
    Optional<User> getUserByEmail(String email);

    @Query(value = "select * from user WHERE remember_key =?1", nativeQuery = true)
    Optional<User> getUserByRememberKey(String key);

    @Query(value = "select * from user WHERE username =?1", nativeQuery = true)
    Optional<User> getUserByUserName(String username);

    @Query(value = "select u.* from user u inner join user_authority a on a.user_id = u.id where a.authority_name != ?1",nativeQuery = true)
    Page<User> findUserNotAdmin(String role,Pageable pageable);

    @Query("select count(u.id) from User u where u.username = ?1")
    public Double countUserByUserName(String username);

    @Query(value = "select u.* from user u inner join user_authority a on a.user_id = u.id where a.authority_name = ?1 ",nativeQuery = true)
    List<User> getUserByRole(String role);

}
