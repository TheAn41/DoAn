package com.web.rest;

import com.web.dto.CustomUserDetails;
import com.web.dto.SavedFilterDto;
import com.web.entity.SavedFilter;
import com.web.entity.User;
import com.web.jwt.JwtTokenProvider;
import com.web.repository.SavedFilterRepository;
import com.web.repository.UserRepository;
import com.web.service.SavedFilterService;
import com.web.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;


import java.sql.Date;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.List;
@Transactional
@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class SavedFilterController {
    private final SavedFilterRepository filterRepository;
    private final JwtTokenProvider tokenProvider;
    private final UserRepository userRepository;
    private final SavedFilterService savedFilterService;
    private final UserService userService;

    // Tạo bộ lọc mới
    @PostMapping("/public/saveFilter")
    public ResponseEntity<SavedFilter> save(@RequestBody SavedFilterDto dto) {
        try {
            User user = userService.getUserWithAuthority();
            SavedFilter filter;
            if (dto.getId() == null) {
                // Tạo mới filter
                filter = SavedFilter.builder()
                        .minPrice(dto.getMinPrice())
                        .maxPrice(dto.getMaxPrice())
                        .minArea(dto.getMinArea())
                        .maxArea(dto.getMaxArea())
                        .startDateFrom(dto.getStartDateFrom())
                        .startDateTo(dto.getStartDateTo())
                        .provinceId(dto.getProvinceId())
                        .districtId(dto.getDistrictId())
                        .wardId(dto.getWardId())
                        .categoryId(dto.getCategoryId())
                        .tv(dto.getTv())
                        .fridge(dto.getFridge())
                        .bed(dto.getBed())
                        .airConditioner(dto.getAirConditioner())
                        .heater(dto.getHeater())
                        .washingMachine(dto.getWashingMachine())
                        .kitchen(dto.getKitchen())
                        .wifi(dto.getWifi())
                        .parking(dto.getParking())
                        .closedWc(dto.getClosedWc())
                        .numberOfPeople(dto.getNumberOfPeople())
                        .direction(dto.getDirection())
                        .numberOfRoom(dto.getNumberOfRoom())
                        .numberOfWc(dto.getNumberOfWc())
                        .frontWidth(dto.getFrontWidth())
                        .service(dto.getService())
                        .user(user)
                        .createdDate(new Date(System.currentTimeMillis()))
                        .build();
            } else {
                // Cập nhật filter, giữ lại các trường hệ thống
                SavedFilter oldFilter = filterRepository.findById(dto.getId())
                        .orElseThrow(() -> new RuntimeException("Filter not found with id = " + dto.getId()));

                filter = SavedFilter.builder()
                        .id(oldFilter.getId())
                        .minPrice(dto.getMinPrice())
                        .maxPrice(dto.getMaxPrice())
                        .minArea(dto.getMinArea())
                        .maxArea(dto.getMaxArea())
                        .startDateFrom(dto.getStartDateFrom())
                        .startDateTo(dto.getStartDateTo())
                        .provinceId(dto.getProvinceId())
                        .districtId(dto.getDistrictId())
                        .wardId(dto.getWardId())
                        .categoryId(dto.getCategoryId())
                        .tv(dto.getTv())
                        .fridge(dto.getFridge())
                        .bed(dto.getBed())
                        .airConditioner(dto.getAirConditioner())
                        .heater(dto.getHeater())
                        .washingMachine(dto.getWashingMachine())
                        .kitchen(dto.getKitchen())
                        .wifi(dto.getWifi())
                        .parking(dto.getParking())
                        .closedWc(dto.getClosedWc())
                        .numberOfPeople(dto.getNumberOfPeople())
                        .direction(dto.getDirection())
                        .numberOfRoom(dto.getNumberOfRoom())
                        .numberOfWc(dto.getNumberOfWc())
                        .frontWidth(dto.getFrontWidth())
                        .service(dto.getService())
                        .user(oldFilter.getUser ())
                        .createdDate(oldFilter.getCreatedDate())
                        .build();
            }
            SavedFilter savedFilter = filterRepository.save(filter);
            return ResponseEntity.ok(savedFilter);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(null);
        }
    }

    @GetMapping("public/getFilterByUser/{userId}")
    public List<SavedFilter> getFiltersByUser(@PathVariable Long userId) {
        return filterRepository.findByUserId(userId);
    }

    @DeleteMapping("/user/deleteFilterByUserId/{userId}")
    public void deleteByUserId(@PathVariable Long userId) {
        filterRepository.deleteByUserId(userId);
    }

    @DeleteMapping("/user/deleteFilterById/{id}")
    public void deleteById(@PathVariable Long id) {
        filterRepository.deleteById(id);
    }

}
