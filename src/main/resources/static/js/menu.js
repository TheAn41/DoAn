async function loadMenu(){
    var tops = `
                <a href="yeuthich"><img src="image/heart.png" class="imglogotopmenu"> Yêu thích <span id="soluongyt" class="yeuthichmenu">1</span></a>
                <a href="dangky"><img src="image/add-user.png" class="imglogotopmenu"> Đăng ký</a>
                <a style="padding-bottom:15px" href="login"><img src="image/log-in.png" class="imglogotopmenu"> Đăng nhập</a>`
    var token = sessionStorage.getItem("token");
    if(token != null){
        var url = 'http://localhost:8080/api/userlogged';
        const response = await fetch(url, {
            method: 'POST',
            headers: new Headers({
                'Authorization': 'Bearer ' + token
            })
        });
        var user = await response.json();
        var fullnames = user.fullname;
        var iduser = user.id;
        var money = user.amount;
        localStorage.setItem("user_id", user.id );
        tops = `<a class="atkmenu">
                    <span class="xinchaomenu">Xin chào: <b>${fullnames}</b></span><br>
                    <span class="xinchaomenu"> Mã tài khoản: <b>${iduser}</b> <span class="xinchaomenu tkchinhmenu">TK chính: <b>${formatmoney(money)} </b></span></span>
                </a>
                <a href="yeuthich"><img src="image/heart.png" class="imglogotopmenu"> Yêu thích <span id="soluongytsmall" class="yeuthichmenu">1</span></a>
                <a href="#" dropdown-toggle menucha" href="#" id="morongnoidung" role="button" data-bs-toggle="dropdown" aria-expanded="false"><img src="image/dashboard.png" class="imglogotopmenu"> Quản lý tài khoản</a>
                <ul class="dropdown-menu" aria-labelledby="morongnoidung">
                    <li class="licanhan"><a class="dropdown-item" href="quanly/dangtin"><img src="image/themtin.png" class="imglogotopmenu"> Đăng tin cho thuê</a></li>
                    <li class="licanhan"><a class="dropdown-item" href="quanly/quanlytin"><img src="image/tattin.png" class="imglogotopmenu"> Quản lý tin đăng</a></li>
                    <li class="licanhan"><a class="dropdown-item" href="quanly/baiviet"><img src="image/baiviet.png" class="imglogotopmenu"> Quản lý bài viết</a></li>
                    <li class="licanhan"><a class="dropdown-item" href="quanly/taikhoan"><img src="image/usermenu.png" class="imglogotopmenu"> Thông tin cá nhân</a></li>
                    <li class="licanhan"><a class="dropdown-item" href="quanly/naptien"><img src="image/pay.png" class="imglogotopmenu"> Nạp tiền</a></li>
                    <li class="licanhan"><a class="dropdown-item" href="quanly/lichsunap"><img src="image/history.png" class="imglogotopmenu"> Lịch sử nạp tiền</a></li>
                        <li class="licanhan"><a class="dropdown-item" href="quanly/lienhe"><img src="image/lienhe.png" class="imglogotopmenu">Liên hệ admin</a></li>
                    <li onclick="dangXuat()"><a class="dropdown-item" href="#"><img src="image/dangxuatmenu.png" class="imglogotopmenu"> Đăng xuất</a></li>
                </ul>
                    `
    }
    var menu = 
    `<div class="ultopmenu container">
        ${tops}
    </div>
    <nav id="menu" class="navbar navbar-expand-lg">
        <div class="container">
            <a href="index"><img class="poiter imglogomenu" src="image/logo.png"></a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item"><a class="nav-link menucha" href="index">Trang chủ</a></li>
                <div id="danhsachdanhmuc">
                <li class="nav-item"><a class="nav-link menucha" href="ticket">Phòng trọ</a></li>
                <li class="nav-item"><a class="nav-link menucha" href="product">Căn hộ</a></li>
                <li class="nav-item"><a class="nav-link menucha" href="product">Mặt bằng</a></li>
                </div>
                <li class="nav-item"><a class="nav-link menucha" href="tintuc">Bài viết</a></li>
            </ul>
            <div class="d-flexss">
                    <button onclick="window.location.href='quanly/dangtin'" class="btndangtinmoi">Đăng tin mới <i class="fa fa-plus-circle"></i></button>
            </div>
            </div>
        </div>
    </nav>`
    document.getElementById("mainmenu").innerHTML = menu
    if(localStorage.getItem("post_favorist_"+iduser) != null){
        var lis = JSON.parse(localStorage.getItem("post_favorist_"+iduser));
        try {
            document.getElementById("soluongyt").innerText = lis.length;
        } catch (error) { }
        try {
            document.getElementById("soluongytsmall").innerText = lis.length;
        } catch (error) { }
    }
    else{
        try {
            document.getElementById("soluongyt").innerText = 0;
        } catch (error) { }
        try {
            document.getElementById("soluongytsmall").innerText = 0;
        } catch (error) { }
    }

    try { loadFooter(); } catch (error) { }
    try { loadDanhMucMenu(); } catch (error) { }
}

