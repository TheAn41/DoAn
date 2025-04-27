async function initDataForm() {
    //alert('initDataForm')
    var urlParams = new URLSearchParams(window.location.search);
    var keys = Array.from(urlParams.keys());
    console.log({keys: keys});

    keys.forEach(function (key) {
        var val = urlParams.get(key)
        if ($("#"+key).is(':checkbox')) {
            $("#"+key).prop('checked', true);
        } else {
            $("#"+key).val(val);
        }
    })

    // hiển thị text địa chỉ
    var uls = new URL(document.URL)
    var khuvuctinh = uls.searchParams.get("khuvuctinh");
    var khuvuchuyen = uls.searchParams.get("khuvuchuyen");
    var khuvucxa = uls.searchParams.get("khuvucxa");
    if(khuvuctinh != -1 && khuvuctinh != null){
        var urladd = 'http://localhost:8080/api/public/provinceById?id='+khuvuctinh;
        const res = await fetch(urladd, {
            method: 'GET',
            headers: new Headers({
            })
        });
        var tinh = await res.json();
        document.getElementById("diachismall").innerText = tinh.name;
    }
    if(khuvuchuyen != -1 && khuvuchuyen != null){
        var urladd = 'http://localhost:8080/api/public/districtsById?id='+khuvuchuyen;
        const res = await fetch(urladd, {
            method: 'GET',
            headers: new Headers({
            })
        });
        var huyen = await res.json();
        document.getElementById("diachismall").innerText = huyen.name+", "+huyen.province.name;
    }
    if(khuvucxa != -1 && khuvucxa != null){
        var urladd = 'http://localhost:8080/api/public/wardsById?id='+khuvucxa;
        const res = await fetch(urladd, {
            method: 'GET',
            headers: new Headers({
            })
        });
        var ward = await res.json();
        document.getElementById("diachismall").innerHTML = ward.name+", "+ward.districts.name+", "+ward.districts.province.name
    }
}

$(function () {
    $("#slider-range").slider({
        range: true,
        min: 0,
        max: 100,
        values: [0, 10],
        slide: function (event, ui) {
            $("#amount").val(ui.values[0] + " - " + ui.values[1] + " triệu");
            if (ui.values[0] == ui.values[1]) {
                return false;
            }
            $("#min_price").val(ui.values[0]);
            $("#max_price").val(ui.values[1]);

            $("#min_price").change(function () {
                $("#slider-range").slider("values", 0, $(this).val());
            });
            $("#max_price").change(function () {
                $("#slider-range").slider("values", 1, $(this).val());
            })
        }
    });
});

