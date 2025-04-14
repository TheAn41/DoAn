package com.web.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "favorite_room")
@Getter
@Setter
public class FavoriteRoom {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "id_user")
    private Long idUser;

    @Column(name = "id_room")
    private Long idRoom;

}
