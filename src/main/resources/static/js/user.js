var token = sessionStorage.getItem("token");


async function dangNhap() {
    var url = 'http://localhost:8080/api/authenticate'
    var username = document.getElementById("username").value
    var password = document.getElementById("password").value
    var user = {
        "username": username,
        "password": password
    }
    console.log(user)
    const response = await fetch(url, {
        method: 'POST',
        headers: new Headers({
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify(user)
    });
    var token = await response.text(); 

    
    if(response.status > 300){
        swal({
            title: "Thông báo", 
            text: "tài khoản hoặc mật khẩu không chính xác!", 
            type: "warning"
          },
        function(){ 
        });
    }
    if(response.status < 300){

        window.sessionStorage.setItem('token', token);
       
        var urlAccount = 'http://localhost:8080/api/userlogged';
        const res = await fetch(urlAccount, {
            method: 'POST',
            headers: new Headers({
                'Authorization': 'Bearer '+token, 
                'Content-Type': 'application/json'
            })
        });

        var account = await res.json();
        window.sessionStorage.setItem('username', account.username);
        window.sessionStorage.setItem('iduser', account.id);
        window.sessionStorage.setItem('fullnames', account.fullname);
        window.sessionStorage.setItem('money', account.amount);
        console.log(account)
        var check = 0;
        for(i=0; i<account.authorities.length; i++){
            if(account.authorities[i].name === 'ROLE_ADMIN'){
                check = 1;
            }
            if(account.authorities[i].name === 'ROLE_USER'){
                check = 0;
            }
        }
        if(check === 0){
            window.location.replace('index')
        }
        if(check === 1){
            window.location.replace('admin/index')
        }
    }
}

async function dangKy() {
    var url = 'http://localhost:8080/api/register'
    var fullname = document.getElementById("fullname").value
    var username = document.getElementById("username").value
    var password = document.getElementById("password").value
    var phone = document.getElementById("phone").value
    var user = {
        "username": username,
        "password": password,
        "phone": phone,
        "fullname": fullname,
        "avatar": "https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/avatar-icon.png",
    }
    if (!fullname || !username || !phone || !password) {
        alert("Thông tin đăng ký không được để trống!");
        return;
    }
    const res = await fetch(url, {
        method: 'POST',
        headers: new Headers({
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify(user)
    });
    var result = await res.text();
    console.log(result)
    if (result === '2') {
        alert("Email đã tồn tại, vui lòng sử dụng email khác")
    }
    else if (result === '0') {
        swal({
            title: "Thông báo", 
            text: "đăng ký thành công! hãy check email của bạn!", 
            type: "success"
          },
        function(){ 
            window.location.replace('login')
        });
    }
}

async function quenMatKhau(){
    var url = 'http://localhost:8080/api/resetpass'
    var email = document.getElementById("email").value
    const res = await fetch(url, {
        method: 'POST',
        headers: new Headers({
        }),
        body:email
    });
    if(res.status > 300){
        swal({
            title: "Thông báo", 
            text: "Không tìm thấy tài khoản hoặc tài khoản chưa được kích hoạt sau khi đăng ký", 
            type: "warning"
          },
        function(){ 
            window.location.reload();
        });
    }
    else{
        swal({
            title: "Thông báo", 
            text: "mật khẩu mới đã được gửi về email của bạn", 
            type: "success"
          },
        function(){ 
            window.location.reload();
        });
    }
}
