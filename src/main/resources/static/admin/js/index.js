function getDateTime() {
    var now = new Date();
    var year = now.getFullYear();
    var month = now.getMonth() + 1;
    var day = now.getDate();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();//
    var a = 0;
    //
    if (month.toString().length == 1) {
        month = '0' + month;
    }
    if (day.toString().length == 1) {
        day = '0' + day;
    }
    if (hour.toString().length == 1) {
        hour = '0' + hour;
    }
    if (minute.toString().length == 1) {
        minute = '0' + minute;
    }
    if (second.toString().length == 1) {
        second = '0' + second;
    }
    var dateTime = year + '/' + month + '/' + day + ' ' + hour + ':'
        + minute + ':' + second;
    return dateTime;
}
setInterval(function () {
    currentTime = getDateTime();
    document.getElementById("digital-clock").innerHTML = currentTime;
}, 1000);

var date = new Date();

var current_day = date.getDay();

var day_name = '';

switch (current_day) {
    case 0:
        day_name = "Chủ nhật";
        break;
    case 1:
        day_name = "Thứ hai";
        break;
    case 2:
        day_name = "Thứ ba";
        break;
    case 3:
        day_name = "Thứ tư";
        break;
    case 4:
        day_name = "Thứ năm";
        break;
    case 5:
        day_name = "Thứ sáu";
        break;
    case 6:
        day_name = "Thứ bảy";
}
setInterval(
    async function () {
      var urladd = 'http://localhost:8080/api/admin/demChuaXem';
      const response = await fetch(urladd, {
        method: 'GET',
        headers: new Headers({
          "Authorization":  'Bearer ' + token
        })
      });
      var data = await response.text();
      document.getElementById("demchuaxem").innerHTML = data.split(".")[0]
    }, 20000);

  
var token = sessionStorage.getItem('token');
const VND = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  });

function formatmoney(money) {
    return VND.format(money);
}
async function demsoluongtb() {
  var urladd = 'http://localhost:8080/api/admin/demChuaXem';
  const response = await fetch(urladd, {
    method: 'GET',
    headers: new Headers({
      "Authorization":  'Bearer ' + token
    })
  });
  var data = await response.text();
  document.getElementById("demchuaxem").innerHTML = data.split(".")[0]
}

async function loadAllContact() {
  var url = 'http://localhost:8080/api/admin/contact';
  const response = await fetch(url, {
      method: 'GET',
      headers: new Headers({
          'Authorization': 'Bearer ' + token
      })
  });
  var list = await response.json();
  var main = '';
  for (i = 0; i < list.length; i++) {
      var col = ''
      if(list[i].daXem == 0){
          col = 'style="color:red"'
      }
      main += `<tr ${col} id="cotlienhe${list[i].id}">
                  <td>${list[i].fullname}</td>
                  <td>${list[i].email}</td>
                  <td>${list[i].createdTime}<br>${list[i].createdDate}</td>
                  <td>${list[i].content}</td>
                  <td><button onclick="deleteContact(${list[i].id})" class="btn btn-success"><i class="fa fa-trash"></i> Xóa</button></td>
              </tr>`
  }
  document.getElementById("listthongbao").innerHTML = main
  $('#example').DataTable();
}


async function deleteContact(id) {
  var url = 'http://localhost:8080/api/admin/deleteContact?id=' + id;
  const response = await fetch(url, {
      method: 'GET',
      headers: new Headers({
          'Authorization': 'Bearer ' + token
      })
  });
  if (response.status < 300) {
      document.getElementById("cotlienhe"+id).remove();
  }
}

async function demSoLuongPhong() {
    var urladd = 'http://localhost:8080/api/admin/soLuongPhong';
    const response = await fetch(urladd, {
      method: 'GET',
      headers: new Headers({
        "Authorization":  'Bearer ' + token
      })
    });
    var data = await response.text();
    document.getElementById("soluongphong").innerHTML = data
}
async function demSoLuongBaiViet() {
    var urladd = 'http://localhost:8080/api/admin/soLuongBaiViet';
    const response = await fetch(urladd, {
      method: 'GET',
      headers: new Headers({
        "Authorization":  'Bearer ' + token
      })
    });
    var data = await response.text();
    document.getElementById("soLuongbv").innerHTML = data
}
async function demSoLuongTk() {
    var urladd = 'http://localhost:8080/api/admin/soLuongTaiKhoan';
    const response = await fetch(urladd, {
      method: 'GET',
      headers: new Headers({
        "Authorization":  'Bearer ' + token
      })
    });
    var data = await response.text();
    document.getElementById("soLuongTk").innerHTML = data
}