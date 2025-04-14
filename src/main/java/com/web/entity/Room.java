package com.web.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.sql.Date;
import java.sql.Time;
import java.util.List;

@Entity
@Table(name = "room")
@Getter
@Setter
public class Room {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    private String titleRoom;

    private Date createdDate;

    private Time createdTime;

    private String banner;

    private Double price;

    private String description;

    private Float area;

    private String street;

    @Column(name = "number_of_room")
    private Integer numberOfRoom;

    @Column(name = "number_of_wc")
    private Integer numberOfWc;

    @Column(name = "air_conditioner")
    private Integer airConditioner;

    @Column(name = "start_date")
    private Date startDate;

    @Column(name = "closed_wc")
    private Integer closedWc;

    @Column(name = "number_of_people")
    private Integer numberOfPeople;

    @Column(name = "direction")
    private String direction;

    @Column(name = "front_width")
    private Double frontWidth;

    @Column(name = "washing_machine")
    private Integer washingMachine;
    @Column(name = "tv")
    private Integer tv;
    @Column(name = "fridge")
    private Integer fridge;
    @Column(name = "bed")
    private Integer bed;
    @Column(name = "heater")
    private Integer heater;
    @Column(name = "kitchen")
    private Integer kitchen;
    @Column(name = "wifi")
    private Integer wifi;
    @Column(name = "service")
    private Integer service;
    @Column(name = "parking")
    private Integer parking;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "ward_id")
    private Wards wards;

    @ManyToOne
    @JoinColumn(name = "status_room")
    private StatusRoom statusRoom;

    @OneToMany(mappedBy = "room", cascade = CascadeType.REMOVE)
    @JsonIgnore
    private List<ImageRoom> imageRooms;
}
