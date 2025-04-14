package com.web.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "image_room")
@Getter
@Setter
public class ImageRoom {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    private String linkImage;

    @ManyToOne
    @JoinColumn(name = "room_id")
    private Room room;
}
