function handleCreateDonhang(data) {
  var option = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  fetch("http://localhost:3000/donHang", option).then(function (response) {
    return response.json();
  });
}
const ApiDonHang = "http://localhost:3000/donHang";
function getCoursesDonHang(callback) {
  fetch(ApiDonHang)
    .then(function (response) {
      return response.json();
    })
    .then(callback);
}
const ApiCart = "http://localhost:3000/oder";
function getCoursesOder(callback) {
  fetch(ApiCart)
    .then(function (response) {
      return response.json();
    })
    .then(callback);
}
if (localStorage.getItem("save") == 0) {
  getCoursesOder((courses) => {
    var arr = [];
    courses.map((item) => {
      if (localStorage.getItem("SaveLogin") == item.idUser) {
        arr.push(item);
      }
    });
    if (arr.length != 0) {
      document.querySelector(".back_don_hang").style.display = "none";
      arr.reverse();
      var arrRevers = arr[0].data;
      var price = 0;
      document.querySelector(
        ".Title_inof .name"
      ).textContent = `+ Họ Tên : ${localStorage.getItem("name")}`;
      document.querySelector(
        ".Title_inof .email"
      ).textContent = `+ Email : ${localStorage.getItem("email")}`;
      document.querySelector(
        ".Title_inof .address"
      ).textContent = `+ Địa Chỉ : ${localStorage.getItem("address")}`;
      document.querySelector(
        ".Title_inof .phone"
      ).textContent = `+ Số Điện Thoại : ${localStorage.getItem("phone")}`;
      var html = arrRevers.map((item, index) => {
        price += parseInt(item.resultPrice.replace(/,/g, ""), 10);
        return `
       <tr class="heading">
       <td>Sản Phầm:</td>
       <td></td>
     </tr>
     <tr class="details">
       <td>Tên Sản Phầm</td>
       <td>${item.name}</td>
     </tr>
     <tr class="details">
       <td>Loại Bộ Nhớ</td>
       <td>${item.type}</td>
     </tr>
     <tr class="details">
       <td>Loại Màu</td>
       <td>${item.color}</td>
     </tr>
     <tr class="details">
       <td>Số Lượng</td>
       <td>${item.qual}</td>
     </tr>
     <tr class="details">
       <td>Giá</td>
       <td>${item.price} x ${item.qual}</td>
     </tr>
       `;
      });
      document.querySelector(".container_unit_price").innerHTML = html.join("");
      document.querySelector(
        "#result_price"
      ).textContent = `${price.toLocaleString("en-US")} đ`;
      var html1 = `
    <a class="Link" href="#">
    <button class="huy_don-${arr[0].id}" id="save" onclick="deleteData(${arr[0].id})">Huy</button>
    </a>
    <button id="print">Xuấn Đơn</button>
    <button " class="btn_dat_hang" id="print" >Đặt Hàng</button>
    `;
      document.querySelector(".buttons-container").innerHTML = html1;
      if (localStorage.getItem("save") == 0) {
        document.querySelector(".buttons-container #print").style.display =
          "none";
      }

      let printBtn = document.querySelector("#print");
      printBtn.addEventListener("click", function () {
        window.print();
      });
      document
        .querySelector(".btn_dat_hang")
        .addEventListener("click", function () {
          huydon(arr[0].id);
          window.print();
          const data = {
            idUser: localStorage.getItem("SaveLogin"),
            name: localStorage.getItem("name"),
            email: localStorage.getItem("email"),
            phone: localStorage.getItem("phone"),
            address: localStorage.getItem("address"),
            arrRevers,
          };
          handleCreateDonhang(data);
          const messageText = arrRevers
            .map((item, index) => {
              return `Sản Phầm Số ${index + 1}:
                      Tên Sản Phầm: ${item.name}
                      Loại Bộ Nhớ : ${item.type}
                      Mau : ${item.color}
                      Số Lượng: ${item.qual}
                      Giá: ${item.price}
                      Tổng Giá: ${item.resultPrice}
                      Thời Gian Đặt Hàng: ${item.time}
                      `;
            })
            .join("\n");
          const BOT_TOKEN = "6560886972:AAHxn_u_QU3y0XvmU_a9JKsInNpeEJi6Fzw";
          const CHAT_ID = "1127474628";
          async function sendMessage(message) {
            try {
              const response = await axios.post(
                `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
                {
                  chat_id: CHAT_ID,
                  text: message,
                }
              );
              console.log("Message sent successfully:", response.data);
            } catch (error) {
              console.error("Error sending message:", error.message);
            }
          }
          // Usage example:
          const messageToSend = `=====================================
        Họ Tên : ${localStorage.getItem("name")} 
        Email : ${localStorage.getItem("email")}
        Địa Chỉ :${localStorage.getItem("address")}
        Số Điện Thoại : ${localStorage.getItem("phone")}
        =====================================
        ${messageText}
              `;
          sendMessage(messageToSend);

          //   }
          // })

          // })
        });
    } else {
      document.querySelector(".table").style.display = "none";
    }
  });
} else {
  document.querySelector(
    ".Title_inof .name"
  ).textContent = `+ Họ Tên : ${localStorage.getItem("name")}`;
  document.querySelector(
    ".Title_inof .email"
  ).textContent = `+ Email : ${localStorage.getItem("email")}`;
  document.querySelector(
    ".Title_inof .address"
  ).textContent = `+ Địa Chỉ : ${localStorage.getItem("address")}`;
  document.querySelector(
    ".Title_inof .phone"
  ).textContent = `+ Số Điện Thoại : ${localStorage.getItem("phone")}`;
  getCoursesDonHang((courses) => {
    document.querySelector(".back_don_hang").style.display = "none";
    var price = 0;
    courses.map((item, index) => {
      if (item.id == localStorage.getItem("save")) {
        const html = item.arrRevers.map((item) => {
          price += parseInt(item.resultPrice.replace(/,/g, ""), 10);
          return `
       <tr class="heading">
       <td>Sản Phầm:</td>
       <td></td>
     </tr>
     <tr class="details">
       <td>Tên Sản Phầm</td>
       <td>${item.name}</td>
     </tr>
     <tr class="details">
       <td>Loại Bộ Nhớ</td>
       <td>${item.type}</td>
     </tr>
     <tr class="details">
       <td>Loại Màu</td>
       <td>${item.color}</td>
     </tr>
     <tr class="details">
       <td>Số Lượng</td>
       <td>${item.qual}</td>
     </tr>
     <tr class="details">
       <td>Giá</td>
       <td>${item.price} x ${item.qual}</td>
     </tr>
       `;
        });
        document.querySelector(".container_unit_price").innerHTML =
          html.join("");
        document.querySelector(
          "#result_price"
        ).textContent = `${price.toLocaleString("en-US")} đ`;
        var html1 = `
        <a class="Link" href="#">
        <button class="huy_don-${item.id}" id="save" onclick="huydon(${item.id})">Huy Đon Hàng</button>
        </a>
        <button id="print">Xuất Đơn</button>
        <button " class="btn_dat_hang" id="print" >Đặt Hàng</button>
        `;

        document.querySelector(".buttons-container").innerHTML = html1;
        document.querySelector(".btn_dat_hang").style.display = "none";
        document.querySelector("#print").addEventListener("click", function () {
          window.print();
        });
      }
    });
  });
}
function deleteData(id) {
  if (confirm("Bạn muốn hủy hóa dơn này không ?")) {
    huydon(id);
  }
}
function huydon(id) {
  if (localStorage.getItem("save") == 0) {
    var option = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    };
    fetch(`${ApiCart}/${id}`, option).then(function (response) {
      return response.json();
    });
    document.querySelector(".Link").href = "indexCart.html";
  } else {
    if (confirm("Bạn động ý hủy hóa đơn này không ?")) {
      var option = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      };
      fetch(`http://localhost:3000/donHang/${id}`, option).then(function (
        response
      ) {
        return response.json();
      });
      document.querySelector(".Link").href = "indexDonHang.html";
    }
  }
}
