package com.web.repository;

import com.web.dto.RoomProvinceDto;
import com.web.entity.Blog;
import com.web.entity.Province;
import com.web.entity.Room;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.RequestParam;

import java.sql.Date;
import java.util.List;

public interface RoomRepository  extends JpaRepository<Room, Long> {

    @Query("select r from Room r where r.user.id = ?1")
    public List<Room> findByUser(Long userId);

    @Query("select r from Room r where r.user.id = ?1 and r.statusRoom.id = ?2")
    public List<Room> findByUserAndTrangThai(Long userId, Long trangThai);

    @Query("select r from Room r order by r.id desc ")
    public List<Room> findAllDesc();

    @Query("select r from Room r where r.statusRoom.id = ?1 order by r.id desc ")
    public List<Room> findAllDescAndTrangThai(Long trangThai);

    @Query(value = "SELECT p.name, (SELECT COUNT(rm.id) from room rm inner join wards wm on wm.id = rm.ward_id inner join districts dm on dm.id = wm.districts_id where dm.province_id = p.id) as soluong, p.id\n" +
            "from room r\n" +
            "inner join wards w on w.id = r.ward_id\n" +
            "INNER JOIN districts d on d.id = w.districts_id\n" +
            "INNER JOIN province p on p.id = d.province_id group by p.id", nativeQuery = true)
    public List<Object[]> soLuongPhongCacTinh();

    @Query("select r from Room r where r.statusRoom.id = 1 order by r.id desc")
    public Page<Room> dsPhongTrangChu(Pageable pageable);

    @Query(value = "select r.* from room r where r.status_room = 1 order by r.id desc limit 4", nativeQuery = true)
    public List<Room> phongMoiNhat();

    @Query(value = "select r.* from room r where r.status_room = 1 and r.user_id = ?1  order by r.id desc limit 4", nativeQuery = true)
    public List<Room> phongByUser(Long userId);


    @Query("select r from Room r where r.statusRoom.id = 1 and r.price >= ?1 and r.price <= ?2 and r.area >= ?3 and r.area <= ?4  order by r.id desc")
    public Page<Room> timKiemPhong(Double smallprice, Double largeprice, Float smallarea, Float largearea,Pageable pageable);

    @Query("select r from Room r where r.statusRoom.id = 1 and r.price >= ?1 and r.price <= ?2 and r.area >= ?3 and r.area <= ?4 and r.category.id = ?5 order by r.id desc")
    public Page<Room> timKiemPhong1(Double smallprice, Double largeprice, Float smallarea, Float largearea, Long loaiphong,Pageable pageable);


    @Query("select r from Room r where r.statusRoom.id = 1 and r.price >= ?1 and r.price <= ?2 and r.area >= ?3 and r.area <= ?4 and r.wards.districts.province.id = ?5 order by r.id desc")
    public Page<Room> timKiemPhong2(Double smallprice, Double largeprice, Float smallarea, Float largearea, Long khuVucTinh,Pageable pageable);

    @Query("select r from Room r where r.statusRoom.id = 1 and r.price >= ?1 and r.price <= ?2 and r.area >= ?3 and r.area <= ?4 and r.wards.districts.province.id = ?5 and r.category.id = ?6 order by r.id desc")
    public Page<Room> timKiemPhong3(Double smallprice, Double largeprice, Float smallarea, Float largearea, Long khuVucTinh, Long loaiPhong,Pageable pageable);

    @Query("select r from Room r where r.statusRoom.id = 1 and r.price >= ?1 and r.price <= ?2 and r.area >= ?3 and r.area <= ?4 and r.wards.districts.id = ?5 order by r.id desc")
    public Page<Room> timKiemPhong4(Double smallprice, Double largeprice, Float smallarea, Float largearea, Long khuVucHuyen,Pageable pageable);


    @Query("select r from Room r where r.statusRoom.id = 1 and r.price >= ?1 and r.price <= ?2 and r.area >= ?3 and r.area <= ?4 and r.wards.districts.id = ?5 and r.category.id = ?6 order by r.id desc")
    public Page<Room> timKiemPhong5(Double smallprice, Double largeprice, Float smallarea, Float largearea, Long khuVucHuyen, Long loaiPhong,Pageable pageable);

