var sizeTrangChu = 5;

async function phongTrangChu(page) {
    var url = 'http://localhost:8080/api/public/dsphongTrangChu?size='+sizeTrangChu +'&page='+page;
    const response = await fetch(url, {
        method: 'GET',
        headers: new Headers({
        })
    });
    var listroom = await response.json();
    console.log(listroom)
    var list = listroom.content;
    var totalPage = listroom.totalPages 
    var main = '';
    for (i = 0; i < list.length; i++) {
        document.getElementById("textoke").innerHTML = list[i].description;
        var des = document.getElementById("textoke").textContent;
        main += `<div class="singleroom row">
        <div class="col-sm-3 divanhphong">
            <a href="chitietphong?id=${list[i].id}"><img src="${list[i].banner}" class="anhroom"></a>
        </div>
        <div class="col-sm-9">
            <a href="chitietphong?id=${list[i].id}" class="tenphongindex">${list[i].titleRoom}</a>
            <div class="thongtinct">
                <p class="giatientro">${tinhTienThang(list[i].price)}</p>
                <p class="dientichtro">${list[i].area}m²</p>
                <p class="diachitro">${list[i].wards.districts.name}<br>${list[i].wards.districts.province.name}</p>
                <p class="thoigiandangtro">${list[i].createdDate}<br>${list[i].createdTime}</p>
            </div>
            <p class="motatro">${des}</p>
            <div class="thongtinnguoidang">
                <img src="${list[i].user.avatar}" class="nguoidang">
                <p>${list[i].user.fullname}</p>
                <p><a href="tel:${list[i].user.phone}" class="btngoi">Gọi ${list[i].user.phone}</a></p>
            </div>
        </div>
    </div>`
    }
    document.getElementById("danhsachcacphong").innerHTML = main
    document.getElementById("textoke").innerHTML = "";

    var mainpage = ''
    for(i=1; i<= totalPage; i++){
        mainpage += '<li onclick="phongTrangChu('+(Number(i)-1)+')" class="page-item"><a class="page-link" href="#danhsachcacphong">'+i+'</a></li>'
    }
    document.getElementById("listpage").innerHTML = mainpage
}

