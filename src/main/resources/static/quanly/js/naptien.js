var returnurl = 'http://localhost:8080/quanly/thanhcong';
var token = sessionStorage.getItem("token");

async function khoiTaoLink(){
    debugger
    var tien =  document.getElementById("inputmoney").value;
    tien =  tien.replace(".", "");
    if(isNaN(tien)){
        alert("input không được chứa kí tự đặc biệt")
        return;
    }
 
    var urlinit = 'http://localhost:8080/api/all/urlpayment';
    var paymentDto = {
        "amount":tien,
        "content":"Nạp tiền vào tài khoản ",
        "returnUrl":returnurl,
        "notifyUrl":returnurl
    }
    console.log(paymentDto)
    const res = await fetch(urlinit, {
        method: 'POST',
        headers: new Headers({
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify(paymentDto)
    });
    var urlReturn = await res.json();
    window.open(urlReturn.url, '_blank');
}

async function kiemTraThanhToan(){
    debugger
    if(token == null){
        alert("bạn chưa đăng nhập")
        window.location.replace("login")
    }
    var uls = new URL(document.URL)
    var orderId = uls.searchParams.get("orderId");
    var requestId = uls.searchParams.get("requestId");
    var amount = uls.searchParams.get("amount");
    var urlcheck = 'http://localhost:8080/api/all/checkPayment?orderId='+orderId+'&requestId='+requestId+'&amount='+amount;
    const respon = await fetch(urlcheck, {
        method: 'GET',
        headers: new Headers({
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        })
    });
    var re = await respon.text();
    if(re == 1){
        document.getElementById("thatbai").style.display = ""
        return;
    }
    if(re == 2){
        window.location.replace("lichsunap")
        return;
    }
    if(re == 0){
        window.location.reload();
    }
}

async function loadNapTien(){
    var urlAccount = 'http://localhost:8080/api/userlogged';
    const res = await fetch(urlAccount, {
        method: 'POST',
        headers: new Headers({
            'Authorization': 'Bearer '+token, 
            'Content-Type': 'application/json'
        })
    });
    var account = await res.json();
    document.getElementById("sodu").innerHTML = formatmoney(account.amount)
}


async function lichSuNapTien() {
    url = 'http://localhost:8080/api/all/history-pay';
    const response = await fetch(url, {
        method: 'GET',
        headers: new Headers({
            'Authorization': 'Bearer ' + token
        })
    });
    var list = await response.json();
    var main = '';
    for (i = 0; i < list.length; i++) {
        main += `<tr>
                    <td>${list[i].createdTime}<br>${list[i].createdDate}</td>
                    <td>${list[i].orderId}</td>
                    <td>MOMO</td>
                    <td>${list[i].totalAmount}</td>
                    <td>${list[i].totalAmount}</td>
                    <td>Đã nhận</td>
                </tr>`
    }
    document.getElementById("listhistory").innerHTML = main
}