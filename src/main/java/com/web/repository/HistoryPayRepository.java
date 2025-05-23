package com.web.repository;

import com.web.entity.HistoryPay;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.sql.Date;
import java.util.List;
import java.util.Optional;

public interface HistoryPayRepository extends JpaRepository<HistoryPay, Long> {

    @Query("select h from HistoryPay h where h.orderId = ?1 and h.requestId = ?2")
    Optional<HistoryPay> findByOrderIdAndRequestId(String orderid, String requestId);

    @Query("select h from HistoryPay h where h.user.id = ?1")
    List<HistoryPay> findByUser(Long userId);

    @Query("select h from HistoryPay h where h.createdDate >= ?1 and h.createdDate <= ?2 order by h.id desc ")
    List<HistoryPay> findByAdmin(Date start, Date end);

    @Query(value = "select sum(i.total_amount) from history_pay i where Month(i.created_date) = ?1 and Year(i.created_date) = ?2", nativeQuery = true)
    public Double tinhDoanhThu(Integer thang, Integer month);

    @Query("SELECT MONTH(h.createdDate) AS thang, SUM(h.totalAmount) AS doanhThu " +
            "FROM HistoryPay h WHERE YEAR(h.createdDate) = :year " +
            "GROUP BY MONTH(h.createdDate) ORDER BY MONTH(h.createdDate)")
    List<Object[]> getDoanhThuTheoThang(@Param("year") int year);

}

