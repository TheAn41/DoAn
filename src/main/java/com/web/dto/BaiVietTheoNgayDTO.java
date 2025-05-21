package com.web.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BaiVietTheoNgayDTO {
    private String thu;
    private Long soLuong;

    public BaiVietTheoNgayDTO(String thu, Long soLuong) {
        this.thu = thu;
        this.soLuong = soLuong;
    }
}