async function loadChiTietPhong() {
    //debugger
    var id = window.location.search.split('=')[1];
    if(id != null){
        var url = 'http://localhost:8080/api/public/listAnhPhong?id='+id;
        const res = await fetch(url, {
            method: 'GET',
            headers: new Headers({
            })
        });
        // var urlUser = 'http://localhost:8080/api/public/findUserNotDtoById?id='+id;
        // const ress = await fetch(url, {
        //     method: 'GET',
        //     headers: new Headers({
        //     })
        // });
        var list = await res.json();
        // var user = await ress.json();
        var main = `<div class="carousel-item active">
                        <img src="${list[0]?.room?.banner}" class="anhchitiets">
                    </div>`
        for(i=0; i<list.length; i++){
            main += `<div class="carousel-item">
                    <img src="${list[i]?.linkImage}" class="anhchitiets">
                </div>`
        }
        document.getElementById("listanhp").innerHTML = main
        debugger
        var url = 'http://localhost:8080/api/public/thongTinPhong?id='+id;
        const response = await fetch(url, {
            method: 'GET',
            headers: new Headers({
            })
        });
        var room = await response.json();
        console.log(room, 'aaaaa')
        document.getElementById("tenphongchitiet").innerHTML = room.titleRoom
        document.getElementById("diachiphong").innerHTML = room.street+", "+room.wards.name+", "+room.wards.districts.name+", "+room.wards.districts.province.name
        // Tạo địa chỉ đầy đủ và encode để nhúng bản đồ
        let diaChiDayDu = room.street + ", " + room.wards.name + ", " + room.wards.districts.name + ", " + room.wards.districts.province.name;
        let diaChiEncoded = encodeURIComponent(diaChiDayDu);
        let iframeMap = document.getElementById("map-frame");
        iframeMap.src = `https://www.google.com/maps?q=${diaChiEncoded}&output=embed`;

        document.getElementById("giatienctphong").innerHTML = tinhTienThang(room.price)
        document.getElementById("dtphongct").innerHTML = room.area
        document.getElementById("ngaydangct").innerHTML = room.createdDate
        document.getElementById("matinct").innerHTML = "#"+room.id
        document.getElementById("loaitingiao").innerHTML = room.category.name
        document.getElementById("noidungmotact").innerHTML = room.description
        document.getElementById("tenchuphong").innerHTML = room.user.fullname
        document.getElementById("imgchitietphonguser").src = room.user.avatar
        document.getElementById("sdtchuphong").innerHTML = room.user.phone
        document.getElementById("zalophone").href = "https://zalo.me/"+room.user.phone
        phongByUser(room.id);

        document.getElementById("btnyeuthich").onclick = function(){
            themYeuThich(id)
        }

        // if (room?.washingMachine) {
        //     document.getElementsByClassName("washingMachine")[0].style.display = "block"
        //     document.getElementById("washingMachine").innerHTML = room.washingMachine + " cái"
        // }
        if (room?.washingMachine){
            document.getElementsByClassName("washingMachine")[0].style.display = "block"
            if (room.washingMachine == "1")
                document.getElementById("washingMachine").innerHTML = " Có"
            else
                document.getElementById("washingMachine").innerHTML = " Không"
        }

        // if (room?.airConditioner) {
        //     document.getElementsByClassName("airConditioner")[0].style.display = "block"
        //     document.getElementById("airConditioner").innerHTML = room.airConditioner + " cái"
        // }
        if (room?.airConditioner){
            document.getElementsByClassName("airConditioner")[0].style.display = "block"
            if (room.airConditioner == "1")
                document.getElementById("airConditioner").innerHTML = " Có"
            else
                document.getElementById("airConditioner").innerHTML = " Không"
        }

        if (room?.area) {
            document.getElementsByClassName("area")[0].style.display = "block"
            document.getElementById("area").innerHTML = room.area + " m2"
        }

        if (room?.closedWc){
            document.getElementsByClassName("closedWc")[0].style.display = "block"
            if (room.closedWc == "1")
                document.getElementById("closedWc").innerHTML = " Không khép kín"
            else
                document.getElementById("closedWc").innerHTML = " Khép kín"
        }

        if (room?.direction){
            document.getElementsByClassName("direction")[0].style.display = "block"
            if (room?.direction == "1")
                document.getElementById("direction").innerHTML = " Đông"
            if (room?.direction == "2")
                document.getElementById("direction").innerHTML = " Tây"
            if (room?.direction == "3")
                document.getElementById("direction").innerHTML = " Nam"
            if (room?.direction == "4")
                document.getElementById("direction").innerHTML = " Bắc"
            if (room?.direction == "5")
                document.getElementById("direction").innerHTML = " Đông Bắc"
            if (room?.direction == "6")
                document.getElementById("direction").innerHTML = " Tây Bắc"
            if (room?.direction == "7")
                document.getElementById("direction").innerHTML = " Tây Nam"
            if (room?.direction == "8")
                document.getElementById("direction").innerHTML = " Đông Nam"
        }

        if (room?.frontWidth) {
            document.getElementsByClassName("frontWidth")[0].style.display = "block"
            document.getElementById("frontWidth").innerHTML = room.frontWidth + " m"
        }
        if (room?.numberOfPeople) {
            document.getElementsByClassName("numberOfPeople")[0].style.display = "block"
            document.getElementById("numberOfPeople").innerHTML = room.numberOfPeople + " người"
        }
        if (room?.numberOfRoom) {
            document.getElementsByClassName("numberOfRoom")[0].style.display = "block"
            document.getElementById("numberOfRoom").innerHTML = room.numberOfRoom + " phòng"
        }
        if (room?.numberOfWc) {
            document.getElementsByClassName("numberOfWc")[0].style.display = "block"
            document.getElementById("numberOfWc").innerHTML = room.numberOfWc + " phòng"
        }
        if (room?.startDate) {
            document.getElementsByClassName("startDate")[0].style.display = "block"
            document.getElementById("startDate").innerHTML = formatDate(room.startDate)
        }
        if (room?.service){
            document.getElementsByClassName("service")[0].style.display = "block"
            if (room.service == "1")
                document.getElementById("service").innerHTML = " Có"
            else
                document.getElementById("service").innerHTML = " Không"
        }
        if (room?.parking){
            document.getElementsByClassName("parking")[0].style.display = "block"
            if (room.parking == "1")
                document.getElementById("parking").innerHTML = " Có"
            else
                document.getElementById("parking").innerHTML = " Không"
        }
        if (room?.kitchen){
            document.getElementsByClassName("kitchen")[0].style.display = "block"
            if (room.kitchen == "1")
                document.getElementById("kitchen").innerHTML = " Có"
            else
                document.getElementById("kitchen").innerHTML = " Không"
        }
        if (room?.fridge){
            document.getElementsByClassName("fridge")[0].style.display = "block"
            if (room.fridge == "1")
                document.getElementById("fridge").innerHTML = " Có"
            else
                document.getElementById("fridge").innerHTML = " Không"
        }
        if (room?.heater){
            document.getElementsByClassName("heater")[0].style.display = "block"
            if (room.heater == "1")
                document.getElementById("heater").innerHTML = " Có"
            else
                document.getElementById("heater").innerHTML = " Không"
        }
        if (room?.tv){
            document.getElementsByClassName("tv")[0].style.display = "block"
            if (room.tv == "1")
                document.getElementById("tv").innerHTML = " Có"
            else
                document.getElementById("tv").innerHTML = " Không"
        }
        if (room?.bed){
            document.getElementsByClassName("bed")[0].style.display = "block"
            if (room.bed == "1")
                document.getElementById("bed").innerHTML = " Có"
            else
                document.getElementById("bed").innerHTML = " Không"
        }
        if (room?.wifi){
            document.getElementsByClassName("wifi")[0].style.display = "block"
            if (room.wifi == "1")
                document.getElementById("wifi").innerHTML = " Có"
            else
                document.getElementById("wifi").innerHTML = " Không"
        }


    }
}

