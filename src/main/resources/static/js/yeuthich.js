function themYeuThich(idphong){
    const user_id = localStorage.getItem("user_id");

    // Nếu chưa đăng nhập, chuyển sang trang đăng nhập
    if (!user_id || user_id.trim() === "" || user_id === "undefined" || user_id === "null") {
        swal({
            title: "Bạn chưa đăng nhập",
            text: "Vui lòng đăng nhập để sử dụng tính năng yêu thích!",
            type: "warning",
            showCancelButton: true,
            confirmButtonText: "Đăng nhập ngay",
            cancelButtonText: "Hủy"
        }, function(isConfirm){
            if (isConfirm) {
                window.location.href = "login"; // hoặc URL trang login của bạn
            }
        });
        return; // dừng lại, không xử lý tiếp
    }

    // Nếu đã đăng nhập thì thêm yêu thích như cũ
    var postfavorite = localStorage.getItem("post_favorist_" + user_id);
    if (postfavorite === null) {
        var list = [];
        list.push(idphong);
        localStorage.setItem('post_favorist_' + user_id, JSON.stringify(list));
    } else {
        var list = JSON.parse(postfavorite);
        if (!list.includes(idphong)) {
            list.push(idphong);
            localStorage.setItem('post_favorist_' + user_id, JSON.stringify(list));
        }
    }

    swal({
        title: "Thông báo",
        text: "Đã thêm vào danh sách yêu thích!",
        type: "success"
    });
}

async function loadYeuThich() {
    const user_id = localStorage.getItem("user_id");
    const container = document.getElementById("danhsachcacphong");

    // Nếu chưa đăng nhập
    if (!user_id || user_id === "undefined") {
        container.innerHTML = `
            <div class="alert alert-info">
                <strong>Thông báo:</strong> Bạn cần <a href="login">đăng nhập</a> để xem các phòng đã yêu thích.
            </div>
        `;
        return;
    }

    const storageKey = "post_favorist_" + user_id;
    const storedData = localStorage.getItem(storageKey);

    if (!storedData) {
        container.innerHTML = "<p>Bạn chưa có phòng yêu thích nào.</p>";
        return;
    }

    const idList = JSON.parse(storedData);
    if (idList.length === 0) {
        container.innerHTML = "<p>Bạn chưa có phòng yêu thích nào.</p>";
        return;
    }

    try {
        const response = await fetch("http://localhost:8080/api/public/phongYeuThich", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(idList)
        });

        const list = await response.json();
        let html = "";

        for (let i = 0; i < list.length; i++) {
            html += `
                <div class="singleroom row">
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
                        
                        <div class="thongtinnguoidang">
                            <img src="${list[i].user.avatar}" class="nguoidang">
                            <p>${list[i].user.fullname}</p>
                            <p><a href="tel:${list[i].user.phone}" class="btngoi">Gọi ${list[i].user.phone}</a></p>
                        </div>
                        <button onclick="huyYeuThich(${list[i].id})" class="btn btn-danger">Hủy yêu thích</button>
                    </div>
                </div>
            `;
        }

        container.innerHTML = html;
    } catch (error) {
        container.innerHTML = `<p>Đã xảy ra lỗi khi tải danh sách yêu thích.</p>`;
        console.error("Lỗi tải danh sách yêu thích:", error);
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
