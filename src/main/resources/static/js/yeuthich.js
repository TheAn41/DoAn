function themYeuThich(idphong){
    debugger
    const user_id = localStorage.getItem("user_id");
    if (user_id !== null && user_id !== "undefined") {
        var postfavorite = localStorage.getItem("post_favorist_" + user_id);
            if (postfavorite === null) {
            	var list = [];
            	list.push(idphong);
            	window.localStorage.setItem('post_favorist_'+ user_id, JSON.stringify(list));
        	}
            else{
                var check = false;
                var list = JSON.parse(postfavorite);
                for(i=0; i<list.length; i++){
                    if(list[i] == idphong){
                        check = true;
                    }
                }
                if(check == false){
                    list.push(idphong);
                    window.localStorage.setItem('post_favorist_'+user_id, JSON.stringify(list));
                }
            }
            swal({
                title: "Thông báo",
                text: "thêm yêu thích thành công!",
                type: "success"
              },
            function(){
            });
    }else{
            swal({
                title: "Thông báo",
                text: "Vui lòng đăng nhập hoặc đăng ký để thêm yêu thích!",
                type: "error"
              },
            function(){
            });
    }

}

async function loadYeuThich(){
    const user_id = localStorage.getItem("user_id");
    if (user_id !== null && user_id !== "undefined") {
        if(localStorage.getItem("post_favorist_" + user_id) === null){
            return;
        }
        var list = JSON.parse(localStorage.getItem("post_favorist_" + user_id));
        var main = '';

        var url = 'http://localhost:8080/api/public/phongYeuThich';
        const response = await fetch(url, {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify(list)
        });
        list = await response.json();

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
                <button onclick="huyYeuThich(${list[i].id})" class="btn btn-danger">Hủy yêu thích</button>
            </div>
        </div>`
        }
        document.getElementById("danhsachcacphong").innerHTML = main

    }
    else{
        return
    }
}

function huyYeuThich(id){
    const user_id = localStorage.getItem("user_id");
    if (user_id !== null && user_id !== "undefined") {
        var list = JSON.parse(localStorage.getItem("post_favorist_" + user_id));
        var remainingArr = list.filter(data => data != id);
        window.localStorage.setItem("post_favorist_" + user_id, JSON.stringify(remainingArr));
        swal({title: "Thông báo", text: "đã hủy thành công!", type: "success"},
        function(){
            window.location.reload()
        });
    }
}
