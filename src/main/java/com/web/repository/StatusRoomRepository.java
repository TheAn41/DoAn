package com.web.repository;

import com.web.entity.Province;
import com.web.entity.StatusRoom;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StatusRoomRepository extends JpaRepository<StatusRoom, Long> {
}