    @Query("select r from Room r where r.statusRoom.id = 1 and r.price >= ?1 and r.price <= ?2 and r.area >= ?3 and r.area <= ?4 and r.wards.id = ?5 order by r.id desc")
    public Page<Room> timKiemPhong6(Double smallprice, Double largeprice, Float smallarea, Float largearea, Long khuVucXa,Pageable pageable);

    @Query("select r from Room r where r.statusRoom.id = 1 and r.price >= ?1 and r.price <= ?2 and r.area >= ?3 and r.area <= ?4 and r.wards.id = ?5 and r.category.id = ?6 order by r.id desc")
    public Page<Room> timKiemPhong7(Double smallprice, Double largeprice, Float smallarea, Float largearea, Long khuVucXa, Long loaiPhong,Pageable pageable);

    @Query("select r from Room r where r.statusRoom.id = 1 and r.price >= :smallprice and r.price <= :largeprice and r.area >= :smallarea and r.area <= :largearea " +
            "and (:khuVucTinh is null or r.wards.districts.province.id = :khuVucTinh) and (:khuVucHuyen is null or r.wards.districts.id = :khuVucHuyen)" +
            "and (:khuVucXa is null or r.wards.id = :khuVucXa) and (:numberOfRoom is null or r.numberOfRoom = :numberOfRoom) " +
            "and (:numberOfWc is null or r.numberOfWc = :numberOfWc) and (:airConditioner is null or r.airConditioner = :airConditioner)" +
            "and (:washingMachine is null or r.washingMachine = :washingMachine) and (:startDate is null or r.startDate >= :startDate)" +
            "and (:endDate is null or r.startDate <= :endDate) and (:closedWc is null or r.closedWc = :closedWc)" +
            "and (:numberOfPeople is null or r.numberOfPeople = :numberOfPeople) and (:direction is null or r.direction = :direction)" +

            "and (:tv is null or r.tv = :tv) and (:fridge is null or r.fridge = :fridge)" +
            "and (:bed is null or r.bed = :bed) and (:heater is null or r.heater = :heater)" +
            "and (:kitchen is null or r.kitchen = :kitchen) and (:wifi is null or r.wifi = :wifi)" +
            "and (:service is null or r.service = :service) and (:parking is null or r.parking = :parking)" +

            "and (:frontWidth is null or r.frontWidth = :frontWidth) and (:loaiphong is null or r.category.id= :loaiphong)"+
            "and (:frontWidth_min is null or r.frontWidth >= :frontWidth_min) and (:frontWidth_max is null or r.frontWidth <= :frontWidth_max)"
    )
    public Page<Room> timKiemPhongFinal(@Param("smallprice") Double smallprice, @Param("largeprice") Double largeprice,
                                        @Param("smallarea") Float smallarea, @Param("largearea") Float largearea,
                                        @Param("khuVucTinh") Long khuVucTinh,
                                        @Param("khuVucHuyen") Long khuVucHuyen,
                                        @Param("khuVucXa") Long khuVucXa,
                                        @Param("numberOfRoom") Integer numberOfRoom,
                                        @Param("numberOfWc") Integer numberOfWc,
                                        @Param("airConditioner") Integer airConditioner,
                                        @Param("washingMachine") Integer washingMachine,
                                        @Param("startDate") Date startDate,
                                        @Param("endDate") Date endDate,
                                        @Param("closedWc") Integer closedWc,
                                        @Param("numberOfPeople") Integer numberOfPeople,
                                        @Param("direction") String direction,
                                        @Param("frontWidth") Double frontWidth,
                                        @Param("loaiphong") Long loaiphong,
                                        @Param("frontWidth_min") Double frontWidth_min,
                                        @Param("frontWidth_max") Double frontWidth_max,
                                        @Param("tv") Integer tv,
                                        @Param("fridge") Integer fridge,
                                        @Param("bed") Integer bed,
                                        @Param("heater") Integer heater,
                                        @Param("kitchen") Integer kitchen,
                                        @Param("wifi") Integer wifi,
                                        @Param("service") Integer service,
                                        @Param("parking") Integer parking,
                                        Pageable pageable);


    List<Room> findByWardsDistrictsIdAndCategoryId(Long districtId, Long idCategory);

}
