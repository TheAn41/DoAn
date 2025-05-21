package com.web.service;

import com.web.dto.SavedFilterDto;
import com.web.entity.Room;
import com.web.entity.SavedFilter;
import com.web.entity.User;
import com.web.repository.RoomRepository;
import com.web.repository.SavedFilterRepository;
import com.web.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;


import java.sql.Date;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class SavedFilterService {
    private final SavedFilterRepository savedFilterRepository;
    private final MailService mailService;

    public void checkAndNotifyUsers(Room newRoom) {
        List<SavedFilter> allFilters = savedFilterRepository.findAll();

        for (SavedFilter filter : allFilters) {
            if (isMatch(filter, newRoom)) {
                User user = filter.getUser();
                if (user != null && user.getUsername() != null) {
                    sendEmailWithDetails(user, newRoom);
                }
            }
        }
    }

    private boolean isMatch(SavedFilter filter, Room room) {
        if (filter.getMinPrice() != null && room.getPrice() < filter.getMinPrice()) return false;
        if (filter.getMaxPrice() != null && room.getPrice() > filter.getMaxPrice()) return false;
        if (filter.getMinArea() != null && room.getArea() < filter.getMinArea()) return false;
        if (filter.getMaxArea() != null && room.getArea() > filter.getMaxArea()) return false;

        if (filter.getCategoryId() != null && !filter.getCategoryId().equals(room.getCategory().getId())) return false;
        if (filter.getWardId() != -1 && !filter.getWardId().equals(room.getWards().getId())) return false;

        if (filter.getTv() != null && !filter.getTv().equals(room.getTv()) ) return false;
        if (filter.getFridge() != null && !filter.getFridge().equals(room.getFridge())) return false;
        if (filter.getBed() != null && !filter.getBed().equals(room.getBed()) ) return false;
        if (filter.getAirConditioner() != null && !filter.getAirConditioner().equals(room.getAirConditioner())) return false;
        if (filter.getHeater() != null && !filter.getHeater().equals(room.getHeater())) return false;
        if (filter.getWashingMachine() != null && !filter.getWashingMachine().equals(room.getWashingMachine())) return false;
        if (filter.getKitchen() != null && !filter.getKitchen().equals(room.getKitchen())) return false;
        if (filter.getWifi() != null && !filter.getWifi().equals(room.getWifi())) return false;
        if (filter.getParking() != null && !filter.getParking().equals(room.getParking())) return false;
        if (filter.getClosedWc() != null && !filter.getClosedWc().equals(room.getClosedWc())) return false;
        if (filter.getNumberOfPeople() != null && room.getNumberOfPeople() > filter.getNumberOfPeople()) return false;
        if (filter.getNumberOfRoom() != null && room.getNumberOfRoom() > filter.getNumberOfRoom()) return false;
        if (filter.getNumberOfWc() != null  && room.getNumberOfWc() > filter.getNumberOfWc()) return false;
        if (filter.getDirection() != null && !filter.getDirection().equals(room.getDirection())) return false;
        if (filter.getFrontWidth() != null && room.getFrontWidth() > filter.getFrontWidth()) return false;
        if (filter.getService() != null && !filter.getService().equals(room.getService())) return false;

        Date roomStartDate = room.getStartDate();
        if (filter.getStartDateFrom() != null && roomStartDate.before(filter.getStartDateFrom())) {
            return false;
        }
        if (filter.getStartDateTo() != null && roomStartDate.after(filter.getStartDateTo())) {
            return false;
        }

        return true;
    }

    private void sendEmailWithDetails(User user, Room room) {
        String to = user.getUsername(); // email
        String subject = "🔔 Có phòng trọ mới phù hợp với tiêu chí bạn đã lưu!";
        String content = "<h3>Phòng trọ mới: " + room.getTitleRoom() + "</h3>"
                + "<p>💰 Giá: " + room.getPrice() + " VNĐ</p>"
                + "<p>📐 Diện tích: " + room.getArea() + " m²</p>"
                + "<p>📍 Địa chỉ: " + room.getStreet() + "</p>"
                + "<p><a href='http://localhost:8080/chitietphong?id=" + room.getId() + "'>👉 Xem chi tiết phòng</a></p>";

        // Gửi email

            mailService.sendEmail(to, subject, content, false, true);

    }
}
