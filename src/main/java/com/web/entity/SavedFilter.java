package com.web.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import java.sql.Date;


@Entity
@Table(name = "saved_filters")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SavedFilter {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
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

    // Nội thất
    private Integer tv;
    private Integer fridge;
    private Integer bed;
    private Integer airConditioner;
    private Integer heater;
    private Integer washingMachine;
    private Integer kitchen;

    // Khác
    private Integer wifi;
    private Integer parking;
    private Integer closedWc;
    private Integer numberOfPeople;

    // Các trường bổ sung
    private String direction; // Hướng nhà
    private Integer numberOfRoom; // Số phòng
    private Integer numberOfWc; // Số WC
    private Double frontWidth; // Mặt tiền
    private Integer service;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "user_id")
    private User user;

    private Date createdDate;
}
