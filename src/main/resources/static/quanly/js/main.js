$(document).ready(function() {
    checkAllRole();
    loadmenu();
    loadtop();
});

async function loadmenu(){
    var menu =
    `<nav class="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
        <div class="sb-sidenav-menu">
            <div class="nav menuadminleft">
                <div class="nav-link navcha">
                    <img id="avatarnav" src="../image/user.png" class="imgusernav">
                    <div class="remainhoten">
                        <p id="hotennav" class="hotennav">hoàng thị hoài</p>
                        <p id="sdtnav" class="emailnav">093264723</p>
                    </div>
                </div>
                <p class="nav-link mathanhvien">Mã thành viên: <span id="mathanhviennav"> 132491</span></p>
                <p style="padding-top:15px" class="nav-link mathanhvien">Số dư TK: <span id="soDutk"> 132491</span></p>
                <div class="nav-link">
                    <button onclick="window.location.href='dangtin'" class="btndangtinnav">Đăng tin</button>
                </div>
                <a class="nav-link navcha" href="../index">
                    <div class="sb-nav-link-icon"><i class="fa fa-home"></i></div>
                    Trang chủ website
                </a>
                <a class="nav-link navcha" href="naptien">
                    <div class="sb-nav-link-icon"><i class="fa fa-link"></i></div>
                    Nạp tiền
                </a>
                <a class="nav-link navcha" href="lichsunap">
                    <div class="sb-nav-link-icon"><i class="fa fa-history"></i></div>
                    Lịch sử nạp tiền
                </a>
                <a class="nav-link navcha" href="taikhoan">
                    <div class="sb-nav-link-icon"><i class="fa fa-edit"></i></div>
                    Chỉnh sửa thông tin cá nhân
                </a>
                <a class="nav-link navcha" href="quanlytin">
                    <div class="sb-nav-link-icon"><i class="fas fa-file"></i></div>
                    Quản lý tin đăng
                </a>
                <a class="nav-link navcha" href="baiviet">
                    <div class="sb-nav-link-icon"><i class="fas fa-newspaper"></i></div>
                    Quản lý bài viết
                </a>
                <a class="nav-link navcha" href="lienhe">
                    <div class="sb-nav-link-icon"><i class="fas fa-phone"></i></div>
                   Liên hệ
                </a>
                <a onclick="logout()" class="nav-link navcha" href="#">
                    <div class="sb-nav-link-icon"><i class="fa fa-sign-out"></i></div>
                    Đăng xuất
                </a>
            </div>
        </div>
    </nav>`
document.getElementById("layoutSidenav_nav").innerHTML = menu
loadThongTinTaiKhoanNavBar();
}

function loadtop(){
    var top =
    `<a style="color:#999" class="navbar-brand ps-3" href="../index"><i class="fa fa-home tagilogo"></i>TimPhongTro</a>
    <button class="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0" id="sidebarToggle" href="#!"><i class="fas fa-bars"></i></button>
    <form class="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0"></form>
    <ul id="menuleft" class="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
        <li class="lidangtintop"><button onclick="window.location.href='dangtin'" class="btndangtinnav btndangtintop">Đăng tin</button></li>
    </ul>`
    document.getElementById("top").innerHTML = top
    var sidebarToggle = document.getElementById("sidebarToggle");
    sidebarToggle.onclick = function(){
        document.body.classList.toggle('sb-sidenav-toggled');
        sessionStorage.setItem('sb|sidebar-toggle', document.body.classList.contains('sb-sidenav-toggled'));
    }
}


async function logout(){
    const user_id = localStorage.getItem("user_id");
    if (user_id && user_id !== "undefined") {
        localStorage.removeItem("post_favorist_" + user_id);
    }
    localStorage.removeItem("user_id");
    sessionStorage.removeItem("token");
    window.location.replace('../logout')
}

function formatmoney(money) {
    const VND = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
      });
    return VND.format(money);
}

var token = sessionStorage.getItem("token");
async function loadThongTinTaiKhoanNavBar(){
    var urlAccount = 'http://localhost:8080/api/userlogged';
    const res = await fetch(urlAccount, {
        method: 'POST',
        headers: new Headers({
            'Authorization': 'Bearer '+token, 
            'Content-Type': 'application/json'
        })
    });
    var account = await res.json();
    document.getElementById("mathanhviennav").innerHTML= account.id
    document.getElementById("hotennav").innerHTML = account.fullname
    document.getElementById("sdtnav").innerHTML = account.phone
    document.getElementById("soDutk").innerHTML = formatmoney(account.amount)
    document.getElementById("avatarnav").src = account.avatar
}

async function checkAllRole(){
    var token = sessionStorage.getItem("token");
    var url = 'http://localhost:8080/api/all/checkAllRole';
    const response = await fetch(url, {
        method: 'GET',
        headers: new Headers({
            'Authorization': 'Bearer ' + token
        })
    });
    if(response.status > 300){
        window.location.replace('../login')
    }
}