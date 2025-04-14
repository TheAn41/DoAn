var token = sessionStorage.getItem("token");
async function loadThongTinTaiKhoan(){
    var urlAccount = 'http://localhost:8080/api/userlogged';
    const res = await fetch(urlAccount, {
        method: 'POST',
        headers: new Headers({
            'Authorization': 'Bearer '+token, 
            'Content-Type': 'application/json'
        })
    });

    var account = await res.json();
    document.getElementById("iduser").value = account.id
    document.getElementById("emailuser").value = account.username
    document.getElementById("tenhienthi").value = account.fullname
    document.getElementById("sdt").value = account.phone
    document.getElementById("linkface").value = account.linkFace
    document.getElementById("anhdaidien").src = account.avatar
    linkanhdd = account.avatar
}

async function loadThongTinTaiKhoanThemPhong(){
    var urlAccount = 'http://localhost:8080/api/userlogged';
    const res = await fetch(urlAccount, {
        method: 'POST',
        headers: new Headers({
            'Authorization': 'Bearer '+token, 
            'Content-Type': 'application/json'
        })
    });

    var account = await res.json();
    document.getElementById("hoten").value = account.fullname
    document.getElementById("sdt").value = account.phone
}

var linkanhdd = "";

async function capNhatThongTin() {
    document.getElementById("loading").style.display = 'block'
    const filePath = document.getElementById('inputchonavatar')
    const formData = new FormData()
    formData.append("file", filePath.files[0])
    var urlUpload = 'http://localhost:8080/api/public/upload';
    const res = await fetch(urlUpload, { 
             method: 'POST', 
              headers: new Headers({
             }),
             body: formData
           });
    if(res.status < 300){
        linkanhdd = await res.text();
    }

    var token = sessionStorage.getItem("token");
    var url = 'http://localhost:8080/api/user/updateinfor';
    var fullname = document.getElementById("tenhienthi").value
    var phone = document.getElementById("sdt").value
    var linkface = document.getElementById("linkface").value
    var userDto = {
        "fullname":fullname,
        "phone":phone,
        "linkFace":linkface,
        "avatar":linkanhdd
    }
    const response = await fetch(url, {
        method: 'POST',
        headers: new Headers({
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify(userDto)
    });
    if (response.status < 300) {
        swal({
            title: "Thông báo", 
            text: "cập nhật thông tin tài khoản thành công!", 
            type: "success"
          },
        function(){ 
            loadThongTinTaiKhoan();
        });
    }
    else {
        swal({
            title: "Thông báo", 
            text: "cập nhật thông tin tài khoản thất bại", 
            type: "error"
          },
        function(){ document.getElementById("loading").style.display = 'none' });
    }
    document.getElementById("loading").style.display = 'none'
}


async function changePassword() {
    var token = sessionStorage.getItem("token");
    var oldpass = document.getElementById("oldpass").value
    var newpass = document.getElementById("newpass").value
    var renewpass = document.getElementById("renewpass").value
    var url = 'http://localhost:8080/api/all/changePassword?old='+oldpass+"&new="+newpass;
    if(newpass != renewpass){
        alert("mật khẩu mới không trùng khớp");
        return;
    }
    
    const response = await fetch(url, {
        method: 'POST',
        headers: new Headers({
            'Authorization': 'Bearer ' + token
        })
    });
    if (response.status < 300) {
        swal({
            title: "Thông báo", 
            text: "cập nhật mật khẩu thành công, hãy đăng nhập lại", 
            type: "success"
          },
        function(){ 
            window.location.reload()
        });
    }
    else {
        swal({
            title: "Thông báo", 
            text: "cập nhật mật khẩun thất bại, mật khẩu không chính xác", 
            type: "error"
          },
        function(){ });
    }
}