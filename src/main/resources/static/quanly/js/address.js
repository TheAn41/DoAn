async function loadProvince() {
    var urladd = 'http://localhost:8080/api/public/province';
    const response = await fetch(urladd, {
      method: 'GET',
      headers: new Headers({
      })
    });
    var listpro = await response.json();
    var main = ''
    for(i=0; i<listpro.length; i++){
        main += `<option value="${listpro[i].id}">${listpro[i].name}</option>`
    }
    document.getElementById("tinh").innerHTML = main
    loadTown(listpro[0].id)
}

async function loadTown(id) {
    var urladd = 'http://localhost:8080/api/public/districts?id='+id;
    const response = await fetch(urladd, {
      method: 'GET',
      headers: new Headers({
      })
    });
    var list = await response.json();
    var main = ''
    for(i=0; i<list.length; i++){
        main += `<option value="${list[i].id}">${list[i].name}</option>`
    }
    document.getElementById("huyen").innerHTML = main
    loadWard(list[0].id)
}

async function loadWard(id) {
    var urladd = 'http://localhost:8080/api/public/wards?id='+id;
    const res = await fetch(urladd, {
        method: 'GET',
        headers: new Headers({
        })
    });
    var list = await res.json();
    var main = ''
    for(i=0; i<list.length; i++){
        main += `<option value="${list[i].id}$$${list[i].name}, ${list[i].districts.name}, ${list[i].districts.province.name}">${list[i].name}</option>`
    }
    document.getElementById("xa").innerHTML = main
    hienThiDiaChiDaChon();
}

function hienThiDiaChiDaChon(){
    var val = document.getElementById("xa").value.split("$$")[1];
    var tend = document.getElementById("tenduong").value;
    document.getElementById("dcdachon").value = tend +", " +val;
}

async function loadHuyen(){
    var id =  document.getElementById("tinh").value
    loadTown(id);
}

async function loadXa(){
    var id =  document.getElementById("huyen").value
    loadWard(id);
}


