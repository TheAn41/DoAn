async function loadProvince() {
    var uls = new URL(document.URL)
    var khuvuctinh = uls.searchParams.get("khuvuctinh") ? uls.searchParams.get("khuvuctinh") : -1
    var urladd = 'http://localhost:8080/api/public/province';
    const response = await fetch(urladd, {
      method: 'GET',
      headers: new Headers({
      })
    });
    var listpro = await response.json();
    var main = `<option selected value="${khuvuctinh}">Tất cả tỉnh</option>`
    for(i=0; i<listpro.length; i++){
        main += `<option value="${listpro[i].id}">${listpro[i].name}</option>`
    }
    document.getElementById("tinh").innerHTML = main
}

async function loadTown(id) {
    var urladd = 'http://localhost:8080/api/public/districts?id='+id;
    const response = await fetch(urladd, {
      method: 'GET',
      headers: new Headers({
      })
    });
    var list = await response.json();
    var main = '<option selected value="-1">Tất cả huyện</option>'
    for(i=0; i<list.length; i++){
        main += `<option value="${list[i].id}">${list[i].name}</option>`
    }
    document.getElementById("huyen").innerHTML = main
    // loadWard(list[0].id)
}

async function loadWard(id) {
    var urladd = 'http://localhost:8080/api/public/wards?id='+id;
    const res = await fetch(urladd, {
        method: 'GET',
        headers: new Headers({
        })
    });
    var list = await res.json();
    var main = '<option selected value="-1">Tất cả xã</option>'
    for(i=0; i<list.length; i++){
        main += `<option value="${list[i].id}">${list[i].name}</option>`
    }
    document.getElementById("xa").innerHTML = main
}

async function loadHuyen(){
    var id =  document.getElementById("tinh").value
    if(id==-1){
        var main = ''
        document.getElementById("xa").innerHTML = main
        document.getElementById("huyen").innerHTML = main
        document.getElementById("btnchonkhuvuc").innerText = 'Tất cả khu vực'
        return;
    }
    var idtinh = document.getElementById("tinh").value;
    var urladd = 'http://localhost:8080/api/public/provinceById?id='+idtinh;
    const res = await fetch(urladd, {
        method: 'GET',
        headers: new Headers({
        })
    });
    var tinh = await res.json();
    document.getElementById("btnchonkhuvuc").innerText = tinh.name;
    loadTown(id);
}

async function loadXa(){
    var id =  document.getElementById("huyen").value
    if(id==-1){
        var main = ''
        document.getElementById("xa").innerHTML = main
        var idtinh = document.getElementById("tinh").value;
        var urladd = 'http://localhost:8080/api/public/provinceById?id='+idtinh;
        const res = await fetch(urladd, {
            method: 'GET',
            headers: new Headers({
            })
        });
        var tinh = await res.json();
        document.getElementById("btnchonkhuvuc").innerText = tinh.name;
        return;
    }
    var idhuyen = document.getElementById("huyen").value;
    var urladd = 'http://localhost:8080/api/public/districtsById?id='+idhuyen;
    const res = await fetch(urladd, {
        method: 'GET',
        headers: new Headers({
        })
    });
    var huyen = await res.json();
    document.getElementById("btnchonkhuvuc").innerText = huyen.name+", "+huyen.province.name;
    loadWard(id);
}

async function setKhuVuc(){
    var id =  document.getElementById("xa").value
    if(id!=-1){
        var xa = document.getElementById("xa").value
        var urladd = 'http://localhost:8080/api/public/wardsById?id='+xa;
        const res = await fetch(urladd, {
            method: 'GET',
            headers: new Headers({
            })
        });
        var ward = await res.json();
        document.getElementById("btnchonkhuvuc").innerText = ward.name+", "+ward.districts.name
    }
    // $("#chonkhuvuc").modal('hide');
}