async function loadDataApi() {
    let customData = {
        "filterByRoom": [
            {
                "room": "6",
                "name": "Chung cư mini",
                "filters": "startDate,endDate,furniture,thietke_chungcumini,khac_chungcumini"
            },
            {
                "room":"2",
                "name": "Cho thuê nhà riêng",
                "filters": "startDate,endDate,furniture,thietke_nharieng,khac_nharieng"
            },
            {
                "room":"3",
                "name": "Tìm người ở ghép",
                "filters": "startDate,endDate,furniture,thietke_oghep,khac_oghep"
            },
            {
                "room":"4",
                "name": "Cho thuê mặt bằng",
                "filters": "startDate,endDate,furniture,thietke_matbang,khac_matbang"
            },
            {
                "room":"1",
                "name": "Cho thuê phòng trọ",
                "filters": "startDate,endDate,furniture,thietke_phongtro,khac_phongtro"
            }
        ],
        "params": [
            {
                "key": "startDate",
                "label": "Từ ngày",
                "ux_type": "date"
            },
            {
                "key": "endDate",
                "label": "Đến ngày",
                "ux_type": "date"
            },
            {
                "key": "furniture",
                "label": "Đồ nội thất",
                "ux_type": "selection_checkbox",
                "options": [
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
                        "id": "heater",
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
                    }
                ]
            },

            {
                "key": "thietke_nharieng",
                "label": "Thiết kế",
                "ux_type": "selection_checkbox",
                "options": [
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
                ]
            },
            {
                "key": "thietke_chungcumini",
                "label": "Thiết kế",
                "ux_type": "selection_checkbox",
                "options": [
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
                ]
            },
            {
                "key": "khac_nharieng",
                "label": "Khác",
                "ux_type": "selection_checkbox",
                "options": [
                    {
                        "id": "wifi",
                        "value": "Wifi",
                        "type": "checkbox"
                    }
                ]
            },
            {
                "key": "khac_chungcumini",
                "label": "Khác",
                "ux_type": "selection_checkbox",
                "options": [
                    {
                        "id": "wifi",
                        "value": "Wifi",
                        "type": "checkbox"
                    },
                    {
                        "id": "service",
                        "value": "Dịch vụ dọn dẹp",
                        "type": "checkbox"
                    }

                ]
            },

            {
                "key": "thietke_matbang",
                "label": "Thiết kế",
                "ux_type": "selection_checkbox",
                "options": [
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
                ]
            },
            {
                "key": "khac_matbang",
                "label": "Khác",
                "ux_type": "selection_checkbox",
                "options": [
                    {
                        "id": "wifi",
                        "value": "Wifi",
                        "type": "checkbox"
                    },
                    {
                        "id": "parking",
                        "value": "Chỗ để xe",
                        "type": "checkbox"
                    }
                ]
            },

            {
                "key": "thietke_oghep",
                "label": "Thiết kế",
                "ux_type": "selection_checkbox",
                "options": [
                    {
                        "id": "numberOfPeople",
                        "value": "Số người tối đa",
                        "type": "text"
                    },
                    {
                        "id": "closedWc",
                        "value": "Vệ sinh khép kín",
                        "type": "checkbox"
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
                ]
            },
            {
                "key": "khac_oghep",
                "label": "Khác",
                "ux_type": "selection_checkbox",
                "options": [
                    {
                        "id": "wifi",
                        "value": "Wifi",
                        "type": "checkbox"
                    },
                    {
                        "id": "parking",
                        "value": "Chỗ để xe",
                        "type": "checkbox"
                    }
                ]
            },

            {
                "key": "thietke_phongtro",
                "label": "Thiết kế",
                "ux_type": "selection_checkbox",
                "options": [
                    {
                        "id": "numberOfPeople",
                        "value": "Số người tối đa",
                        "type": "text"
                    },
                    {
                        "id": "closedWc",
                        "value": "Vệ sinh khép kín",
                        "type": "checkbox"
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
                ]
            },

            {
                "key": "khac_phongtro",
                "label": "Khác",
                "ux_type": "selection_checkbox",
                "options": [
                    {
                        "id": "wifi",
                        "value": "Wifi",
                        "type": "checkbox"
                    },
                    {
                        "id": "parking",
                        "value": "Chỗ để xe",
                        "type": "checkbox"
                    }
                ]
            },
        ]
    }

    var uls = new URL(document.URL)
    var typeLoaiPhong = uls.searchParams.get("loaiphong")

    var listType = customData.filterByRoom.find(i => i.room == typeLoaiPhong ).filters.split(',');

    var list = customData.params.filter(function(item) {
        return listType.includes(item.key);
    });

    if (list) loadDynamicFiletr(list)

}

function loadDynamicFiletr(dataApi) {
    var filterdiv = renderFilter(dataApi)
    var html = `
        <div class="row searchfilter">
            ${filterdiv}
        </div>`
    document.getElementById("dynamicFilter").innerHTML = html
}

function renderFilter(data){
    var html = ''
    if(data != null){
        data.forEach((item) => {
            if (item.ux_type == "single_chip_choice") {
                html += renderSelect(item?.options, item?.key, item?.label)
            }if (item.ux_type == "range") {
                html += renderRange(item?.meta_data, item?.key, item?.label)
            }if (item.ux_type == "date"){
                html += renderDateBox(item?.key, item?.label)
            }if (item.ux_type == "selection_checkbox"){
                html += renderSelectCheckbox(item?.options, item?.key, item?.label)
            }
        })
    }else {
        html = ''
    }
    return html

}

function renderSelectCheckbox(data, name, label) {
    let li = ``
    if (data){
        data.forEach(item => {
            if (item.type == 'checkbox'){
                li += `
                    <li class="detail-filter">
                        <div class="">
                            <label class="form-check-label" for="${item.id}">${item.value}</label>
                            <input class="form-check-input" value="1" type="checkbox" name="${item.id}" id="${item.id}" style="float: right">
                        </div>
                    </li>                            
                `
            }
            else if (item.type == 'text'){
                li += `
                    <li class="detail-filter">
                        <div class="d-flex justify-content-between align-items-center">
                            <label for="${item.id}" class="form-label" style="margin-bottom: 0 !important;">${item.value}</label>
                            <input type="number "  class="form-control" id="${item.id}" name="${item.id}"
                                min="0" oninput="this.value = !!this.value &amp;&amp; Math.abs(this.value) >= 0 ? Math.abs(this.value) : null"
                                style="float: right; max-width: 55px; height: 100%">
                        </div>
                    </li>                            
                `
            }
            else if (item.type == 'select'){
                var liOption = ``
                item.option.forEach(i => {
                    liOption += `<option value="${i.id}">${i.value}</option>`
                })
                li += `
                    <li class="detail-filter">
                        <select class="form-select" name="${item.id}" id="${item.id}" style="border: none; padding: 0; width: 105%;">
                            <option value="" selected>${item.value}</option>
                            ${liOption}
                        </select>
                    </li>
                `
            }

        })
    }

    const html = `
         <div class="col-md chucnangtop">
              <button id="${name}"  style="text-align: left !important;padding-left: 13px !important; height: 37px;" 
                    type="button"  
                    data-bs-toggle="dropdown" 
                    data-bs-auto-close="outside" 
                    aria-expanded="false" 
                    class="btnchonkhuvuc form-control dropdown-toggle ">
                ${label}
              </button>
              <div class="dropdown-menu" style="width: 240px;" aria-labelledby="${name}">
                  <div class="dropdown-content">
                        <ul class="list-filter">
                           ${li}
                        </ul>
                  </div>
                  <div class="d-flex justify-content-around">
                      <div class="btn btn-outline-secondary btn-sm" onclick="removeFilterPrice()">Hủy lọc</div>
                      <button class="btn btn-primary btn-sm" type="submit" onclick="submitForm()">Áp dụng</button>
                  </div>
              </div>
        </div>

      `;
    return html;
}

function renderSelect(data, name, label) {
    var options = ''
    data.forEach(item => {
        options += `<option value="${item.id}">${item.value}</option>`
    })
    var htmlSelect = `
        <div class="col-md chucnangtop"> 
            <select name=${name} id=${name} class="form-control"> 
                <option value="">${label}</option>
                ${options} 
            </select> 
        </div>`
    return htmlSelect
}

function renderRange(data, name, label) {
    const min = data?.slider?.min || 0;
    const max = data?.slider?.max || 100; // Set a default max if not provided in data
    const values = data?.slider?.values || [min, max]; // Default values if not provided
    var minInput = $(`#${name}_min`).val()
    var maxInput = $(`#${name}_max`).val()

    var urlParams = new URLSearchParams(window.location.search);
    var dislayMin = urlParams.get(name+'_min');
    var dislayMax = urlParams.get(name+'_max');
    var displayLabel = label
    var styleLabel = "border-radius: 24px;"
    if (dislayMax || dislayMin) {
        displayLabel = `${label} từ ${dislayMin} đến ${dislayMax} ${data.unit}`
        styleLabel += "color: white; background-color: #0d6efd;"
    }else {
        displayLabel = label
        styleLabel = "border-radius: 24px;"
    }

    // Use template literals for cleaner string construction
    const html = `
         <div class="col-md chucnangtop">
              <button id="${name}"  style="text-align: left !important;padding-left: 13px !important; height: 37px;" type="button"  data-bs-toggle="dropdown" data-bs-auto-close="outside" aria-expanded="false" class="btnchonkhuvuc form-control dropdown-toggle ">
                ${displayLabel}
              </button>
              <div class="dropdown-menu" style="width: 300px;">
                <div id="${name + '_range'}" style="margin: 0 16px;"></div>
                <br>
                <div class="d-flex justify-content-around" style="padding: 0 8px 16px;">
                  Từ
                  <input type="number" id="${name + '_min'}" class="${name}" name="${name + '_min'}" style="width: 100px;" value="${values[0]}" min="0" oninput="this.value = !!this.value &amp;&amp; Math.abs(this.value) >= 0 ? Math.abs(this.value) : '' ">
                  đến
                  <input type="number" id="${name + '_max'}" class="${name}" name="${name + '_max'}" style="width: 100px;" value="${values[1]}" min="0" oninput="this.value = !!this.value &amp;&amp; Math.abs(this.value) >= 0 ? Math.abs(this.value) : '' ">
                  ${data.unit}
                </div>
                <div class="d-flex justify-content-around">
                  <div class="btn btn-outline-secondary btn-sm" onclick="removeFilterPrice()">Hủy lọc</div>
                  <button class="btn btn-primary btn-sm" type="submit" onclick="submitForm()">Áp dụng</button>
                </div>
              </div>
        </div>
    
        <script>
          $(function () { // Ensure jQuery is loaded before initializing slider
            $("#${name + '_range'}").slider({
              range: true,
              min: ${min},
              max: ${max},
              values: [${min}, ${max}],
              slide: function (event, ui) {
                $("#${name + '_min'}").val(ui.values[0]);
                $("#${name + '_max'}").val(ui.values[1]);
    
                // Update slider values on input change as well
                $("#${name + '_min'}").change(function () {
                  $("#${name + '_range'}").slider("values", 0, $(this).val());
                });
                $("#${name + '_max'}").change(function () {
                  $("#${name + '_range'}").slider("values", 1, $(this).val());
                });
              }
            });
          });
          
        </script>
      `;
    return html;
}

function renderDateBox(name, label) {
    var urlParams = new URLSearchParams(window.location.search);
    var dateString = urlParams.get(name);

    var text = label
    if (dateString) {
        text = label + " " + formatDate(dateString)
    }

    var htmlSelect = `
        <div class="col-md chucnangtop">
            <input id="#${name}" 
                name="${name}" 
                class="form-control blackHolder" 
                type="text" 
                onfocus="(this.type='date')" 
                onblur="(this.type='text')" 
                value=""
                placeholder="${text}"/>
        </div>
    `
    return htmlSelect
}

function removeFilterPrice() {
    var uls = new URL(document.URL)
    var loaiphong = uls.searchParams.get("loaiphong");
    if (loaiphong) {
        window.location.href = 'danhsachphong?loaiphong=' + loaiphong
    }
}

//lấy list value form
function filterValues() {

    var form = document.getElementById("formsearch");
    var inputs = form.getElementsByTagName("input");
    var selects = form.getElementsByTagName("select");
    var queryParams = [];

    for (var i = 0; i < inputs.length; i++) {
        var input = inputs[i];
        var value = input.value;

        if (input.type === "checkbox" && !input.checked) {
            continue;
        }

        if (value !== '' && value !== null) {
            queryParams.push(input.name + "=" + encodeURIComponent(value));
        }
    }

    for (var j = 0; j < selects.length; j++) {
        var select = selects[j];
        var selectedValue = select.value;

        if (selectedValue !== '' && selectedValue !== null) {
            queryParams.push(select.name + "=" + encodeURIComponent(selectedValue));
        }
    }

    var queryString = queryParams.join("&");
    var actionUrl = form.action + "?" + queryString;

    console.log('queryString',queryString)
    console.log('actionUrl',actionUrl)
    //window.location.href = actionUrl;
}






