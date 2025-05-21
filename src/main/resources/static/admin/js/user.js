var token = sessionStorage.getItem("token");
async function loadAllUser() {
    $('#example').DataTable().destroy();
    var role = document.getElementById("allrole").value
    var url = 'http://localhost:8080/api/admin/getUserByRole';
    if(role != ""){
        url = 'http://localhost:8080/api/admin/getUserByRole?role='+role;
    }
    const response = await fetch(url, {
        method: 'GET',
        headers: new Headers({
            'Authorization': 'Bearer ' + token
        })
    });
    var list = await response.json();
    console.log(list)
    var main = '';
    var activebtn = 'btn btn-primary'
    var activename = 'khóa'
    var activeicon = 'fa fa-lock'
    var type = 1;
    for (i = 0; i < list.length; i++) {
        var locks = ``;
        if(list[i].actived == 0){
            locks = `<a onclick="lockOrUnlock(${list[i].id},0)" class="btn btn-danger"><i class="fa fa-unlock"></i> mở khóa</a>`
        }
        else{
            locks = `<a onclick="lockOrUnlock(${list[i].id},1)" class="btn btn-primary"><i class="fa fa-lock"></i> khóa</a>`
        }
        if(list[i].authorities[0].name == 'ROLE_ADMIN'){
            locks = ''
        }
        var phone = list[i].phone == null ? "" : list[i].phone
        var fullname = list[i].fullname == null ? "" : list[i].fullname
        main += `<tr>
                    <td>${list[i].id}</td>
                    <td>${list[i].username}</td>
                    <td>${fullname}</td>
                    <td>${phone}</td>
                    <td>${list[i].createdDate}</td>
                    <td>${list[i].authorities[0].name}</td>
                    <td>${locks}</td>
                </tr>`
    }
    document.getElementById("listuser").innerHTML = main
    $('#example').DataTable();
}

async function loadAllRole() {
    var url = 'http://localhost:8080/api/admin/authority';
    const response = await fetch(url, {
        method: 'GET',
        headers: new Headers({
            'Authorization': 'Bearer ' + token
        })
    });
    var list = await response.json();
    var main = '<option value="">Tất cả các quyền</option>';
    for (i = 0; i < list.length; i++) {
        main += `<option value="${list[i].name}">${list[i].name}</option>`
    }
    document.getElementById("allrole").innerHTML = main
}




async function lockOrUnlock(id, type) {
    var actionText = (type == 1) ? 'khóa' : 'mở khóa';

    swal({
        title: "Xác nhận",
        text: "Bạn có chắc muốn " + actionText + " người dùng này?",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Có, " + actionText + "!",
        cancelButtonText: "Hủy bỏ",
        closeOnConfirm: false,
        closeOnCancel: true
    }, async function (isConfirm) {
        if (isConfirm) {
            var url = 'http://localhost:8080/api/admin/activeUser?id=' + id;
            const response = await fetch(url, {
                method: 'POST',
                headers: new Headers({
                    'Authorization': 'Bearer ' + token
                })
            });

            if (response.status < 300) {
                var mess = (type == 1) ? 'Khóa thành công' : 'Mở khóa thành công';
                swal({
                    title: "Thông báo",
                    text: mess,
                    type: "success"
                }, function () {
                    window.location.reload();
                });
            } else {
                swal({
                    title: "Thông báo",
                    text: "Hành động thất bại",
                    type: "error"
                }, function () {
                    window.location.reload();
                });
            }
        }
    });
}


async function addtk() {
    var url = 'http://localhost:8080/api/admin/addAdmin'
    var email = document.getElementById("email").value
    var password = document.getElementById("pass").value
    var repassword = document.getElementById("repass").value
    var user = {
        "username": email,
        "email": email,
        "password": password,
        "authorities": [
            "ROLE_ADMIN"
        ]
    }
    if(password != repassword){
        alert("Mật khẩu không trùng khớp")
        return;
    }
    if(password === "" || repassword === ""){
        alert("mật khẩu không được để trống!")
        return;
    }
    const res = await fetch(url, {
        method: 'POST',
        headers: new Headers({
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify(user)
    });
    var result = await res.text();
    console.log(result)
    if (result === '1') {
        alert("email đã tồn tại")
    }
    else if (result === '0') {
        swal({
            title: "Thông báo", 
            text: "Tạo tài khoản admin thành công!", 
            type: "success"
          },
        function(){ 
            window.location.reload();
        });
    }
}