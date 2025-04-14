const listFile = [];

function loadInit() {
    $('input#choosefile').change(function () {
        var files = $(this)[0].files;
    });
    document.querySelector('#choosefile').addEventListener("change", previewImages);

    function previewImages() {
        var files = $(this)[0].files;
        for (i = 0; i < files.length; i++) {
            listFile.push(files[i]);
        }

        var preview = document.getElementById("listpreview");

        for (i = 0; i < files.length; i++) {
            readAndPreview(files[i]);
        }

        function readAndPreview(file) {

            if (!/\.(jpe?g|png|gif)$/i.test(file.name)) {
                return alert(file.name + " is not an image");
            }

            var reader = new FileReader(file);

            reader.addEventListener("load", function () {
                
                var div = document.createElement('div');
                div.className = 'col-md-4';
                div.style.height = '120px';
                div.marginTop = '100px';
                preview.appendChild(div);

                var img = document.createElement('img');
                img.src = this.result;
                img.style.height = '85px';
                img.style.width = '90%';
                img.className = 'image-upload imgspre';
                img.style.marginTop = '5px';
                div.appendChild(img);

                var button = document.createElement('button');
                button.style.height = '30px';
                button.style.width = '90%';
                button.innerHTML = '<i class="fa fa-trash"></i> xóa'
                button.className = 'btnxoaanhpreview';
                div.appendChild(button);
                
                button.addEventListener("click", function () {
                    div.remove();
                    console.log(listFile.length)
                    for(i=0; i<listFile.length; i++){
                        if(listFile[i] === file){
                            listFile.splice(i, 1);
                        }
                    }
                    console.log(listFile.length)
                });
            });

            reader.readAsDataURL(file);

        }

    }

}

async function checkSoDu() {
    var check = true
    var urlAccount = 'http://localhost:8080/api/userlogged';
    const ress = await fetch(urlAccount, {
        method: 'POST',
        headers: new Headers({
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        })
    });
    var account = await ress.json();

    if (Number(account.amount) < Number(10000)) {
        check = false
    }

    return check
}