function loadFooter(){
    var footer = 
    `<div class="footer-1">
        <div class="footer-main">
            <div class="container">
                <div class="row">
                    <div class="col-lg-4">
                            <h3 class="widget-title">Website tìm kiếm phòng trọ</h3>
                            <div class="contact-info contact-info-block">
                                Mã số DN: 1234444
                                <br>
                                Cấp bởi: Sở Hà Nội
                                <br>
                                Ngày cấp: 04/12/2010 <ul class="contact-details list list-icons">
                                    <li><i class="far fa-dot-circle"></i> <strong>Địa chỉ:</strong> <span>
                                        Hà Nội
                                            </span></li>
                                    <li><i class="fab fa-whatsapp"></i> <strong>Điện thoại:</strong> <span>0123 456 789
                                            </span></li>
                                    <li><i class="far fa-envelope"></i> <strong>Email:</strong> <span><a
                                                href="mailto:cskh.kdttsaigonzoo@gmail.com">timtro@gmail.com</a></span>
                                    </li>
                                    <li><i class="far fa-clock"></i> <strong>Giờ hoạt động:</strong> <span>T2 - CN/
                                            0AM - 24PM</span></li>
                                </ul>
                            </div>
                        </aside>
                        <aside id="follow-us-widget-2" class="widget follow-us">
                            <div class="share-links">
                            </div>
                        </aside>
                    </div>
                    <div class="col-lg-3">
                        <aside id="text-10" class="widget widget_text">
                            <h3 class="widget-title">Tài khoản</h3>
                            <div class="textwidget">
                                <div class="row">
                                    <div class="col-sm-6">
                                        <ul>
                                            <li><a href="" target="_blank">My Account</a></li>
                                            <li><a href="" target="_blank">Chính sách
                                                    bảo mật</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </aside>
                        <aside id="text-12" class="widget widget_text">
                            <div class="textwidget">
                                <p><a href="#" target="_blank"><img loading="lazy"
                                            class="alignnone wp-image-3368 size-medium"
                                            src="https://saigonzoo.net/wp-content/uploads/2020/05/logoSaleNoti-300x114.png"
                                            alt="" width="300" height="114"></a></p>
                            </div>
                        </aside>
                    </div>
                    <div class="col-lg-3">
                        <aside id="text-8" class="widget widget_text">
                            <h3 class="widget-title">Các chính sách và điều khoản</h3>
                            <div class="textwidget">
                                <ul>
                                    <li><a href="" target="_blank"
                                            rel="noopener"><u>Về chúng tôi</u></a></li>
                                    <li><a href="" target="_blank"
                                            rel="noopener"><u>Điều khoản đăng tin</u></a><u></u></li>
                                    <li><a href="" target="_blank"
                                            rel="noopener">Phương thức thanh toán</a></li>
                                </ul>
                            </div>
                        </aside>
                    </div>
                    <div class="col-lg-2">
                        <aside id="text-9" class="widget widget_text">
                            <h3 class="widget-title">Về chúng tôi</h3>
                            <div class="textwidget">
                                <p>Phongtro.com tự hào có lượng dữ liệu bài đăng lớn nhất trong lĩnh vực cho thuê phòng trọ.</p>
                            </div>
                        </aside>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </div><button onclick="topFunction()" id="myBtn"><i class="fas fa-arrow-alt-circle-up"></i></button>`
    document.getElementById("footer").innerHTML = footer
    window.onscroll = function() {scrollFunction()};
}


