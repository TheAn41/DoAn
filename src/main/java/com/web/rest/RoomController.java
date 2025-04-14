package com.web.rest;

import com.web.dto.RoomProvinceDto;
import com.web.entity.FavoriteRoom;
import com.web.entity.Room;
import com.web.entity.User;
import com.web.repository.FavoriteRepository;
import com.web.repository.RoomRepository;
import com.web.repository.StatusRoomRepository;
import com.web.repository.UserRepository;
import com.web.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.math.BigInteger;
import java.sql.Date;
import java.sql.Time;
import java.util.*;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class RoomController {

    @Autowired
    private RoomRepository roomRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private FavoriteRepository favoriteRepository;

    @Autowired
    private StatusRoomRepository statusRoomRepository;

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/all/dang-phong")
    public Room save(@RequestBody Room room) throws Exception {
        User user = userService.getUserWithAuthority();
        if(user.getAmount() < 10000){
            throw new Exception("khong du so du");
        }
        room.setCreatedDate(new Date(System.currentTimeMillis()));
        room.setCreatedTime(new Time(System.currentTimeMillis()));
        room.setUser(user);
        room.setStatusRoom(statusRoomRepository.findById(1L).get());
        Room result = roomRepository.save(room);
        user.setAmount(user.getAmount()- 10000);
        userRepository.save(user);
        return result;
    }

    @GetMapping("/user/phongCuaToi")
    public List<Room> phongCuaToi(@RequestParam(value = "id", required = false) Long idTrangThai){
        if(idTrangThai == null){
            return roomRepository.findByUser(userService.getUserWithAuthority().getId());
        }
        else{
            return roomRepository.findByUserAndTrangThai(userService.getUserWithAuthority().getId(), idTrangThai);
        }
    }

    @GetMapping("/public/thongTinPhong")
    public Room thongTinPhong(@RequestParam(value = "id") Long idPhong){
        return roomRepository.findById(idPhong).orElse(null);
    }

    @DeleteMapping("/user/xoaPhong")
    public void xoaPhong(@RequestParam(value = "id") Long idPhong){
        Room room = roomRepository.findById(idPhong).orElse(null);
        if(room == null){
            return;
        }
        if(userService.getUserWithAuthority().getId() != room.getUser().getId()){
            return;
        }
        roomRepository.delete(room);
    }

    @GetMapping("/admin/tatCaPhong")
    public List<Room> tatCaPhong(@RequestParam(value = "id", required = false) Long idTrangThai){
        if(idTrangThai == null){
            return roomRepository.findAllDesc();
        }
        else{
            return roomRepository.findAllDescAndTrangThai(idTrangThai);
        }
    }

    @PostMapping("/admin/khoaPhong")
    public void khoaPhong(@RequestParam(value = "id") Long idPhong){
        Room room = roomRepository.findById(idPhong).orElse(null);
        if(room.getStatusRoom().getId() == 1){
            room.setStatusRoom(statusRoomRepository.findById(2L).get());
            roomRepository.save(room);
            return;
        }
        if(room.getStatusRoom().getId() == 2){
            room.setStatusRoom(statusRoomRepository.findById(1L).get());
            roomRepository.save(room);
            return;
        }
    }

    @GetMapping("/admin/soLuongPhong")
    public Long soLuongPhong(){
        return roomRepository.count();
    }

    @GetMapping("/admin/soLuongPhongCacTinh")
    public List<RoomProvinceDto> soLuongPhongCacTinh(){
        List<RoomProvinceDto> list = new ArrayList<>();
        List<Object[]> objs = roomRepository.soLuongPhongCacTinh();
        for(Object[] o : objs){
            RoomProvinceDto room = new RoomProvinceDto();
            room.setTenTinh((String) o[0]);
            room.setSoLuongPhong((BigInteger) o[1]);
            list.add(room);
        }
        return list;
    }

    @GetMapping("/public/dsphongTrangChu")
    public Page<Room> trangChu(Pageable pageable){
        return roomRepository.dsPhongTrangChu(pageable);
    }


    @GetMapping("/public/phongMoiDang")
    public List<Room> tinMoiDang(){
        return roomRepository.phongMoiNhat();
    }

    @GetMapping("/public/phongByUser")
    public List<Room> phongByUser(@RequestParam(value = "id") Long idUser){
        return roomRepository.phongByUser(idUser);
    }

    @GetMapping("/public/timKiemPhong")
    public Page<Room> timKiemPhong(@RequestParam(value = "loaiphong", required = false) Long loaiphong,
                                   @RequestParam(value = "smallprice", required = false) Double smallprice,
                                   @RequestParam(value = "largeprice", required = false) Double largeprice,
                                   @RequestParam(value = "smallarea", required = false) Float smallarea,
                                   @RequestParam(value = "largearea", required = false) Float largearea,
                                   @RequestParam(value = "khuvuctinh", required = false) Long khuvuctinh,
                                   @RequestParam(value = "khuvuchuyen", required = false) Long khuvuchuyen,
                                   @RequestParam(value = "khuvucxa", required = false) Long khuvucxa,
                                   Pageable pageable){
        Page<Room> page = null;
        if(smallprice == null || largeprice == null){
            smallprice = 0D; largeprice = 10000000000D;
        }
        if(smallarea == null || largearea == null){
            smallarea = 0F; largearea = 100000F;
        }
        if(khuvuctinh == null){
            if(loaiphong == null){
                page = roomRepository.timKiemPhong(smallprice, largeprice, smallarea, largearea,pageable);
            }
            if(loaiphong != null){
                page = roomRepository.timKiemPhong1(smallprice, largeprice, smallarea, largearea, loaiphong,pageable);
            }
        }
        if(khuvuctinh != null){
            if(khuvuchuyen == null){
                if(loaiphong == null){
                    page = roomRepository.timKiemPhong2(smallprice, largeprice, smallarea, largearea,khuvuctinh,pageable);
                }
                if(loaiphong != null){
                    page = roomRepository.timKiemPhong3(smallprice, largeprice, smallarea, largearea, khuvuctinh,loaiphong,pageable);
                }
            }
            if(khuvuchuyen != null){
                if(khuvucxa == null){
                    if(loaiphong == null){
                        page = roomRepository.timKiemPhong4(smallprice, largeprice, smallarea, largearea,khuvuchuyen,pageable);
                    }
                    if(loaiphong != null){
                        page = roomRepository.timKiemPhong5(smallprice, largeprice, smallarea, largearea, khuvuchuyen,loaiphong,pageable);
                    }
                }
                if(khuvucxa != null){
                    if(loaiphong == null){
                        page = roomRepository.timKiemPhong6(smallprice, largeprice, smallarea, largearea,khuvucxa,pageable);
                    }
                    if(loaiphong != null){
                        page = roomRepository.timKiemPhong7(smallprice, largeprice, smallarea, largearea, khuvucxa,loaiphong,pageable);
                    }
                }
            }
        }
        return page;
    }

    @GetMapping("/public/timKiemPhongFinal")
    public Page<Room> timKiemPhongFinal(@RequestParam(value = "loaiphong", required = false) Long loaiphong,
                                   @RequestParam(value = "smallprice", required = false) Double smallprice,
                                   @RequestParam(value = "largeprice", required = false) Double largeprice,
                                   @RequestParam(value = "smallarea", required = false) Float smallarea,
                                   @RequestParam(value = "largearea", required = false) Float largearea,
                                   @RequestParam(value = "khuvuctinh", required = false) Long khuvuctinh,
                                   @RequestParam(value = "khuvuchuyen", required = false) Long khuvuchuyen,
                                   @RequestParam(value = "khuvucxa", required = false) Long khuvucxa,
                                        @RequestParam(value = "numberOfRoom", required = false) Integer numberOfRoom,
                                        @RequestParam(value = "numberOfWc", required = false) Integer numberOfWc,
                                        @RequestParam(value = "airConditioner", required = false) Integer airConditioner,
                                        @RequestParam(value = "washingMachine", required = false) Integer washingMachine,
                                        @RequestParam(value = "startDate", required = false) Date startDate,
                                        @RequestParam(value = "endDate", required = false) Date endDate,
                                        @RequestParam(value = "closedWc", required = false) Integer closedWc,
                                        @RequestParam(value = "numberOfPeople", required = false) Integer numberOfPeople,
                                        @RequestParam(value = "direction", required = false) String direction,
                                        @RequestParam(value = "frontWidth", required = false) Double frontWidth,
                                        @RequestParam(value = "frontWidth_min", required = false) Double frontWidth_min,
                                        @RequestParam(value = "frontWidth_max", required = false) Double frontWidth_max,

                                        @RequestParam(value = "tv", required = false) Integer tv,
                                        @RequestParam(value = "fridge", required = false) Integer fridge,
                                        @RequestParam(value = "bed", required = false) Integer bed,
                                        @RequestParam(value = "heater", required = false) Integer heater,
                                        @RequestParam(value = "kitchen", required = false) Integer kitchen,
                                        @RequestParam(value = "wifi", required = false) Integer wifi,
                                        @RequestParam(value = "service", required = false) Integer service,
                                        @RequestParam(value = "parking", required = false) Integer parking,
                                   Pageable pageable){
        try{
            if (khuvuctinh != null){
                if(khuvuctinh == -1 ){
                    khuvuctinh = null;
                }
            }
            if (khuvuchuyen != null){
                if (khuvuchuyen == -1){
                    khuvuchuyen = null;
                }
            }
            if (khuvucxa != null){
                if (khuvucxa == -1){
                    khuvucxa = null;
                }
            }
            if (loaiphong != null){
                if (loaiphong == -1){
                    loaiphong = null;
                }
            }
            if (direction != null){
                if (direction.equals("")){
                    direction=null;
                }
            }
            Page<Room> page = null;
            if(smallprice == null || largeprice == null){
                smallprice = 0D; largeprice = 10000000000D;
            }
            if(smallarea == null || largearea == null){
                smallarea = 0F; largearea = 100000F;
            }
            page = roomRepository.timKiemPhongFinal(smallprice, largeprice, smallarea, largearea, khuvuctinh, khuvuchuyen, khuvucxa, numberOfRoom, numberOfWc, airConditioner, washingMachine, startDate, endDate, closedWc, numberOfPeople, direction, frontWidth, loaiphong, frontWidth_min, frontWidth_max,tv, fridge, bed, heater, kitchen, wifi, service, parking ,pageable);
            return page;
        } catch (Exception e){
            return null;
        }
    }


    @PostMapping("/public/phongYeuThich")
    public List<Room> phongYeuThich(@RequestBody List<Long> listId){
        try{
            List<Room> list = new ArrayList<>();
            for(Long id : listId){
                list.add(roomRepository.findById(id).get());
            }
            return list;
        } catch (Exception e){
            return null;
        }
    }








    @GetMapping("/public/phongLienQuan")
    public List<Room> phongLienQuan(@RequestParam(value = "id") long id){
        try{
            Optional<Room> roomTarget = roomRepository.findById(id);
            Long quan = roomTarget.get().getWards().getDistricts().getId();
            Long typeCategory = roomTarget.get().getCategory().getId();
            List<Room> roomList = roomRepository.findByWardsDistrictsIdAndCategoryId(quan, typeCategory);
            List<Room> roomLienQuan = findClosestRoom(roomList, roomTarget.get(), 4);
            return roomLienQuan;
        } catch (Exception e){
            return null;
        }
    }

    public static List<Room> findClosestRoom(List<Room> roomList, Room roomTarget, int numberOfHouses) {
        Collections.sort(roomList, new Comparator<Room>() {
            @Override
            public int compare(Room h1, Room h2) {
                double price1 = Math.abs(h1.getPrice() - roomTarget.getPrice());
                double price2 = Math.abs(h2.getPrice() - roomTarget.getPrice());

                double area1 = Math.abs(h1.getArea() - roomTarget.getArea());
                double area2 = Math.abs(h2.getArea() - roomTarget.getArea());

                double r1 =  1.23 * price1/roomTarget.getPrice() + 1.12 * area1/roomTarget.getArea();
                double r2 =  1.23 * price2/roomTarget.getPrice() + 1.12 * area2/roomTarget.getArea();
                return Double.compare(r1, r2);
            }
        });

        return roomList.subList(0, Math.min(numberOfHouses, roomList.size()));
    }


}