var anhbia = "";
async function themPhong() {
    if (checkSoDu() == false){
        swal({
                title: "Thông báo",
                text: "Tài khoản của bạn không đủ số dư! Số dư tối thiểu là 10.000VNĐ",
                type: "warning"
            },
            function () {
                window.location.href = "naptien"
            });
    }

    // lấy data input
    var id = window.location.search.split('=')[1];
    var xa = document.getElementById("xa").value.split("$$")[0] || null
    var tenduong = document.getElementById("tenduong").value || null
    var category = document.getElementById("danhmuclist").value || null
    var tieude = document.getElementById("tieude").value || null
    var giatien = document.getElementById("giatien").value || null
    var dientich = document.getElementById("dientich").value || null
    var motaphong = tinyMCE.get('editor').getContent() || null
    var startDate = document.getElementById('startDate')?.value || null
    var numberOfRoom = document.getElementById('numberOfRoom')?.value || null
    var closedWc = document.getElementById('closedWc')?.checked ? 1 : 0
    var numberOfWc = document.getElementById('numberOfWc')?.value || null
    var numberOfPeople = document.getElementById('numberOfPeople')?.value || null
    var frontWidth = document.getElementById('frontWidth')?.value || null
    var direction = document.getElementById('direction')?.value || null  //demo
    var service = document.getElementById('service')?.checked ? 1 : 0
    var tv = document.getElementById('tv')?.checked ? 1 : 0
    var fridge = document.getElementById('fridge')?.checked ? 1 : 0
    var bed = document.getElementById('bed')?.checked ? 1 : 0
    var airConditioner = document.getElementById('airConditioner')?.checked ? 1 : 0
    var Heater = document.getElementById('Heater')?.checked ? 1 : 0
    var washingMachine = document.getElementById('washingMachine')?.checked ? 1 : 0
    var kitchen = document.getElementById('kitchen')?.checked ? 1 : 0
    var wifi = document.getElementById('wifi')?.checked ? 1 : 0
    var parking = document.getElementById('parking')?.checked ? 1 : 0
    var chungwc = document.getElementById('chungwc')?.checked ? 1 : 0

    const filePath = document.getElementById('anhbiass')
    const formData = new FormData()
    formData.append("file", filePath.files[0])
    var urlUpload = 'http://localhost:8080/api/public/upload';
    const res = await fetch(urlUpload, {
        method: 'POST',
        headers: new Headers({}),
        body: formData
    });
    if (res.status < 300) {
        anhbia = await res.text();
    }

    var room = {
        "id": id,
        "titleRoom": tieude,
        "banner": anhbia,
        "price": giatien,
        "description": motaphong,
        "area": dientich,
        "street": tenduong,
        "category": {
            "id": category
        },
        "wards": {
            "id": xa
        },
        "numberOfRoom": numberOfRoom,
        "numberOfWc": numberOfWc,
        "airConditioner": airConditioner,
        "numberOfPeople": numberOfPeople,
        "closedWc": closedWc,
        "direction": direction,
        "frontWidth": frontWidth,
        "washingMachine": washingMachine,
        "startDate": startDate,
        "service": service,
        "tv": tv,
        "fridge": fridge,
        "bed": bed,
        "Heater": Heater,
        "kitchen": kitchen,
        "wifi": wifi,
        "parking": parking
    }

    debugger

    //validate
    var stringErr = validForm(room)
    if (stringErr != ""){
        swal({
            title: "Thông báo",
            text:  stringErr,
            type: "error"
        }, function () {});
        return
    }

    document.getElementById("loading").style.display = 'block'
    var url = 'http://localhost:8080/api/all/dang-phong';
    const response = await fetch(url, {
        method: 'POST',
        headers: new Headers({
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify(room)
    });

    var result = await response.json();
    if (response.status < 300) {
        var urladdImage = 'http://localhost:8080/api/all/image-room-upload';
        var urlUpload = 'http://localhost:8080/api/public/upload';

        for(i=0; i<listFile.length; i++){
            const formData = new FormData()
            formData.append("file", listFile[i])
            const res = await fetch(urlUpload, {
                method: 'POST',
                headers: new Headers({}),
                body: formData
            });
            var linkbanner = await res.text();

            var imageRoom = {
                "linkImage": linkbanner,
                "room": {
                    "id": result.id
                }
            }
            const response = await fetch(urladdImage, {
                method: 'POST',
                headers: new Headers({
                    'Authorization': 'Bearer ' + token,
                    'Content-Type': 'application/json'
                }),
                body: JSON.stringify(imageRoom)
            });
        }
        swal({
                title: "Thông báo",
                text: "thêm/cập nhật thông tin phòng thành công!",
                type: "success"
            },
            function () {
                document.getElementById("loading").style.display = 'none'
                window.location.replace('quanlytin')
            });
    }
    else {
        swal({
                title: "Thông báo",
                text: "Thêm/cập nhật thông tin phòng thất bại",
                type: "error"
            }, function () {
                document.getElementById("loading").style.display = 'none'
                window.location.reload();
            });
    }
}

function  validForm(room) {
    var message = ""

    if (room?.titleRoom == null)
        message += "Tiêu đề không được để trống, "
    if (room?.startDate == null )
        message += "Ngày bắt đầu không được để trống, "
    if (room?.price == null )
        message += "Giá cho thuê không được để trống, "
    if (room?.description == null )
        message += "Mô tả phòng không được để trống, "
    if (room?.area == null )
        message += "Diện tích không được để trống, "
    if (room?.numberOfRoom == null && $("#numberOfRoom").length > 0 )
        message += "Số phòng không được để trống, "
    if (room?.numberOfWc == null && $("#numberOfWc").length > 0 )
        message += "Số WC không được để trống, "
    if (room?.direction == null && $("#direction").length > 0 )
        message += "Hướng nhà không được để trống, "
    if (room?.frontWidth == null && $("#frontWidth").length > 0 )
        message += "Diện tích mặt tiền không được để trống, "
    if (document.getElementById('anhbiass').files.length == 0)
        message += "Phải thêm ít nhất 1 ảnh chi tiết phòng, "
    if (document.getElementById('choosefile').files.length == 0)
        message += "Phải thêm ít nhất 1 ảnh bìa"

    return  message

    // let files = document.getElementById('anhbiass').files
    // if (files.length == 0) {
    //     if (files.length == 0) {
    //         swal({
    //                 title: "Thông báo",
    //                 text: "Phải thêm ít nhất 1 ảnh chi tiết phòng",
    //                 type: "error"
    //             },
    //             function () {
    //             });
    //     }
    //     return
    // }
    //
    // let file2 = document.getElementById('choosefile').files
    // if (file2.length == 0) {
    //     swal({
    //             title: "Thông báo",
    //             text: "Phải thêm ít nhất 1 ảnh bìa",
    //             type: "error"
    //         },
    //         function () {
    //
    //         });
    //     return
    // }

}

async function test_themPhong() {
    debugger
    var body = $("#formThemMoiTinDang").serializeArray()

    let form = document.getElementById("formThemMoiTinDang");
    let formData = {};
    for (let i = 0; i < form.elements.length; i++) {
        let element = form.elements[i];
        if (element.type !== "submit") {
            formData[element.name] = element.value;
        }
    }
    let jsonData = JSON.stringify(formData);

    console.log(body)
    console.log(jsonData)
}


async function loadPhongCuaToi() {
    debugger
    $('#example').DataTable().destroy();
    var trangthai = document.getElementById("trangthaiphonglist").value;
    var urladd = 'http://localhost:8080/api/user/phongCuaToi';
    if (trangthai > 0) {
        urladd = 'http://localhost:8080/api/user/phongCuaToi?id=' + trangthai;
    }
    const response = await fetch(urladd, {
        method: 'GET',
        headers: new Headers({
            'Authorization': 'Bearer ' + token
        })
    });
    var list = await response.json();
    var main = ''
    for (i = 0; i < list.length; i++) {
        main += `<tr>
                    <td>${list[i].id}</td>
                    <td><img src="${list[i].banner}" class="anhphongqltin"></td>
                    <td>${list[i].titleRoom}</td>
                    <td>${formatmoney(list[i].price)}</td>
                    <td>${list[i].createdTime}<br>${list[i].createdDate}</td>
                    <td>${list[i].statusRoom.name}</td>
                    <td><a href="dangtin?id=${list[i].id}" class="btn btn-primary"><i class="fa fa-edit"></i> Sửa</a></td>
                    <td><a onclick="xoaPhong(${list[i].id})" class="btn btn-danger"><i class="fa fa-trash"></i> Xóa</a></td>
                </tr>`
    }
    document.getElementById("listphong").innerHTML = main
    $('#example').DataTable();
}


async function loadChiTietPhong() {
    debugger
    var id = window.location.search.split('=')[1];
    if (id != null) {
        var urladd = 'http://localhost:8080/api/public/thongTinPhong?id=' + id;
        const response = await fetch(urladd, {
            method: 'GET',
            headers: new Headers({
                'Authorization': 'Bearer ' + token
            })
        });
        var room = await response.json();
        getFilterByTypeRoom(room.category.id.toString())
        document.getElementById("tenduong").value = room.street;
        document.getElementById("danhmuclist").value = room.category?.id;
        document.getElementById("tieude").value = room.titleRoom
        document.getElementById("giatien").value = room.price
        document.getElementById("dientich").value = room.area
        document.getElementById("dientich").value = room.area

        if (document.getElementById("numberOfRoom")) document.getElementById("numberOfRoom").value = room.numberOfRoom
        if (document.getElementById("numberOfWc")) document.getElementById("numberOfWc").value = room.numberOfWc
        if (document.getElementById("frontWidth")) document.getElementById("frontWidth").value = room.frontWidth
        if (document.getElementById("direction")) document.getElementById("direction").value = room.direction
        if ($("#service").length) $("#service").prop("checked", room.service == 1);
        if ($("#airConditioner").length) $("#airConditioner").prop("checked", room.airConditioner == 1);
        if ($("#tv").length) $("#tv").prop("checked", room.tv == 1);
        if ($("#fridge").length) $("#fridge").prop("checked", room.fridge == 1);
        if ($("#bed").length) $("#bed").prop("checked", room.bed == 1);
        if ($("#Heater").length) $("#Heater").prop("checked", room.Heater == 1);
        if ($("#washingMachine").length) $("#washingMachine").prop("checked", room.washingMachine == 1);
        if ($("#kitchen").length) $("#kitchen").prop("checked", room.kitchen == 1);
        if ($("#wifi").length) $("#wifi").prop("checked", room.wifi == 1);
        if ($("#parking").length) $("#parking").prop("checked", room.parking == 1);
        // if (document.getElementById("chungwc")) {
        //     room.closedWc == 1 ? document.getElementById("chungwc").checked = true : document.getElementById("chungwc").checked = false
        // }

        $('#startDate').val(room.startDate);
        document.getElementById("anhendathem").src = room.banner
        anhbia = room.banner
        document.getElementById("divanhdathem").style.display = ''
        // await new Promise(r => setTimeout(r, 500));
        tinyMCE.get('editor').setContent(room.description)

        urladd = 'http://localhost:8080/api/public/listAnhPhong?id=' + id;
        const res = await fetch(urladd, {
            method: 'GET'
        });
        var list = await res.json();
        var main = `<div class="col-sm-12">
                        <h4 style="margin-top: 30px;">Ảnh đã thêm</h4>
                    </div>`
        for (i = 0; i < list.length; i++) {
            main += `<div id="anhphongdon${list[i].id}" class="col-md-4">
                        <img style="width:90%" src="${list[i].linkImage}" class="image-upload imgspre">
                        <button onclick="xoaAnhPhong(${list[i].id})" style="width:90%; height:30px" class="btnxoaanhpreview"><i class="fa fa-trash"></i> xóa ảnh</button>
                    </div>`
        }
        document.getElementById("divanhdathem").innerHTML = main


        document.getElementById("tinh").value = room.wards.districts.province.id
        var idtinh = document.getElementById("tinh").value
        var urladd = 'http://localhost:8080/api/public/districts?id=' + idtinh;
        const resp = await fetch(urladd, {
            method: 'GET',
            headers: new Headers({})
        });
        var list = await resp.json();
        var main = ''
        for (i = 0; i < list.length; i++) {
            main += `<option value="${list[i].id}">${list[i].name}</option>`
        }
        document.getElementById("huyen").innerHTML = main
        document.getElementById("huyen").value = room.wards.districts.id

        var urladd = 'http://localhost:8080/api/public/wards?id=' + room.wards.districts.id;
        const respo = await fetch(urladd, {
            method: 'GET',
            headers: new Headers({})
        });
        var list = await respo.json();
        var main = ''
        for (i = 0; i < list.length; i++) {
            main += `<option value="${list[i].id}$$${list[i].name}, ${list[i].districts.name}, ${list[i].districts.province.name}">${list[i].name}</option>`
        }
        document.getElementById("xa").innerHTML = main
        document.getElementById("xa").value = room.wards.id + "$$" + room.wards.name + ", " + room.wards.districts.name + ", " + room.wards.districts.province.name
        hienThiDiaChiDaChon();
    }else {
        getFilterByTypeRoom("6")
    }
}


async function xoaPhong(id) {
    var urladd = 'http://localhost:8080/api/user/xoaPhong?id=' + id;
    const response = await fetch(urladd, {
        method: 'DELETE',
        headers: new Headers({
            'Authorization': 'Bearer ' + token
        })
    });
    if (response.status < 300) {
        swal({
                title: "Thông báo",
                text: "xóa phòng thành công!",
                type: "success"
            },
            function () {
                window.location.reload();
            });
    } else {
        swal({
                title: "Thông báo",
                text: "không thể xóa phòng",
                type: "error"
            },
            function () {
            });
    }
}

async function xoaAnhPhong(id) {
    var con = confirm("Bạn chắc chắn muốn xóa ảnh này!")
    if (con) {
        var urladd = 'http://localhost:8080/api/user/xoaAnhPhong?id=' + id;
        const response = await fetch(urladd, {
            method: 'DELETE',
            headers: new Headers({
                'Authorization': 'Bearer ' + token
            })
        });
        if (response.status < 300) {
            $("#anhphongdon" + id).remove();
        }
    }
}

async function allStatusRoom() {
    var urladd = 'http://localhost:8080/api/public/allStatusRoom';
    const response = await fetch(urladd, {
        method: 'GET',
        headers: new Headers({})
    });
    var list = await response.json();
    var main = '<option value="-1">Tất cả</option>'
    for (i = 0; i < list.length; i++) {
        main += `<option value="${list[i].id}">${list[i].name}</option>`
    }
    document.getElementById("trangthaiphonglist").innerHTML = main
}

function initForm() {
    var data = {
        "filterByRoom": [
            {
                "room": "6",
                "name": "Chung cư mini",
                "filters": "tv,airConditioner,bed,airConditioner,Heater,washingMachine,kitchen,numberOfRoom,numberOfWc,direction,wifi,service"
            },
            {
                "room":"2",
                "name": "Cho thuê nhà riêng",
                "filters": "tv,airConditioner,bed,airConditioner,Heater,washingMachine,kitchen,numberOfRoom,numberOfWc,frontWidth,direction,wifi"
            },
            {
                "room":"3",
                "name": "Tìm người ở ghép",
                "filters": "tv,airConditioner,bed,airConditioner,Heater,washingMachine,kitchen,numberOfPeople,closedWc,direction,wifi,parking"
            },
            {
                "room":"4",
                "name": "Cho thuê mặt bằng",
                "filters": "tv,airConditioner,bed,airConditioner,Heater,washingMachine,kitchen,numberOfRoom,numberOfWc,frontWidth,direction,wifi,parking"
            },
            {
                "room":"1",
                "name": "Cho thuê phòng trọ",
                "filters": "tv,airConditioner,bed,airConditioner,Heater,washingMachine,kitchen,numberOfPeople,closedWc,frontWidth,direction,wifi,parking"
            }
        ],
        "params" : [
            {
                "id": "numberOfRoom",
                "value": "Số phòng",
                "type": "text"
            },
            {
                "id": "numberOfWc",
                "value": "Số WC",
                "type": "text"
            },
            {
                "id": "frontWidth",
                "value": "Mặt tiền(m)",
                "type": "text"
            },
            {
                "id": "numberOfPeople",
                "value": "Số người tối đa",
                "type": "text"
            },
            {
                "id": "direction",
                "value": "Hướng nhà",
                "type": "select",
                "option": [
                    {
                        "id": "1",
                        "value": "Hướng Đông"
                    },
                    {
                        "id": "2",
                        "value": "Hướng Tây"
                    },
                    {
                        "id": "3",
                        "value": "Hướng Nam"
                    },
                    {
                        "id": "4",
                        "value": "Hướng Bắc"
                    },
                    {
                        "id": "5",
                        "value": "Hướng Đông Bắc"
                    },
                    {
                        "id": "6",
                        "value": "Hướng Tây Bắc"
                    },
                    {
                        "id": "7",
                        "value": "Hướng Tây Nam"
                    },
                    {
                        "id": "8",
                        "value": "Hướng Đông Nam"
                    },
                ]
            },
            {
                "id": "service",
                "value": "Dịch vụ dọn dẹp",
                "type": "checkbox"
            },
            {
                "id": "tv",
                "value": "TV",
                "type": "checkbox"
            },
            {
                "id": "fridge",
                "value": "Tủ lạnh",
                "type": "checkbox"
            },
            {
                "id": "bed",
                "value": "Giường",
                "type": "checkbox"
            },
            {
                "id": "airConditioner",
                "value": "Điều hòa",
                "type": "checkbox"
            },
            {
                "id": "Heater",
                "value": "Bình nóng lạnh",
                "type": "checkbox"
            },
            {
                "id": "washingMachine",
                "value": "Máy giặt",
                "type": "checkbox"
            },
            {
                "id": "kitchen",
                "value": "Bếp",
                "type": "checkbox"
            },
            {
                "id": "wifi",
                "value": "Wifi",
                "type": "checkbox"
            },
            {
                "id": "parking",
                "value": "Chỗ để xe",
                "type": "checkbox"
            },
            {
                "id": "closedWc",
                "value": "Vệ sinh khép kín",
                "type": "checkbox"
            },
        ]
    }

    return data
}

function getFilterByTypeRoom(type) {
    debugger
    var typeLoaiPhong = ""
    if (type?.value == null || type.value == undefined)
        typeLoaiPhong = type
    else
        typeLoaiPhong = type.value;
    var data = initForm()
    var listType = data.filterByRoom.find(i => i.room == typeLoaiPhong ).filters.split(',');
    var list = data.params.filter(function(item) {
        return listType.includes(item.id);
    });
    console.log({list})
    var html = ``
    list.forEach(item => {
        if (item.type == 'checkbox') {
            html += `
                <div class="col-sm-3">
                    <label>${item.value}</label>
                    <input id="${item.id}" name="${item.id}" type="checkbox" class="form-check-input" style="display: block">
                    <span class="validation-message"></span>
                </div>
            `
        }
        else if (item.type == 'text') {
            html += `
            <div class="col-sm-6">
                <label>${item.value} <span style="color: red" >*</span> </label>
                <input type="number" class="form-control" id="${item.id}" name="${item.id}" required  min="0" oninput="this.value = !!this.value && Math.abs(this.value) >= 0 ? Math.abs(this.value) : null" />
                <span class="validation-message"></span>
            </div>
            `
        }
        else if (item.type = 'select') {
            var options = ''
            item.option.forEach(item => {
                options += `<option value="${item.id}">${item.value}</option>`
            })
            html += `
                <div class="col-sm-6"> 
                    <label>${item.value} <span style="color: red" >*</span></label>
                    <select name=${item.id} id=${item.id} class="form-control"> 
                        <option value="">Chọn hướng</option>
                        ${options} 
                    </select> 
                </div>
            `
        }
    })

    document.getElementById("dsloctheoloaiphong").innerHTML = html
}

// function getFilterByTypeRoom(data) {
//     //debugger
//     var typeRoom = data.value
//     console.log('typeRoom', typeRoom)
//     // căn hộ, mặt bằng
//     if (typeRoom == "2" || typeRoom == "4") {
//         var html = `
//             <div class="row">
//                 <div class="col-sm-3"><div id="tv-div"></div></div>
//                 <div class="col-sm-3"><div id="tulanh-div"></div></div>
//                 <div class="col-sm-3"><div id="giuong-div"></div></div>
//                 <div class="col-sm-3"><div id="dieuhoa-div"></div></div>
//                 <div class="col-sm-3"><div id="binhnonglanh-div"></div></div>
//                 <div class="col-sm-3"><div id="maygiat-div"></div></div>
//                 <div class="col-sm-3"><div id="bep-div"></div></div>
//                 <div class="col-sm-3"><div id="wifi-div"></div></div>
//
//                 <div class="col-sm-3"><div id="sophong-div"></div></div>
//                 <div class="col-sm-3"><div id="sowc-div"></div></div>
//                 <div class="col-sm-3"><div id="matbang-div"></div></div>
//                 <div class="col-sm-6"><div id="huong-div"></div></div>
//             </div>
//         `
//         document.getElementById("dsloctheoloaiphong").innerHTML = html
//     }
//     // phòng trọ, chung cư mini
//     else if (typeRoom == "1" || typeRoom == "6") {
//         var html = `
//             <div class="row">
//                 <div class="col-sm-2">
//                     <div id="dieuhoa-div"></div>
//                 </div>
//                 <div class="col-sm-2">
//                     <div id="maygiat-div"></div>
//                 </div>
//                 <div id="chungwc-div"></div>
//             </div>
//         `
//         document.getElementById("dsloctheoloaiphong").innerHTML = html
//     }
//     // người ở ghép
//     else if (typeRoom == "3") {
//         var html = `
//             <div class="row">
//                 <div class="col-sm-2">
//                     <div id="dieuhoa-div"></div>
//                 </div>
//                 <div class="col-sm-2">
//                     <div id="maygiat-div"></div>
//                 </div>
//                 <div class="col-sm-3">
//                     <div id="songuoi-div"></div>
//                 </div>
//                 <div class="chungwc-div"></div>
//             </div>
//         `
//         document.getElementById("dsloctheoloaiphong").innerHTML = html
//     } else {
//         document.getElementById("dsloctheoloaiphong").innerHTML = ""
//     }
//
//     loadInput()
// }

function hasWC() {
    var checkBox = document.getElementById("chungwc");
    if (checkBox.checked == true) {
        var html = `
               <div class="col-sm-3">
                   <label>Số WC</label>
                   <input id="sowc" type="number" class="form-control">
               </div>
               <div class="col-sm-3">
                   <label>Số người</label>
                   <input id="songuoi" type="number" class="form-control">
               </div>
           `
        document.getElementById("addFilterDetail").innerHTML = html
    } else {
        document.getElementById("addFilterDetail").innerHTML = ""
    }
}

function loadInput() {
    if (document.getElementById("dieuhoa-div")) {
        var dieuhoa = `
            <label>Điều hòa</label>
            <input type="number" class="form-control" id="dieuhoa" name="dieuhoa" required  min="0" oninput="this.value = !!this.value && Math.abs(this.value) >= 0 ? Math.abs(this.value) : null" />
            <span class="validation-message"></span>  
`
        document.getElementById("dieuhoa-div").innerHTML = dieuhoa
    }

    if (document.getElementById("maygiat-div")) {
        var maygiat = `
        <label>Máy giặt</label>
        <input type="checkbox" class="form-control" />
        <span class="validation-message"></span>    
`
        document.getElementById("maygiat-div").innerHTML = maygiat
    }

    if (document.getElementById("songuoi-div")) {
        var songuoi = `
        <label>Số người</label>
        <input type="number" class="form-control" id="songuoi" name="songuoi" required  min="0" oninput="this.value = !!this.value && Math.abs(this.value) >= 0 ? Math.abs(this.value) : null" />
        <span class="validation-message"></span>    
`
        document.getElementById("songuoi-div").innerHTML = songuoi
    }

    if (document.getElementById("sophong-div")) {
        var sophong = `
        <label>Số phòng</label>
        <input type="number" class="form-control" id="sophong" name="sophong" required  min="0" oninput="this.value = !!this.value && Math.abs(this.value) >= 0 ? Math.abs(this.value) : null" />
        <span class="validation-message"></span>`
        document.getElementById("sophong-div").innerHTML = sophong
    }

    if (document.getElementById("sowc-div")) {
        var sowc = `
        <label>Số WC</label>
        <input type="number" class="form-control" id="sowc" name="sowc" required  min="0" oninput="this.value = !!this.value && Math.abs(this.value) >= 0 ? Math.abs(this.value) : null" />
        <span class="validation-message"></span>`
        document.getElementById("sowc-div").innerHTML = sowc
    }

    if (document.getElementById("huong-div")) {
        var huong = `
        <label>Hướng</label>
        <select id="huong" name="huong" class="form-select" aria-label="">
              <option selected>Chọn hướng</option>
              <option value="1">Đông</option>
              <option value="2">Tây</option>
              <option value="3">Nam</option>
              <option value="4">Bắc</option>
              <option value="5">Đông Bắc</option>
              <option value="6">Tây Bắc</option>
              <option value="7">Tây Nam</option>
              <option value="8">Đông Nam</option>
        </select>
        <span class="validation-message"></span>`
        document.getElementById("huong-div").innerHTML = huong
    }

    if (document.getElementById("matbang-div")) {
        var matbang = `
        <label>Mặt bằng</label>
        <input type="number" class="form-control" id="matbang" name="matbang" required  min="0" oninput="this.value = !!this.value && Math.abs(this.value) >= 0 ? Math.abs(this.value) : null" />
        <span class="validation-message"></span>`
        document.getElementById("matbang-div").innerHTML = matbang
    }

    if (document.getElementById("chungwc-div")) {
        var chungwc = `
            <div class="col-sm-2">
                <label>WC chung</label>
                <input id="chungwc" name="chungwc" type="checkbox" class="form-check-input"
                       onclick="hasWC()" style="display: block;">
            </div>
            <div id="addFilterDetail" class="row"></div>
        <span class="validation-message"></span>`
        document.getElementById("chungwc-div").innerHTML = chungwc
    }

}


function validateForm() {
    var valid = true;
    if ($("#dieuhoa") && dieuhoa == null) {
        $("#dieuhoa").siblings(".validation-message").text("Số lượng điều hòa không được để trống.");
        valid = false
    }

    if ($("#maygiat") && maygiat == null) {
        $("#maygiat").siblings(".validation-message").text("Số lượng máy giặt không được để trống.");
        valid = false
    }

    if ($("#songuoi") && maygiat == null) {
        $("#songuoi").siblings(".validation-message").text("Số người không được để trống.");
        valid = false
    }

    if ($("#sophong") && maygiat == null) {
        $("#sophong").siblings(".validation-message").text("Số phòng không được để trống.");
        valid = false
    }

    if ($("#sowc") && maygiat == null) {
        $("#sowc").siblings(".validation-message").text("Số wc không được để trống.");
        valid = false
    }

    if ($("#huong") && maygiat == null) {
        $("#huong").siblings(".validation-message").text("Hướng không được để trống.");
        valid = false
    }

    if ($("#matbang") && maygiat == null) {
        $("#matbang").siblings(".validation-message").text("Mặt bằng được để trống.");
        valid = false
    }

    return valid
}