function loadFormTimKiem(){
    var uls = new URL(document.URL)
    var khoanggia = uls.searchParams.get("khoanggia");
    var dientich = uls.searchParams.get("dientich");
    var typeLoaiPhong = uls.searchParams.get("loaiphong");
    console.log('loai phong:',typeLoaiPhong);
    //var addfilter = loadSearchByTypeRoom()

    var btn = ''
    if (typeLoaiPhong){

        btn = `
    <div style="float: right; display: flex; gap: 10px;">
        <button id="saveFilterButton" class="btn btn-success btn-sm" type="button" onclick="saveFilter()">Lưu bộ lọc</button>
        <button id="filterButton" class="btn btn-secondary btn-sm" type="button" onclick="showFilter()">Thêm chi tiết lọc</button>
    </div>`
    }else {
        btn = ''
    }

    var khuvuctinh = uls.searchParams.get("khuvuctinh") ? uls.searchParams.get("khuvuctinh") : -1
    var khuvuchuyen = uls.searchParams.get("khuvuchuyen") ? uls.searchParams.get("khuvuchuyen") : -1
    var khuvucxa = uls.searchParams.get("khuvucxa") ? uls.searchParams.get("khuvucxa") : -1

    var formsearch =
    `<form action="danhsachphong" id="formsearch" method="get">
        <div class="row searchtop" >
            <div class="col-md chucnangtop">
                <select id="danhsachloaiphongtimkiem" class="form-control" name="loaiphong" onchange="changeRoom(this)">
                    <option value="-1">Tất cả loại phòng</option>
                </select>
            </div>
            <div class="col-md chucnangtop">
                <select class="form-control" name="khoanggia">
                    <option ${khoanggia == '0-1000000000' ? 'selected' : ''} value="0-1000000000">Chọn giá</option>
                    <option ${khoanggia == '0-999999' ? 'selected' : ''} value="0-999999">Dưới 1 triệu đồng</option>
                    <option ${khoanggia == '1000000-2000000' ? 'selected' : ''} value="1000000-2000000">Từ 1-2 triệu đồng</option>
                    <option ${khoanggia == '2000000-3000000' ? 'selected' : ''} value="2000000-3000000">Từ 2-3 triệu đồng</option>
                    <option ${khoanggia  == '3000000-5000000' ? 'selected' : ''} value="3000000-5000000">Từ 3-5 triệu đồng</option>
                    <option ${khoanggia == '5000000-7000000' ? 'selected' : ''} value="5000000-7000000">Từ 5-7 triệu đồng</option>
                    <option ${khoanggia == '7000000-10000000' ? 'selected' : ''} value="7000000-10000000">Từ 7-10 triệu đồng</option>
                    <option ${khoanggia == '10000000-15000000' ? 'selected' : ''} value="10000000-15000000">Từ 10-15 triệu đồng</option>
                    <option ${khoanggia == '15000000-1000000000' ? 'selected' : ''} value="15000000-1000000000">Trên 15 triệu đồng</option>
                </select>
            </div>
            <div class="col-md chucnangtop">
                <button id="btnchonkhuvuc" style="text-align: left !important;padding-left: 13px !important;" type="button" data-bs-toggle="modal" data-bs-target="#chonkhuvuc" class="btnchonkhuvuc"><span id="diachismall">Chọn khu vực</span></button>
            </div>
            <div class="col-md chucnangtop">
                <select class="form-control" name="dientich">
                    <option ${dientich == '0-10000' ? 'selected' : ''} value="0-10000">Chọn diện tích</option>
                    <option ${dientich == '0-19.9' ? 'selected' : ''} value="0-19.9">Dưới 20m2</option>
                    <option ${dientich == '20-30' ? 'selected' : ''} value="20-30">Từ 20m2-30m2</option>
                    <option ${dientich == '30-50' ? 'selected' : ''} value="30-50">Từ 30m2-50m2</option>
                    <option ${dientich == '50-70' ? 'selected' : ''} value="50-70">Từ 50m2-70m2</option>
                    <option ${dientich == '70-90' ? 'selected' : ''} value="70-90">Từ 70m2-90m2</option>
                    <option ${dientich == '90-10000' ? 'selected' : ''} value="90-10000">Trên  90m2</option>
                </select>
            </div>
            <div class="col-md chucnangtop">
                <button type="button" onclick="submitForm()" class="btnsearchtop"><i class="fa fa-search"></i> Tìm kiếm</button>
                
            </div>
            
        </div>
        
        <div id="dynamicFilter" style="margin-top: 4px;" >
        
        </div>    
        
        <div class="modal fade" id="chonkhuvuc" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-lg modalfile">
            <div class="modal-content contentfile">
                <div class="modal-header">
                    <h5 class="modal-title" id="dsfileh5">Chọn khu vực</h5>
                </div>
                <div class="modal-body" style="height: 120%; padding-bottom: 100px;">
                    <div class="row">
                        <div class="col">
                            <select id="tinh" class="form-control" form="formsearch" name="khuvuctinh" onchange="loadHuyen()">
                                <option value="${khuvuctinh}">Chọn tỉnh</option>
                            </select>
                        </div>
                        <div class="col">
                            <select id="huyen" class="form-control" form="formsearch" name="khuvuchuyen" onchange="loadXa()">
                                <option value="${khuvuchuyen}">Chọn huyện</option>
                            </select>
                        </div>
                        <div class="col">
                            <select id="xa" class="form-control" form="formsearch" name="khuvucxa" onchange="setKhuVuc()">
                                <option value="${khuvucxa}">Chọn xã</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
                
    </form>
    
    ${btn}
`
    document.getElementById("divsearch").innerHTML = formsearch
    //loadSearchByTypeRoom()
    loadfilllll()
}

