var token = sessionStorage.getItem("token");

async function tinhdoanhthu(nam) {
    if (nam < 2000) {
        nam = new Date().getFullYear()
    }
    var url = 'http://localhost:8080/api/admin/doanhthu?nam=' + nam;
    const response = await fetch(url, {
        method: 'GET',
        headers: new Headers({
            'Authorization': 'Bearer ' + token
        })
    });
    var list = await response.json();
    console.log(list)
    var main = '';
    for (i = 0; i < list.length; i++) {
        if (list[i] == null) {
            list[i] = 0
        }
    }


    var lb = 'doanh thu năm ' + nam;
    const ctx = document.getElementById("chart").getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ["tháng 1", "tháng 2", "tháng 3", "tháng 4",
                "tháng 5", "tháng 6", "tháng 7", "tháng 8", "tháng 9", "tháng 10", "tháng 11", "tháng 12"],
            datasets: [{
                label: lb,
                backgroundColor: 'rgba(161, 198, 247, 1)',
                borderColor: 'rgb(47, 128, 237)',
                data: list,
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        callback: function (value) {
                            return formatmoney(value);
                        }
                    }
                }]
            }
        },
    });
}

function loadByNam() {
    var nam = document.getElementById("nams").value;
    tinhdoanhthu(nam);
}

const VND = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
});

function formatmoney(money) {
    return VND.format(money);
}


async function loadLichSuNap() {
    $('#example').DataTable().destroy();
    var start = document.getElementById("start").value;
    var end = document.getElementById("end").value;
    var url = 'http://localhost:8080/api/admin/all-history-pay';
    if (start !== "" && end !== "") {
        url += '?start=' + start + '&end=' + end;
    }

    const response = await fetch(url, {
        method: 'GET',
        headers: new Headers({
            'Authorization': 'Bearer ' + token
        })
    });

    const list = await response.json();
    let main = '';
    let total = 0;

    for (let i = 0; i < list.length; i++) {
        main += `<tr>
                    <td>${list[i].createdTime}<br>${list[i].createdDate}</td>
                    <td>${list[i].orderId}</td>
                    <td>MOMO</td>
                    <td>${formatmoney(list[i].totalAmount)}</td>
                    <td>Da Nhan</td>
                    <td>${list[i].user.username}</td>
                </tr>`;
        total += list[i].totalAmount;
    }

    document.getElementById("listichsu").innerHTML = main;
    document.getElementById("tongDoanhThu").innerText = formatmoney(total) + " đ";
    $('#example').DataTable();
}

function formatmoney(amount) {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function exportToExcel() {
    let table = document.getElementById("example");
    let wb = XLSX.utils.table_to_book(table, { sheet: "Lịch sử nạp" });
    let ws = wb.Sheets["Lịch sử nạp"];

    // Lấy header (dòng đầu tiên) để tìm vị trí cột "Ma Giao D"
    let headers = [];
    const range = XLSX.utils.decode_range(ws['!ref']);
    for (let C = range.s.c; C <= range.e.c; ++C) {
        let cellAddress = XLSX.utils.encode_cell({ r: range.s.r, c: C });
        let cell = ws[cellAddress];
        headers.push(cell ? cell.v : "");
    }
// Canh giữa tiêu đề cột (dòng đầu tiên)
    for (let C = range.s.c; C <= range.e.c; ++C) {
        let cellAddress = XLSX.utils.encode_cell({ r: range.s.r, c: C });
        let cell = ws[cellAddress];
        if (cell) {
            if (!cell.s) cell.s = {};
            if (!cell.s.alignment) cell.s.alignment = {};
            cell.s.alignment.horizontal = "center";
            // Nếu muốn canh giữa cả theo chiều dọc
            cell.s.alignment.vertical = "center";
        }
    }

    // Tìm index cột "Ma Giao D"
    let maGiaoDColIndex = headers.findIndex(h => h.trim().toLowerCase().startsWith("ma giao dich"));

    if (maGiaoDColIndex === -1) {
        console.warn("Không tìm thấy cột 'Ma Giao Dich'");
    } else {
        // Ép kiểu string cho cột "Ma Giao D" ở tất cả các dòng dữ liệu
        for (let R = range.s.r + 1; R <= range.e.r; ++R) {
            let cellAddress = XLSX.utils.encode_cell({ r: R, c: maGiaoDColIndex });
            let cell = ws[cellAddress];
            if (cell && cell.v != null) {
                cell.t = "s"; // ép kiểu string
                cell.v = String(cell.v); // convert giá trị thành string
                cell.z = "@"; // định dạng cell dạng text
            }
        }
    }

    // Tự động canh chỉnh độ rộng cột
    let colWidths = [];
    for (let C = range.s.c; C <= range.e.c; ++C) {
        let maxLen = 10;  // Chiều rộng mặc định tối thiểu
        for (let R = range.s.r; R <= range.e.r; ++R) {
            let cell = ws[XLSX.utils.encode_cell({ r: R, c: C })];
            if (cell && cell.v) {
                let cellValue = String(cell.v);
                maxLen = Math.max(maxLen, cellValue.length);
            }
        }
        colWidths.push({ wch: maxLen + 2 });
    }
    ws['!cols'] = colWidths;

    XLSX.writeFile(wb, "lich_su_nap.xlsx");
}



async function exportToPDF() {
    const {jsPDF} = window.jspdf;
    let doc = new jsPDF();


    // doc.setFont("Roboto Regular");
    doc.setFontSize(18);
    doc.text("History Pay", 14, 20);

    const table = document.getElementById("example");
    const headers = [];
    const data = [];

    // Lấy header
    const headerCells = table.querySelectorAll("thead th");
    headerCells.forEach(th => headers.push(th.innerText));

    // Lấy dữ liệu
    const rows = table.querySelectorAll("tbody tr");
    rows.forEach(tr => {
        const row = [];
        tr.querySelectorAll("td").forEach(td => row.push(td.innerText.trim()));
        data.push(row);
    });

    doc.autoTable({
        head: [headers],
        body: data,
        startY: 30
    });


    doc.save("lich_su_nap.pdf");
}

// <script src="Roboto_Regular.js"></script>



