package com.web.service;

import com.web.dto.BaiVietTheoNgayDTO;
import com.web.repository.BlogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
@Service
public class BlogService {
    @Autowired
    private BlogRepository blogRepository;
    public List<BaiVietTheoNgayDTO> thongKeBaiVietTheoThu() {
        List<BaiVietTheoNgayDTO> rawData = blogRepository.thongKeTheoThu();

        // Sắp xếp lại theo thứ tự Thứ 2 -> CN
        Map<String, String> mapping = Map.of(
                "Monday", "Thứ 2", "Tuesday", "Thứ 3", "Wednesday", "Thứ 4",
                "Thursday", "Thứ 5", "Friday", "Thứ 6", "Saturday", "Thứ 7", "Sunday", "CN"
        );

        Map<String, Long> resultMap = new LinkedHashMap<>();
        for (String key : List.of("Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7", "CN")) {
            resultMap.put(key, 0L);
        }

        for (BaiVietTheoNgayDTO dto : rawData) {
            String thu = mapping.get(dto.getThu());
            if (thu != null) {
                resultMap.put(thu, dto.getSoLuong());
            }
        }

        List<BaiVietTheoNgayDTO> result = new ArrayList<>();
        for (Map.Entry<String, Long> entry : resultMap.entrySet()) {
            result.add(new BaiVietTheoNgayDTO(entry.getKey(), entry.getValue()));
        }
        return result;
    }
}