function submitForm() {
    $('input[type="checkbox"]').on('change', function(){
        this.value ^= 1;
    });

    document.getElementById('formsearch').submit();

}

// function loadfilllll() {
//     $("#dynamicFilter").css("display", "none");
//     const viewFilter = localStorage.getItem('view');
//     if (viewFilter == "show"){
//         $("#dynamicFilter").css("display", "block");
//         document.getElementById("filterButton").innerText = "Ẩn chi tiết lọc"
//     }
//     if (viewFilter == "hide"){
//         $("#dynamicFilter").css("display", "none");
//         document.getElementById("filterButton").innerText = "Thêm chi tiết lọc"
//     }
// }

function loadfilllll() {
    $("#dynamicFilter").css("display", "none");
    const viewFilter = localStorage.getItem('view');
    if (viewFilter == "show"){
        $("#dynamicFilter").css("display", "block");
        const filterButton = document.getElementById("filterButton");
        if (filterButton) {
            filterButton.innerText = "Ẩn chi tiết lọc";
        }
    }
    if (viewFilter == "hide"){
        $("#dynamicFilter").css("display", "none");
        const filterButton = document.getElementById("filterButton");
        if (filterButton) {
            filterButton.innerText = "Thêm chi tiết lọc";
        }
    }
}

function showFilter(){
    $("#dynamicFilter").toggle();
    updateButtonLabel();
}

function updateButtonLabel() {
    if ($("#dynamicFilter").is(":hidden")) {
        $("#filterButton").text("Thêm chi tiết lọc");
        localStorage.setItem('view', 'hide');
    } else {
        $("#filterButton").text("Ẩn chi tiết lọc");
        localStorage.setItem('view', 'show');
    }
}

function changeRoom(data){
    window.location.href = '/danhsachphong?loaiphong=' + data.value + '&khoanggia=0-1000000000&dientich=0-10000'
}

function scrollFunction() {
    let mybutton = document.getElementById("myBtn");
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      mybutton.style.display = "block";
    } else {
      mybutton.style.display = "none";
    }
}

function topFunction() {
document.body.scrollTop = 0;
document.documentElement.scrollTop = 0;
}

async function dangXuat(){
    localStorage.removeItem("user_id");
    sessionStorage.removeItem("token");
    window.location.replace("logout")
}

async function loadDanhMucMenu() {
    var url = 'http://localhost:8080/api/public/allcategory';
    const response = await fetch(url, {
        method: 'GET', headers: new Headers({ })
    });
    var list = await response.json();
    var main = '';
    for (i = 0; i < list.length; i++) {
        main += `<li class="nav-item"><a class="nav-link menucha" href="danhsachphong?loaiphong=${list[i].id}&khoanggia=0-1000000000&dientich=0-10000&khuvuctinh=-1">${list[i].name}</a></li>`
    }
    document.getElementById("danhsachdanhmuc").innerHTML = main
}

function formatmoney(money) {
    const VND = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
      });
    return VND.format(money);
}

