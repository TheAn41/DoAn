package com.web.repository;

import com.web.entity.Province;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ProvinceRepository extends JpaRepository<Province, Long> {

    @Query(value = "SELECT p.id, p.name,\n" +
            "(SELECT COUNT(pro.id) from product pro INNER JOIN stall s on s.id = pro.stall_id INNER join wards w on w.id = s.wards_id INNER JOIN districts d on d.id = w.districts_id where d.province_id = p.id) as soluong\n" +
            "from province p GROUP BY p.id ORDER by soluong desc\n",nativeQuery = true)
    public List<Object[]> tinhSoLuongSpTinh();
}
