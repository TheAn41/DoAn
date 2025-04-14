package com.web.repository;

import com.web.entity.ImageRoom;
import com.web.entity.Province;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ImageRoomRepository extends JpaRepository<ImageRoom, Long> {

    @Query("select i from ImageRoom i where i.room.id = ?1")
    public List<ImageRoom> findByRoom(Long roomId);
}