function tinhTienThang(money){
    var ti = money/1000000;
    return ti+" triệu/ tháng"
}

async function checkroleUser(){
    var token = sessionStorage.getItem("token");
    var url = 'http://localhost:8080/api/user/checkroleUser';
    const response = await fetch(url, {
        method: 'GET',
        headers: new Headers({
            'Authorization': 'Bearer ' + token
        })
    });
    if(response.status > 300){
        window.location.replace('login')
    }
}

function formatDate(inputString){
    const parts = inputString.split("-");
    const formattedString = `${parts[2]}/${parts[1]}/${parts[0]}`
    return formattedString
}


async function saveFilter() {
    const token = sessionStorage.getItem("token");
    if (!token) {
        alert("Bạn cần đăng nhập để lưu bộ lọc.");
        window.location.href = "login";
        return;
    }

    // Lấy giá trị từ các input HTML
    const loaiPhong = document.getElementById("danhsachloaiphongtimkiem")?.value || null;
    const khoangGia = document.querySelector('select[name="khoanggia"]')?.value || null;
    const dientich = document.querySelector('select[name="dientich"]')?.value || null;

    // Lấy giá trị từ các checkbox
    const tv = document.getElementById("tv")?.checked ? 1 : 0;
    const fridge = document.getElementById("fridge")?.checked ? 1 : 0;
    const bed = document.getElementById("bed")?.checked ? 1 : 0;
    const airConditioner = document.getElementById("airConditioner")?.checked ? 1 : 0;
    const heater = document.getElementById("heater")?.checked ? 1 : 0;
    const washingMachine = document.getElementById("washingMachine")?.checked ? 1 : 0;
    const kitchen = document.getElementById("kitchen")?.checked ? 1 : 0;



    const wifi = document.getElementById("wifi")?.checked ? 1 : 0;
    const parking = document.getElementById("parking")?.checked ? 1 : 0;
    const closedWc = document.getElementById("closedWc")?.checked ? 1 : 0;
    const numberOfPeople = document.getElementById("numberOfPeople")?.value || null;

    const khuvucTinh = document.querySelector('select[name="khuvuctinh"]')?.value || null;
    const khuvucHuyen = document.querySelector('select[name="khuvuchuyen"]')?.value || null;
    const khuvucXa = document.querySelector('select[name="khuvucxa"]')?.value || null;

    const direction = document.querySelector('select[name="direction"]')?.value || null; // Hướng nhà
    const numberOfRoom = document.getElementById("numberOfRoom")?.value || null; // Số phòng
    const numberOfWc = document.getElementById("numberOfWc")?.value || null; // Số WC
    const frontWidth = document.getElementById("frontWidth")?.value || null; // Mặt tiền
    const service = document.getElementById("service")?.checked ? 1 : 0;

    const urlParams = new URLSearchParams(window.location.search);
    const startDateFrom = urlParams.get('startDate');
    const startDateTo = urlParams.get('endDate');

    console.log("Start Date From:", startDateFrom);
    console.log("Start Date To:", startDateTo);
    const categoryId = loaiPhong;

    const userId = sessionStorage.getItem("userId");

    const filterData = {
        categoryId,
        minPrice: khoangGia.split("-")[0],
        maxPrice: khoangGia.split("-")[1],
        minArea: dientich.split("-")[0],
        maxArea: dientich.split("-")[1],
        provinceId: khuvucTinh,
        districtId: khuvucHuyen,
        wardId: khuvucXa,
        tv,
        fridge,
        bed,
        airConditioner,
        heater,
        washingMachine,
        kitchen,
        wifi,
        parking,
        closedWc,
        numberOfPeople,
        direction,
        numberOfRoom,
        numberOfWc,
        frontWidth,
        service,
        startDateFrom, // Ngày bắt đầu từ
        startDateTo, // Ngày kết thúc đến
        userId
    };

    try {
        const response = await fetch('http://localhost:8080/api/public/saveFilter', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(filterData)
        });

        if (response.ok) {
            alert("Đã lưu bộ lọc thành công!");
        } else {
            const result = await response.json();
            alert("Không thể lưu bộ lọc: " + (result.message || response.status));
        }
    } catch (error) {
        console.error('Lỗi khi lưu bộ lọc:', error);
        alert("Đã có lỗi xảy ra khi lưu bộ lọc.");
    }
}



