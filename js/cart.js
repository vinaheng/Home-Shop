// call api
function getCoursesApi(Api,callback) {
  fetch(Api)
    .then(function (response) {
      return response.json();
    })
    .then(callback);
}
function handleCreate(Api,data) {
  var option = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  fetch(Api, option).then(function (response) {
    return response.json();
  });
}
function deleteJson(Api,id) {
  if (confirm("Bạn muốn xóa sản phầm này không ?")) {
    var option = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    };
    fetch(`${Api}/${id}`, option).then(function (response) {
      return response.json();
    });
  }
}
// 
const value = localStorage.getItem("SaveLogin");
if (value !== null) {
  // The value was found in localStorage
  getCoursesApi("http://localhost:3000/dataUser",function (courses) {
    courses.map((item) => {
      if (value == item.id) {
        const html = `
					<span class="header__navbar-bar--txt">
						<img class="header__navbar-bar--item-img--user" src="${
              item.logo != "" ? item.logo : "./img/user.png"
            }" alt="">
						<a href="#" class="header__navbar-bar--link header__navbar-bar--link-user">${
              item.name
            }</a>
					</span>
					`;
        document.querySelector(".show__user-list").innerHTML = html;

        document.querySelector(".show__user-list").classList.remove("hide");
      }
    });
  });
}
reload();
function reload() {
  getCoursesApi('http://localhost:3000/Cart',(courses) => {
    var htmlCart1 = courses.map((item) => {
      if (localStorage.getItem("SaveLogin") == item.idCart) {
        var optionType = item.ArrType.map((ite) => {
          return `
                    <option value="${ite}">${ite}</option>
                    `;
        });
        var optionColor = item.ArrColor.map((ite) => {
          return `
                    <option value="${ite}">${ite}</option>
                    `;
        });
        return `
                <div class="col l-12 m-12 c-12 item " id="${item.id}">
                <div class="container_cart_bar">
                    <div class="cart_bar_left">
                        <input type="checkbox" class="checked_all_item" id="checkbox_${
                          item.id
                        }">
                        <img id="item_img-${item.id}" src="${item.img}" alt="">
                    </div>
                    <div class="cart_bar_right">
                        <div class="item_bar_pd">
                            <p id="select_item_name-${item.id}">${item.name}</p>
                        </div>
                        <div class="item_bar_pd item_bar_pd_item">
                            <select  onchange="selectOption(${
                              item.id
                            })" name="" id="select_item_type-${item.id}">
                              ${optionType.join("")}
                            </select>
                        </div>
                        <div class="item_bar_pd item_bar_pd_item">
                            <select name="" id="select_item_color-${item.id}">
                            ${optionColor.join("")}
                            </select>
                        </div>
                        <div class="item_bar_pd">
                            <span class="item_price-${item.id}">${
          item.price
        }</span>
                        </div>
                        <div class="item_bar_pd">
                            <button  onclick=" clickGiam(${
                              item.id
                            })" class="btn_chu btn-remove_item"><i class="fa-solid fa-square-minus"></i></button>
                            <input type="text " class="so_luong_sp so_luong_sp-${
                              item.id
                            }">
                            <button onclick="clickThem(${
                              item.id
                            })" class="btn_cong  btn-remove_item"><i class="fa-solid fa-square-plus"></i></button>
                        </div>
                        <div class="item_bar_pd ">
                            <span class="price item_price_resual-${item.id}">${
          item.price
        }</span>
                        </div>
                        <div class="item_bar_pd remove">
                            <button class="btn-remove_item" onclick="deleteJson('http://localhost:3000/Cart',${
                              item.id
                            })" ><i class="fa-solid fa-delete-left"></i></button>
                        </div>
                    </div>
                </div>
            </div>
                `;
      }
    });
    document.querySelector(".container-item_product").innerHTML =
      htmlCart1.join("");
    courses.map((item) => {
      if (localStorage.getItem("SaveLogin") == item.idCart) {
        selectOption(item.id);
        document.querySelector(`#select_item_type-${item.id}`).value =
          item.type;
        document.querySelector(`#select_item_color-${item.id}`).value =
          item.color;
      }
    });
    // checked

    document.querySelector(".conatiner_oder_pd .btn").onclick = function () {
      localStorage.setItem("save", "0");
      var data = []; // Initialize data as an empty array
      var listItem = document.querySelectorAll(".container-item_product .item");
      const currentDate = new Date();

      // Get the various components of the date
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth(); // Months are zero-based (0 - 11)
      const day = currentDate.getDate();
      const hours = currentDate.getHours();
      const minutes = currentDate.getMinutes();
      listItem.forEach((item) => {
        if (document.querySelector("#checkbox_" + item.id).checked) {
          var listData = {
            name: document.querySelector("#select_item_name-" + item.id)
              .textContent,
            type: document.querySelector("#select_item_type-" + item.id).value,
            color: document.querySelector("#select_item_color-" + item.id)
              .value,
            qual: document.querySelector(".so_luong_sp-" + item.id).value,
            price: document.querySelector(".item_price-" + item.id).textContent,
            resultPrice: document.querySelector(".item_price_resual-" + item.id)
              .textContent,
            time: `${year}-${month + 1}-${day}(${
              hours > 12 ? hours - 12 : hours
            } :${minutes} ${hours < 12 ? "AM" : "PM"})`,
            img: document.querySelector("#item_img-" + item.id).src,
          };
          data.push(listData);
        }
      });
      if (data.length != 0) {
        // document.querySelector(".conatiner_oder_pd").href =
        //   "indexUnitPrice.html";
        window.location.href = 'indexUnitPrice.html'
        handleCreate("http://localhost:3000/oder",{ idUser: localStorage.getItem("SaveLogin"), data });
      } else {
        toast({
          title: "Warning",
          message: "Chưa Chọn Sản Phầm !",
          type: "warning",
          duration: 3000,
        });
      }
    };
    var error = document.querySelectorAll(
      ".container-item_product .item"
    ).length;
    if (error != 0) {
      var SoLuong = document.querySelectorAll(".so_luong_sp");
      SoLuong.forEach((item) => {
        item.value = 1;
      });
      var checkAll = document.querySelector(".checked_all");
      var checkAllItem = document.querySelectorAll('input[class="checked_all_item"]');
      checkAll.onchange = () => {
        checkAllItem.forEach((item) => {
          item.checked = checkAll.checked;
        });
      };
      checkAllItem.forEach(function(item){
        item.onchange=function(){
          const checkCheckedAll = checkAllItem.length === document.querySelectorAll('input[class="checked_all_item"]:checked').length;
          if(checkCheckedAll){
            checkAll.checked = true
          }else{
            checkAll.checked = false
          }
        }
      })
    }
  });
}
function clickThem(id) {
  selectOption(id);
  var txtSoLuong = document.querySelector(`.so_luong_sp-${id}`);
  txtSoLuong.value = Number(txtSoLuong.value) + 1;
}
function clickGiam(id) {
  selectOption(id);
  var txtSoLuong = document.querySelector(`.so_luong_sp-${id}`);
  if (Number(txtSoLuong.value) <= 1) {
    txtSoLuong.value = 1;
  } else {
    txtSoLuong.value = Number(txtSoLuong.value) - 1;
  }
}
function selectOption(id) {
  getCoursesApi('http://localhost:3000/Cart',(courses) => {
    courses.map((item) => {
      if (localStorage.getItem("SaveLogin") == item.idCart) {
        if(item.id==id){
        var option = document.querySelector(`#select_item_type-${id}`).value;
        var soluong = document.querySelector(`.so_luong_sp-${id}`).value;
        const regex = /\d+/;
        const match = item.descount.match(regex);
        document.querySelector(`.item_bar_pd .item_price-${id}`).textContent = `${parseInt(((100 - parseInt(match[0])) / 100) *
            parseInt(item.ArrPrice[option].replace(/,/g, ""), 10)
        ).toLocaleString("en-US")} ​đ`;
        document.querySelector(
          `.item_bar_pd .item_price_resual-${id}`
        ).textContent = `${(
          parseInt(
            ((100 - parseInt(match[0])) / 100) *
              parseInt(item.ArrPrice[option].replace(/,/g, ""), 10)
          ) * soluong
        ).toLocaleString("en-US")} ​đ`;
        }
      }
    });
  });
}
// Toast
function toast({ title = "", message = "", type = "", duration = 3000 }) {
  const main = document.getElementById("toast");
  if (main) {
    const toast = document.createElement("div");
    //auto remove toast
    const autoRemoveID = setTimeout(function () {
      main.removeChild(toast);
    }, duration);
    //Remove toast when ckicked
    toast.onclick = function (e) {
      if (e.target.closest(".toast-close")) {
        main.removeChild(toast);
        clearTimeout(autoRemoveID);
      }
    };
    const icons = {
      success: "fas fa-check-circle",
      info: "fas fa-info-circle",
      warning: "fas fa-exclamation-circle",
      error: "fas fa-exclamation-circle",
    };
    const icon = icons[type];
    toast.classList.add("toast", `toast-${type}`);
    toast.innerHTML = `
	   <div class="toast-icon">
		<i class="${icon}"></i>
	  </div>
	  <div class="toast-body">
		 <h3 class="toast-title">${title}</h3>
		 <p class="toast-msg">${message}</p>
	  </div>
	  <div class="toast-close"> <i class="fas fa-times"></i></div>
		 `;
    main.appendChild(toast);
  }
}
