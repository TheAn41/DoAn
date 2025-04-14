async function loadDanhMucTimKiem() {
    var url = 'http://localhost:8080/api/public/allcategory';
    const response = await fetch(url, {
        method: 'GET', headers: new Headers({ })
    });
    var list = await response.json();
    var uls = new URL(document.URL)
    var loaiphong = uls.searchParams.get("loaiphong");
    var main = '<option value="-1">Tất cả loại phòng</option>';
    for (i = 0; i < list.length; i++) {
        var sel = '';
        if(list[i].id == loaiphong){
            sel = 'selected';
        }
        main += `<option ${sel} value="${list[i].id}">${list[i].name}</option>`
    }
    document.getElementById("danhsachloaiphongtimkiem").innerHTML = main
}

async function loadDanhMucBenPhai() {
    var url = 'http://localhost:8080/api/public/allcategorySoLuong';
    const response = await fetch(url, {
        method: 'GET', headers: new Headers({ })
    });
    var list = await response.json();
    var main = '<option value="-1">Tất cả loại phòng</option>';
    for (i = 0; i < list.length; i++) {
        main += `<div class="singledm">
                    <a href="danhsachphong?loaiphong=${list[i].id}&khoanggia=0-1000000000&dientich=0-10000&khuvuctinh=-1">> ${list[i].name}</a><span>(${list[i].soLuongPhong})</span>
                </div>`
    }
    document.getElementById("danhmucsoluong").innerHTML = main
}

function loadGiaBenPhai(){
    var gia =
    `<div class="singledm">
        <a href="danhsachphong?loaiphong=-1&khoanggia=0-999999&dientich=0-10000&khuvuctinh=-1">> Dưới 1 triệu</a>
        <span><a href="danhsachphong?loaiphong=-1&khoanggia=1000000-2000000&dientich=0-1000000&khuvuctinh=-1">> Từ 1 - 2 triệu</a></span>
    </div>
    <div class="singledm">
        <a href="danhsachphong?loaiphong=-1&khoanggia=2000000-3000000&dientich=0-10000&khuvuctinh=-1">> Từ 2 - 3 triệu</a>
        <span><a href="danhsachphong?loaiphong=-1&khoanggia=3000000-5000000&dientich=0-1000000&khuvuctinh=-1">> Từ 3 - 5 triệu</a></span>
    </div>
    <div class="singledm">
        <a href="danhsachphong?loaiphong=-1&khoanggia=5000000-7000000&dientich=0-10000&khuvuctinh=-1">> Từ 5 - 7 triệu</a>
        <span><a href="danhsachphong?loaiphong=-1&khoanggia=7000000-10000000&dientich=0-1000000&khuvuctinh=-1">> Từ 7 - 10 triệu</a></span>
    </div>
    <div class="singledm">
        <a href="danhsachphong?loaiphong=-1&khoanggia=10000000-15000000&dientich=0-10000&khuvuctinh=-1">> Từ 10 - 15 triệu</a>
        <span><a href="danhsachphong?loaiphong=-1&khoanggia=15000000-20000000000&dientich=0-1000000&khuvuctinh=-1">> Trên 15 triệu</a></span>
    </div>`
    document.getElementById("listgiabenphai").innerHTML = gia
}


function loadDienTichBenPhai(){
    var main =
    `<div class="singledm">
        <a href="danhsachphong?loaiphong=-1&khoanggia=0-1000000000&dientich=0-19.9&khuvuctinh=-1">> Dưới 20 m2</a>
        <span><a href="danhsachphong?loaiphong=-1&khoanggia=0-1000000000&dientich=20-30&khuvuctinh=-1">> Từ 20 - 30m2</a></span>
    </div>
    <div class="singledm">
        <a href="danhsachphong?loaiphong=-1&khoanggia=0-1000000000&dientich=30-50&khuvuctinh=-1">> Từ 30m2 - 50m2</a>
        <span><a href="danhsachphong?loaiphong=-1&khoanggia=0-1000000000&dientich=0-19.9&khuvuctinh=-1">> Từ 50m2 - 70m2</a></span>
    </div>
    <div class="singledm">
        <a href="danhsachphong?loaiphong=-1&khoanggia=0-1000000000&dientich=70-90&khuvuctinh=-1">> Từ 70m2 - 90m2</a>
        <span><a href="danhsachphong?loaiphong=-1&khoanggia=0-1000000000&dientich=90-10000&khuvuctinh=-1">> Trên 90m2</a></span>
    </div>`
    document.getElementById("listdientichphai").innerHTML = main
}