async function phongMoiDang() {
    var url = 'http://localhost:8080/api/public/phongMoiDang';
    const response = await fetch(url, {
        method: 'GET',
        headers: new Headers({
        })
    });
    var list = await response.json();
    var main = '';
    for (i = 0; i < list.length; i++) {
        main += ` <div class="singleroom row sanphammoidang">
                    <div class="col-sm-3 divanhphong">
                        <a href="chitietphong?id=${list[i].id}"><img src="${list[i].banner}" class="anhroom"></a>
                    </div>
                    <div class="col-sm-9">
                        <a href="chitietphong?id=${list[i].id}" class="tenphongindex">${list[i].titleRoom}</a>
                        <div class="thongtinct">
                            <p class="giatientro">${tinhTienThang(list[i].price)}</p>
                            <p class="thoigiandangtro">${list[i].createdDate}</p>
                        </div>
                    </div>
                </div>`
    }
    document.getElementById("phongmoidang").innerHTML = main
}

async function phongByUser(iduser) {
    debugger
    var url = 'http://localhost:8080/api/public/phongLienQuan?id='+iduser;
    const response = await fetch(url, {
        method: 'GET',
        headers: new Headers({
        })
    });
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    var list = await response.json();
    if (list.length ==0){
        var url = 'http://localhost:8080/api/public/phongByUser?id='+iduser;
        const response2 = await fetch(url, {
            method: 'GET',
            headers: new Headers({
            })
        });
        if (!response2.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        list = await response2.json();
    }
    var main = '';
    for (i = 0; i < list.length; i++) {
        document.getElementById("textoke").innerHTML = list[i].description;
        var des = document.getElementById("textoke").textContent;
        main += `<div class="singleroom row">
        <div class="col-sm-3 divanhphong">
            <a href="chitietphong?id=${list[i].id}"><img src="${list[i].banner}" class="anhroom"></a>
        </div>
            <div class="col-sm-9">
                <a href="chitietphong?id=${list[i].id}" class="tenphongindex">${list[i].titleRoom}</a>
                <div class="thongtinct">
                    <p class="giatientro">${tinhTienThang(list[i].price)}</p>
                    <p class="dientichtro">${list[i].area}m²</p>
                    <p class="diachitro">${list[i].wards.districts.name}<br>${list[i].wards.districts.province.name}</p>
                    <p class="thoigiandangtro">${list[i].createdDate}<br>${list[i].createdTime}</p>
                </div>
                <p class="motatro">${des}</p>
                <div class="thongtinnguoidang">
                    <img src="${list[i].user.avatar}" class="nguoidang">
                    <p>${list[i].user.fullname}</p>
                    <p><a href="tel:${list[i].user.phone}" class="btngoi">Gọi ${list[i].user.phone}</a></p>
                </div>
            </div>
        </div>`
    }
    document.getElementById("danhsachcacphonglq").innerHTML = main
    document.getElementById("textoke").innerHTML = "";
    
}

function createNewURLParams(url) {
    const parsedUrl = new URL(url);
    const params = new URLSearchParams(parsedUrl.search);
    const newParams = {};
    for (const [key, value] of params.entries()) {
        if (value) {
            if (key === 'khoanggia') {
                const [price_min, price_max] = value.split('-');
                newParams['smallprice'] = price_min;
                newParams['largeprice'] = price_max;
            }
            else if (key === 'dientich') {
                const [smallarea, largearea] = value.split('-');
                newParams['smallarea'] = smallarea;
                newParams['largearea'] = largearea;
            } else {
                newParams[key] = value;
            }
        }
    }
    const queryParams = new URLSearchParams(newParams).toString();
    return queryParams;
}

async function timKiemPhong(page) {
    var uls = new URL(document.URL)
    var paramURL = createNewURLParams(uls)
    await searchPhongFinal(page, 5, paramURL);
}

async function searchPhongFinal(page, size, paramURL){

    var url = 'http://localhost:8080/api/public/timKiemPhongFinal?' + 'size='+ size+ '&page='+ page + '&' + paramURL

    const response = await fetch(url, {
        method: 'GET',
        headers: new Headers({
        })
    });
    var listroom = await response.json();
    var list = listroom.content;
    var totalPage = listroom.totalPages

    var main = '';
    for (i = 0; i < list.length; i++) {
        document.getElementById("textoke").innerHTML = list[i].description;
        var des = document.getElementById("textoke").textContent;
        main += `<div class="singleroom row">
        <div class="col-sm-3 divanhphong">
            <a href="chitietphong?id=${list[i].id}"><img src="${list[i].banner}" class="anhroom"></a>
        </div>
        <div class="col-sm-9">
            <a href="chitietphong?id=${list[i].id}" class="tenphongindex">${list[i].titleRoom}</a>
            <div class="thongtinct">
                <p class="giatientro">${tinhTienThang(list[i].price)}</p>
                <p class="dientichtro">${list[i].area}m²</p>
                <p class="diachitro">${list[i].wards.districts.name}<br>${list[i].wards.districts.province.name}</p>
                <p class="thoigiandangtro">${list[i].createdDate}<br>${list[i].createdTime}</p>
            </div>
            <p class="motatro">${des}</p>
            <div class="thongtinnguoidang">
                <img src="${list[i].user.avatar}" class="nguoidang">
                <p>${list[i].user.fullname}</p>
                <p><a href="tel:${list[i].user.phone}" class="btngoi">Gọi ${list[i].user.phone}</a></p>
            </div>
        </div>
    </div>`
    }
    document.getElementById("danhsachcacphong").innerHTML = main
    document.getElementById("textoke").innerHTML = "";

    var mainpage = ''
    for(i=1; i<= totalPage; i++){
        mainpage += '<li onclick="phongTrangChu('+(Number(i)-1)+')" class="page-item"><a class="page-link" href="#danhsachcacphong">'+i+'</a></li>'
    }
    document.getElementById("listpage").innerHTML = mainpage
}