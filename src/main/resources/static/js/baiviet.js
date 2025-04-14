var sizeTT = 5;

async function baiVietMoiNhat() {
    var url = 'http://localhost:8080/api/public/baiVietMoiNhat';
    const response = await fetch(url, {
        method: 'GET',
        headers: new Headers({
        })
    });
    var listBlog = await response.json();
    var main = '';
    for (i = 0; i < listBlog.length; i++) {
        main += `<div class="singledm">
                    <a href="chitiettintuc?id=${listBlog[i].id}"> ${listBlog[i].title}</a>
                </div>`
    }
    document.getElementById("listbvmoinhat").innerHTML = main
}


async function danhSachBaiViet(page) {
    var url = 'http://localhost:8080/api/public/tinTucNguoiDung?size='+sizeTT +'&page='+page;
    const response = await fetch(url, {
        method: 'GET',
        headers: new Headers({
        })
    });
    var listBlog = await response.json();
    console.log(listBlog)
    var list = listBlog.content;
    var totalPage = listBlog.totalPages 
    var main = '';
    for (i = 0; i < list.length; i++) {
        main += `<div class="singleroom row">
        <div class="col-sm-3 divanhphong">
            <a href="chitiettintuc?id=${list[i].id}"><img src="${list[i].imageBanner}" class="anhroom"></a>
        </div>
        <div class="col-sm-9">
            <a href="chitiettintuc?id=${list[i].id}" class="tieudetintuc">${list[i].title}</a>
            <p class="motatintuc">${list[i].description}</p>
            <p><i class="fa fa-calendar"> ${list[i].createdDate}</i></p>
            <p><i class="fa fa-user"> ${list[i].user.fullname}</i></p>
        </div>
    </div>`
    }
    document.getElementById("listtintuc").innerHTML = main

    var mainpage = ''
    for(i=1; i<= totalPage; i++){
        mainpage += '<li onclick="danhSachBaiViet('+(Number(i)-1)+')" class="page-item"><a class="page-link" href="#listtintuc">'+i+'</a></li>'
    }
    document.getElementById("listpage").innerHTML = mainpage
}


async function loadChiTietBaiViet() {
    var id = window.location.search.split('=')[1];
    if(id != null){
        var url = 'http://localhost:8080/api/public/blogById?id='+id;
        const response = await fetch(url, {
            method: 'GET',
            headers: new Headers({
            })
        });
        var blog = await response.json();
        document.getElementById("noidungchitietblog").innerHTML = blog.content
        document.getElementById("tieudetintuc").innerHTML = blog.title
        document.getElementById("nguoidang").innerHTML = blog.user.fullname
        document.getElementById("ngaydang").innerHTML = blog.createdDate
    }
}