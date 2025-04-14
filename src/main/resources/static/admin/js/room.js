var token = sessionStorage.getItem("token");

async function allStatusRoom() {
    var urladd = 'http://localhost:8080/api/public/allStatusRoom';
    const response = await fetch(urladd, {
      method: 'GET',
      headers: new Headers({
      })
    });
    var list = await response.json();
    var main = '<option value="-1">Tất cả</option>'
    for(i=0; i<list.length; i++){
        main += `<option value="${list[i].id}">${list[i].name}</option>`
    }
    document.getElementById("trangthaiphonglist").innerHTML = main
}

async function loadAllRoom() {

    $('#example').DataTable().destroy();
    var trangthai = document.getElementById("trangthaiphonglist").value;
    var url = 'http://localhost:8080/api/admin/tatCaPhong';
    if(trangthai > 0){
        url = 'http://localhost:8080/api/admin/tatCaPhong?id='+trangthai;
    }
    const response = await fetch(url, {
        method: 'GET',
        headers: new Headers({
            'Authorization': 'Bearer ' + token
        })
    });
    var list = await response.json();
    var main = '';
    for (i = 0; i < list.length; i++) {
        var checks = `<input onclick="khoaPhong(${list[i].id}, 1, this)" type="checkbox">`
        if(list[i].statusRoom.id == 2){
            checks = `<input onclick="khoaPhong(${list[i].id}, 2, this)" checked type="checkbox">`
        }
        main += `<tr>
                    <td>${list[i].id}</td>
                    <td>${list[i].user.username}</td>
                    <td><img src="${list[i].banner}" class="anhphongqltin"></td>
                    <td>${list[i].titleRoom}</td>
                    <td>${formatmoney(list[i].price)}</td>
                    <td>${list[i].createdTime}<br>${list[i].createdDate}</td>
                    <td>${list[i].statusRoom.name}</td>
                    <td>
                        <label class="checkbox-custom">
                            ${checks}
                            <span class="checkmark-checkbox"></span>
                        </label>
                    </td>
                    <td><p onclick="loadChiTietPhong(${list[i].id})" data-bs-toggle="modal" data-bs-target="#chitiet" class="poiter">Xem</p></td>
                </tr>`
    }
    document.getElementById("listroom").innerHTML = main
    $('#example').DataTable();
}


async function loadChiTietPhong(id) {
    var urladd = 'http://localhost:8080/api/public/thongTinPhong?id='+id;
    const response = await fetch(urladd, {
      method: 'GET',
      headers: new Headers({
      })
    });
    var room = await response.json();
    document.getElementById("diachi").innerHTML = room.street+", "+room.wards.name+", "+room.wards.districts.name+", "+ room.wards.districts.province.name
    document.getElementById("tdloaiphog").innerHTML = room.category.name
    document.getElementById("dtich").innerHTML = room.area +" m2"
    document.getElementById("tenchuphong").innerHTML = room.user.fullname
    document.getElementById("sdtchuphong").innerHTML = room.user.phone
    $.ajax({
        type: "GET",
        url: 'http://localhost:8080/api/public/listAnhPhong?id='+id,
        headers: {"Authorization":  'Bearer ' + token},
        success: function (list) {
            var main = ``
            for(i=0; i< list.length; i++){
                var ac = ''
                if(i==0){
                    ac = 'active'
                }
                main += `<div class="carousel-item ${ac}">
                            <img src="${list[i].linkImage}" class="anhchitiets">
                        </div>`
            }
            document.getElementById("listanh").innerHTML = main
        }
    })
}

async function khoaPhong(id, type, e) {
    var str = "Bạn muốn khóa phòng này?";
    var tb = "Đã khóa phòng vi phạm thành công";
    if(type == 2){
        str = "Bạn muốn mở khóa phòng này?";
        tb = "Đã khôi phục phòng đã khóa";
    }
    var con = confirm(str);
    if(con){
        var url = 'http://localhost:8080/api/admin/khoaPhong?id=' + id;
        const response = await fetch(url, {
            method: 'POST',
            headers: new Headers({
                'Authorization': 'Bearer ' + token
            })
        });
        if (response.status < 300) {
            swal({
                title: "Thông báo", 
                text: tb, 
                type: "success"
              },
            function(){ 
                window.location.reload();
            });
        }
    }
    else{
        if(type == 1){
            e.checked = false
        }
        if(type == 2){
            e.checked = true
        }
    }
}

async function soLuongPhongCacTinh() {
    $('#example').DataTable().destroy();
    var urladd = 'http://localhost:8080/api/admin/soLuongPhongCacTinh';
    const response = await fetch(urladd, {
      method: 'GET',
      headers: new Headers({
        'Authorization': 'Bearer ' + token
      })
    });
    var list = await response.json();
    var main = ''
    for(i=0; i<list.length; i++){
        main += `<tr>
                    <td>${list[i].tenTinh}</td>
                    <td>${list[i].soLuongPhong}</td>
                </tr>`
    }
    document.getElementById("listphongcactinh").innerHTML = main
    $('#example').DataTable();
}