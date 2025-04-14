package com.web.dto;

import com.web.entity.Category;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.math.BigInteger;

@Getter
@Setter
public class CategoryDto {

    private BigInteger id;

    private String name;

    private BigInteger soLuongPhong;
}
