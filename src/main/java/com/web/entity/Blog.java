package com.web.entity;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.sql.Date;
import java.sql.Time;

@Entity
@Table(name = "blog")
@Getter
@Setter
public class Blog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    private Date createdDate;

    private Time createdTime;

    private String title;

    private String description;

    private String content;

    private String imageBanner;

    private Integer viPham;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;


}
