package com.web.repository;

import com.web.entity.FavoriteRoom;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface FavoriteRepository extends JpaRepository<FavoriteRoom, Long> {
    List<FavoriteRoom> findByIdUser(Long id);
    
    Optional<FavoriteRoom> findByIdUserAndIdRoom(Long idUser, Long idRoom);

}
