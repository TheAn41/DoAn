package com.web.dto;

import lombok.Data;

import java.sql.Date;


@Data
public class SavedFilterDto {
    private Long id;
    private Double minPrice;
    private Double maxPrice;

    private Float minArea;
    private Float maxArea;

    private Date startDateFrom;
    private Date startDateTo;

    private Long provinceId;
    private Long districtId;
    private Long wardId;
    private Long categoryId;

    private Integer tv;
    private Integer fridge;
    private Integer bed;
    private Integer airConditioner;
    private Integer heater;
    private Integer washingMachine;
    private Integer kitchen;

    private Integer wifi;
    private Integer parking;
    private Integer closedWc;
    private Integer numberOfPeople;

    private String direction; // Hướng nhà
    private Integer numberOfRoom; // Số phòng
    private Integer numberOfWc; // Số WC
    private Double frontWidth; // Mặt tiền
    private Integer service;
}
