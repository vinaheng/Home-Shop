
document.querySelectorAll(".page-content").forEach((item) => {
  item.style.display = "none";
});
var id = localStorage.getItem("saveMenu");
if (id == 1) {
  document.querySelector(".container_admin").style.display = "block";
  document.querySelector(".admin").classList.add("active");
} else if (id == 2) {
  document.querySelector(".container_user").style.display = "block";
  document.querySelector(".user").classList.add("active");
} else if (id == 3) {
  document.querySelector(".container_product").style.display = "block";
  document.querySelector(".product").classList.add("active");
} else {
  document.querySelector(".container_oder").style.display = "block";
  document.querySelector(".oder").classList.add("active");
}
const html = document.documentElement;
const body = document.body;
const menuLinks = document.querySelectorAll(".admin-menu a");
const collapseBtn = document.querySelector(".admin-menu .collapse-btn");
const toggleMobileMenu = document.querySelector(".toggle-mob-menu");
const switchInput = document.querySelector(".switch input");
const switchLabel = document.querySelector(".switch label");
const switchLabelText = switchLabel.querySelector("span:last-child");
const collapsedClass = "collapsed";
const lightModeClass = "light-mode";

/*TOGGLE HEADER STATE*/
collapseBtn.addEventListener("click", function () {
  body.classList.toggle(collapsedClass);
  this.getAttribute("aria-expanded") == "true"
    ? this.setAttribute("aria-expanded", "false")
    : this.setAttribute("aria-expanded", "true");
  this.getAttribute("aria-label") == "collapse menu"
    ? this.setAttribute("aria-label", "expand menu")
    : this.setAttribute("aria-label", "collapse menu");
});

/*TOGGLE MOBILE MENU*/
toggleMobileMenu.addEventListener("click", function () {
  body.classList.toggle("mob-menu-opened");
  this.getAttribute("aria-expanded") == "true"
    ? this.setAttribute("aria-expanded", "false")
    : this.setAttribute("aria-expanded", "true");
  this.getAttribute("aria-label") == "open menu"
    ? this.setAttribute("aria-label", "close menu")
    : this.setAttribute("aria-label", "open menu");
});

/*SHOW TOOLTIP ON MENU LINK HOVER*/
for (const link of menuLinks) {
  link.addEventListener("mouseenter", function () {
    if (
      body.classList.contains(collapsedClass) &&
      window.matchMedia("(min-width: 768px)").matches
    ) {
      const tooltip = this.querySelector("span").textContent;
      this.setAttribute("title", tooltip);
    } else {
      this.removeAttribute("title");
    }
  });
}

/*TOGGLE LIGHT/DARK MODE*/
if (localStorage.getItem("dark-mode") === "false") {
  html.classList.add(lightModeClass);
  switchInput.checked = false;
  switchLabelText.textContent = "Light";
}

switchInput.addEventListener("input", function () {
  html.classList.toggle(lightModeClass);
  if (html.classList.contains(lightModeClass)) {
    switchLabelText.textContent = "Light";
    localStorage.setItem("dark-mode", "false");
  } else {
    switchLabelText.textContent = "Dark";
    localStorage.setItem("dark-mode", "true");
  }
});
$(document).ready(function () {
  $(".txt_pass_admin").after('<span class="password--helper">Show</span>');

  $(".password--helper").on("click", function () {
    var $this = $(this);
    var $password = $this.prev("input");
    "password" == $password.attr("type")
      ? $password.attr("type", "text")
      : $password.attr("type", "password");
    "Hide" == $this.text() ? $this.text("Show") : $this.text("Hide");
    $password.focus();
  });
});
function clickMenu(id) {
  localStorage.setItem("saveMenu", id);
  document.querySelectorAll(".page-content").forEach((item) => {
    item.style.display = "none";
  });
  document.querySelectorAll("a").forEach((item) => {
    item.classList.remove("active");
  });
  if (id == 1) {
    document.querySelector(".container_admin").style.display = "block";
    document.querySelector(".admin").classList.add("active");
  } else if (id == 2) {
    document.querySelector(".container_user").style.display = "block";
    document.querySelector(".user").classList.add("active");
  } else if (id == 3) {
    document.querySelector(".container_product").style.display = "block";
    document.querySelector(".product").classList.add("active");
  } else {
    document.querySelector(".container_oder").style.display = "block";
    document.querySelector(".oder").classList.add("active");
  }
}
const Api = "http://localhost:3000/dataProduct";

getCourses((courses) => {
  const array = [
    ...new Set(
      courses.map((item) => {
        return item;
      })
    ),
  ];
  document.querySelector("#find_item_product").oninput = function (e) {
    document.querySelector("#select_option_find-product").value = "All";
    const searchData = e.target.value.toLowerCase();
    const filteredData = array.filter((item) => {
      return item.name.toLowerCase().includes(searchData);
    });
    if (filteredData.length != 0) {
      randerCourses(filteredData);
    } else {
      document.querySelector("#select_option_find-product").click();
    }
  };

  document.querySelector("#select_option_find-product").onchange = function (
    e
  ) {
    sessionStorage.setItem(
      "saveSelect",
      document.querySelector("#select_option_find-product").value
    );
    const searchData = e.target.value.toLowerCase();
    const filteredData = array.filter((item) => {
      return item.category.toLowerCase().includes(searchData);
    });
    if (filteredData.length != 0) {
      randerCourses(filteredData);
    } else {
      randerCourses(array);
    }
  };
  randerCourses(array);
});
function getCourses(callback) {
  document.querySelector(".txt_product_name").focus();

  fetch(Api)
    .then(function (response) {
      return response.json();
    })
    .then(callback);
}
function randerCourses(courses) {
  courses.reverse();
  const html = courses.map((course, index) => {
    return `
    <div class="col l-3">
            <div class="body__product-home">
              <a href="#" class="body__product-home--item">
                <div class="body__product-home--img" style="
                                        background-image: url(${course.img[0]});
                                    "></div>
                <div class="container_item_bottom">
                  <div class="body__product-home-heading">
                    <h3>
                      ${course.name}
                    </h3>
                  </div>
                  <div class="body__product-home--price">
                    <span class="body__product-home--price-new">${parseInt(
                      course.priceView[0]
                    ).toLocaleString("en-US")} đ</span>
                  </div>
                </div>
              </a>
              <!--  -->
              <div class="body__product-home--love">
                <span>Giảm giá ${course.discount}%</span>
              </div>
              <div class="body__product-home--price">
                <button class='btn_st  btn_re' onclick="handleDelectCourses(${
                  course.id
                })"><i class="fa-solid fa-trash"></i></button>
                <button class='btn_st btn_edit' onclick="handleEditCourses(${
                  course.id
                })"><i class="fa-solid fa-file-pen" ></i></button>
              </div>
            </div>
          </div>
        `;
  });

  document.querySelector(".container_product_item").innerHTML = html.join("");
}
function handleCreate(data, callback) {
  var option = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  fetch(Api, option)
    .then(function (response) {
      return response.json();
    })
    .then(callback);
}
document.querySelector("#btn_save").style.display = "none";
function handleForm() {
  var arrImg = [],
    arrColor = [],
    arrType = [],
    arrPrice = [],
    priceResult = {};
  document.querySelector("#btn_save").classList.remove("active");
  var listImmg = document.querySelectorAll(".contain_img img");
  var listColor = document.querySelectorAll(".container_color input");
  var listType = document.querySelectorAll(".container_type .txt_type_product");
  var listPrice = document.querySelectorAll(
    ".container_type .txt_product_price"
  );
  listImmg.forEach((element) => {
    arrImg.push(element.src);
  });
  listColor.forEach((element) => {
    arrColor.push(element.value);
  });
  listType.forEach((element) => {
    arrType.push(element.value);
  });
  listPrice.forEach((element) => {
    arrPrice.push(element.value.replace(/,/g, ""));
  });
  for (var i = 0; i < arrType.length; i++) {
    priceResult[arrType[i]] = arrPrice[i];
  }
  var productName = document.querySelector(".txt_product_name");
  var productDiscount = document.querySelector(".txt_product_discount");
  var category = document.querySelector(".txt_category");
  var formData = {
    name: productName.value,
    discount: productDiscount.value,
    img: arrImg,
    type: arrType,
    color: arrColor,
    price: priceResult,
    priceView: arrPrice,
    category: category.value,
    desc: CKEDITOR.instances.editor1.getData(),
  };
  handleCreate(formData, function () {
    getCourses(randerCourses);
    productName.value = "";
    productDiscount.value = "";
    desc.value = "";
    category.value = "";
    productName.focus();
  });
}
function deleteJson(id, callback) {
  if (confirm("Bạn cần xóa dư liệu này không ?")) {
    var option = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    };
    fetch(`${Api}/${id}`, option)
      .then(function (response) {
        return response.json();
      })
      .then(function () {});
  }
}
function handleDelectCourses(id) {
  try {
    deleteJson(id, () => {
      getCourses(randerCourses);
    });
  } catch (error) {}
}
function handleEdit(data, id, callback) {
  var option = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  fetch(`${Api}/${id}`, option)
    .then(function (response) {
      return response.json();
    })
    .then(callback);
}
function handleEditCourses(id) {
  document.querySelector("#btn_save").style.display = "";

  var productName = document.querySelector(".txt_product_name");
  var productDiscount = document.querySelector(".txt_product_discount");
  var category = document.querySelector(".txt_category");

  document
    .querySelectorAll(".container_color .input_from01")
    .forEach((item) => {
      item.remove();
    });
  document.querySelectorAll(".container_type .input_from01").forEach((item) => {
    item.remove();
  });
  document.querySelectorAll(".container_img_remove").forEach((item) => {
    item.remove();
  });

  getCourses((couse) => {
    couse.map((item, index) => {
      if (item.id == id) {
        productName.value = item.name;
        // productPrice.value = Number((item.price).replace(/\D/g, '')).toLocaleString();
        productDiscount.value = item.discount;
        category.value = item.category;
        CKEDITOR.instances.editor1.setData(item.desc);
        for (var i = 0; i < item.type.length; i++) {
          randerFormType(i + 1, item.type[i], item.price[item.type[i]]);
        }
        item.color.map((value, index) => {
          randerFormColor(index + 1, value);
        });
        item.img.map((value, index) => {
          randerFormImg(index + 1, value);
        });
      }
    });
  });

  var btnSave = document.querySelector("#btn_save");
  btnSave.classList.add("active");
  btnSave.onclick = function () {
    document.querySelector("#btn_save").style.display = "none";
    var arrImg = [],
      arrColor = [],
      arrType = [],
      arrPrice = [],
      priceResult = {};
    btnSave.classList.remove("active");
    var listImmg = document.querySelectorAll(".contain_img img");
    var listColor = document.querySelectorAll(".container_color input");
    var listType = document.querySelectorAll(
      ".container_type .txt_type_product"
    );
    var listPrice = document.querySelectorAll(
      ".container_type .txt_product_price"
    );
    listImmg.forEach((element) => {
      arrImg.push(element.src);
    });
    listColor.forEach((element) => {
      arrColor.push(element.value);
    });
    listType.forEach((element) => {
      arrType.push(element.value);
    });
    listPrice.forEach((element) => {
      arrPrice.push(element.value.replace(/,/g, ""));
    });
    for (var i = 0; i < arrType.length; i++) {
      priceResult[arrType[i]] = arrPrice[i];
    }
    var formData = {
      name: productName.value,
      discount: productDiscount.value,
      img: arrImg,
      type: arrType,
      color: arrColor,
      price: priceResult,
      priceView: arrPrice,
      category: category.value,
      desc: CKEDITOR.instances.editor1.getData(),
    };

    handleEdit(formData, id, function () {
      getCourses(randerCourses);
    });
    productName.value = "";
    desc.value = "";
    title.focus();
  };
}
function randerFormType(indedxType, type, price) {
  var html = `
  <div class="row sm-gutter input_from01 input_type-${indedxType}">
    <div class="col l-6 ">
      <div class="form-group">
        <label for="gi_${indedxType}">Loại bộ nhớ </label>
        <input type="text" class="form-control txt_type_product" value="${type}" id="gi_${indedxType}"
          aria-describedby="emailHelp" placeholder="Loại bộ nhớ :">
      </div>
    </div>
    <div class="col l-6">
      <div class="form-group">
        <label for="gia-${indedxType}">Giá sản phầm</label>
        <input type="text" class="form-control txt_product_price"
          value="${parseInt(price).toLocaleString(
            "en-US"
          )}" id="gia-${indedxType}" aria-describedby="emailHelp"
          oninput="formatNumber(event)" placeholder="Giá sản phầm :">
        <button class="btn_style btn_remove btn_re_type-${indedxType}"><i class="fa-solid fa-xmark"></i></button>
      </div>
    </div>
  </div>`;
  document
    .querySelector(".container_type")
    .insertAdjacentHTML("beforeend", html);
}
function randerFormColor(indexColor, value) {
  var html = `
  <div class="input_from01 input_color-${indexColor}">
                    <div class="form-group">
                      <label for="ga_${indexColor}">Loại Color </label>
                      <input type="text" class="form-control txt_product_price" value="${value}" id="ga_${indexColor}"
                        aria-describedby="emailHelp" placeholder="Loại Color :">
                      <button class="btn_remove btn_style btn_re_color-${indexColor}">
                        <i class="fa-solid fa-xmark"></i>
                      </button>
                    </div>
                  </div>`;
  document
    .querySelector(".container_color")
    .insertAdjacentHTML("beforeend", html);
}
function randerFormImg(indexImg, value) {
  var html = `
  <div class="col l-6 container_img_remove input_img-${indexImg}">
    <button class="btn_style btn_remove btn_re_img-${indexImg}"><i class="fa-solid fa-xmark"></i></button>
    <input style="display: none;" type="file" onchange="previewFileimg(${indexImg})"
      id="img01-${indexImg}" class="inpu_Img txt_img_${indexImg}">
    <label for="img01-${indexImg}">
      <p class="label_img">File ảnh sản phầm </p>
      <img class="img01 preview_img-${indexImg}" src="${value}" alt=""
        height="100%" width="100%" alt="Image preview">
    </label>
  </div>
  `;
  document.querySelector(".contain_img").insertAdjacentHTML("beforeend", html);
}
// Toast

function formatNumber(event) {
  const input = event.target;
  const value = input.value.replace(/\D/g, ""); // Remove all non-numeric characters
  input.value = "";
  const formattedValue = Number(value).toLocaleString("en-US"); // Format the number with commas
  console.log(value);
  input.value = formattedValue;
}

$(document).ready(function () {
  //
  $(".btn_create_color").click(function () {
    var indexColor = document.querySelectorAll(
      ".container_color .input_from01"
    ).length;
    indexColor += 1;
    var html = `<div class="input_from01 input_color-${indexColor}">
                    <div class="form-group">
                      <label for="gi_${indexColor}">Loại Color </label>
                      <input type="text" class="form-control txt_product_price" value="" id="gi_${indexColor}"
                        aria-describedby="emailHelp" placeholder="Loại Color :">
                      <button class="btn_remove btn_style btn_re_color-${indexColor}">
                        <i class="fa-solid fa-xmark"></i>
                      </button>
                    </div>
                  </div>`;
    $(".container_color").append(html);
  });
  //
  $(".btn_create_type").click(function () {
    var indedxType = document.querySelectorAll(
      ".container_type .input_from01"
    ).length;
    indedxType += 1;
    var html = `<div class="row sm-gutter input_from01 input_type-${indedxType}">
    <div class="col l-6 ">
      <div class="form-group">
        <label for="ga_${indedxType}">Loại bộ nhớ </label>
        <input type="text" class="form-control txt_type_product" value="" id="ga_${indedxType}"
          aria-describedby="emailHelp" placeholder="Loại bộ nhớ :">
      </div>
    </div>
    <div class="col l-6">
      <div class="form-group">
        <label for="gia">Giá sản phầm</label>
        <input type="text" class="form-control txt_product_price"
          value="" id="gia" aria-describedby="emailHelp"
          oninput="formatNumber(event)" placeholder="Giá sản phầm :">
        <button class="btn_style btn_remove btn_re_type-${indedxType}"><i class="fa-solid fa-xmark"></i></button>
      </div>
    </div>
  </div>`;
    $(".container_type").append(html);
  });
  //
  $(".btn_create_img").click(function () {
    var indexImg = document.querySelectorAll(
      ".contain_img .container_img_remove"
    ).length;
    indexImg += 1;
    var html = `<div class="col l-6 container_img_remove input_img-${indexImg}">
    <button class="btn_style btn_remove btn_re_img-${indexImg}"><i class="fa-solid fa-xmark"></i></button>
    <input style="display: none;" type="file" onchange="previewFileimg(${indexImg})"
      id="img01-${indexImg}" class="inpu_Img txt_img_${indexImg}">
    <label for="img01-${indexImg}">
      <p class="label_img">File ảnh sản phầm </p>
      <img class="img01 preview_img-${indexImg}" src="" alt="Product Img"
        height="100%" width="100%" alt="Image preview">
    </label>
  </div>`;
    $(".contain_img").append(html);
  });
  //
  $(".container_color").on("click", ".btn_remove", function () {
    var indexToRemove = $(this)
      .attr("class")
      .match(/btn_re_color-(\d+)/)[1];
    $(`.input_color-${indexToRemove}`).remove();
  });
  //
  $(".container_type").on("click", ".btn_remove", function () {
    var indexToRemove = $(this)
      .attr("class")
      .match(/btn_re_type-(\d+)/)[1];
    $(`.input_type-${indexToRemove}`).remove();
  });
  $(".contain_img").on("click", ".btn_remove", function () {
    var indexToRemove = $(this)
      .attr("class")
      .match(/btn_re_img-(\d+)/)[1];
    $(`.input_img-${indexToRemove}`).remove();
  });
});
function previewFileimg(id) {
  var input = document.querySelector(".txt_img_" + id);
  var preview = document.querySelector(".preview_img-" + id);
  if (input.files && input.files[0]) {
    var reader = new FileReader();
    reader.onload = function (e) {
      preview.src = e.target.result;
    };
    reader.readAsDataURL(input.files[0]);
  }
}
getCoursesUser(randerCoursesUser);
function getCoursesUser(callback) {
  document.querySelector(".txt_product_name").focus();

  fetch("http://localhost:3000/dataUser")
    .then(function (response) {
      return response.json();
    })
    .then(callback);
}
function randerCoursesUser(courses) {
  // console.log(courses)
  courses.reverse();
  const html = courses.map((couse) => {
    return `
		<div class="col l-3">
          <div class="conitner_item_img">
            <img style="border-radius: 50%; padding: 20px;" width="400px" height=400px src="${
              couse.logo != "" ? couse.logo : "./img/user.png"
            }" alt="">
            <div class="container">
              <div style="border-bottom: 1px solid #c2c2c2;">
                <span style="color:rgb(255, 0, 0); font-weight: bold;">Họ Tên: </span><span>${
                  couse.name
                } </span>
              </div>
              <div  style="border-bottom: 1px solid #c2c2c2;">
                <span style="color:rgb(255, 0, 0); font-weight: bold;">Email: </span><span>${
                  couse.Email
                }</span>
              </div>
              <div style="border-bottom: 1px solid #c2c2c2;">
                <span style="color:rgb(255, 0, 0); font-weight: bold;">Số ĐT: </span><span>${
                  couse.numberPhone
                }</span>
              </div>
              <div  style="border-bottom: 1px solid #c2c2c2;">
                <span style="color:rgb(255, 0, 0); font-weight: bold;">Pass: </span><span>${
                  couse.password
                }</span>
              </div>
              <div>
                <span style="color:rgb(255, 0, 0); font-weight: bold;">Địa Chỉ: </span><span>${
                  couse.address
                }</span>
              </div>
            </div>
            <div class="container_btn">
              <button class="btn_all remove_user remove_user-${
                couse.id
              }" onclick="removeUser('${couse.id}')">Remove</button>
            </div>
          </div>
        </div>
			`;
  });
  document.querySelector(".container_user_item").innerHTML = html.join("");
}

function removeUser(id) {
  if (confirm("Bạn cần xóa dư liệu này không ?")) {
    var option = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    };
    fetch(`http://localhost:3000/dataUser/${id}`, option)
      .then(function (response) {
        return response.json();
      })
      .then(function () {});
  }
}
// Create admin
function handleCreateAdmin(data, callback) {
  var option = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  fetch("http://localhost:3000/admin", option)
    .then(function (response) {
      return response.json();
    })
    .then(callback);
}
handleCreateForm();
document.querySelector("#btn_save_admin").style.display = "none";
function handleCreateForm() {
  var btnCreate = document.querySelector("#btn_create_admin");
  btnCreate.onclick = function () {
    var admin = document.querySelector(".txt_user_admin");
    var pass = document.querySelector(".txt_pass_admin");
    var img = document.querySelector(".preview_img-1000");
    var formData = {
      img: img.src,
      user: admin.value,
      pass: pass.value,
    };
    handleCreateAdmin(formData, function () {
      pass.value = "";
      admin.value = "";
      admin.focus();
    });
  };
}

function getCoursesAdmin(callback) {
  fetch("http://localhost:3000/admin")
    .then(function (response) {
      return response.json();
    })
    .then(callback);
}
getCoursesAdmin((courses) => {
  const array = [
    ...new Set(
      courses.map((item) => {
        return item;
      })
    ),
  ];
  document.querySelector(".container_app").style.display = "none";
  document.querySelector("body").style.background =
    "linear-gradient(#141e30, #243b55)";
  if (sessionStorage.getItem("SaveAdmin") != null) {
    array.map((item) => {
      const { user, img } = item;
      if (sessionStorage.getItem("SaveAdmin") == user) {
        document.querySelector(".container_app").style.display = "";
        document.querySelector(".login-box").style.display = "none";
        document.querySelector("body").style.background = "#fff";
        document.querySelector(".logo img").src = img;
        document.querySelector(".logo span").textContent = user;
      }
    });
  }
  randerCoursesAdmin(array);
  document.querySelector(".btn_login_admin").onclick = function () {
    var err = 0;
    var arr = {};
    array.map((item) => {
      const { user, pass, img } = item;
      if (
        (user == document.querySelector(".user_admin").value) &
        (pass == document.querySelector(".pass_admin").value)
      ) {
        err += 1;
        arr = {
          user: user,
          img: img,
        };
      }
    });
    if (err != 0) {
      sessionStorage.setItem("SaveAdmin", arr.user);
      document.querySelector(".container_app").style.display = "";
      document.querySelector(".login-box").style.display = "none";
      document.querySelector("body").style.background = "#fff";
      document.querySelector(".logo img").src = arr.img;
      document.querySelector(".logo span").textContent = arr.user;
    } else {
      alert("inivalid Password or User");
    }
  };
});
function randerCoursesAdmin(courses) {
  // console.log(courses)
  courses.reverse();
  const html = courses.map((couse) => {
    return `
		<div class="col l-4">
            <div class="conitner_item_img">
              <img class="img-${couse.id}" style="border-radius: 50%; padding: 20px;" width="100%" src="${couse.img}" alt="">
              <div class="container_info">
                <div>
                  <span>User: </span><span class="user-${couse.id}">${couse.user}</span>
                </div>
                <div>
                  <span>Password: </span><span class="pass-${couse.id}">${couse.pass}</span>
                </div>
              </div>
              <div class="container_btn">
                <button onclick="removeAdmin(${couse.id})" class="btn_all remove_admin">Remove</button>
                <button onclick="handleEditCoursesAdmin(${couse.id})" handleEditCoursesAdmin(${couse.id})" class="btn_all edit_admin">Edit</button>
              </div>
            </div>
          </div>
			`;
  });
  document.querySelector(".container_admin_item").innerHTML = html.join("");
}
function handleEditAdmin(data, id, callback) {
  var option = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  fetch(`http://localhost:3000/admin/${id}`, option)
    .then(function (response) {
      return response.json();
    })
    .then(callback);
}
function handleEditCoursesAdmin(id) {
  var btnSave = document.querySelector("#btn_save_admin");
  btnSave.style.display = "block";
  var txtUser = document.querySelector(".txt_user_admin");
  var txtPass = document.querySelector(".txt_pass_admin");
  var txtImg = document.querySelector(".preview_img-1000");
  getCoursesAdmin((couse) => {
    couse.map((item) => {
      if (item.id == id) {
        txtImg.src = item.img;
        txtUser.value = item.user;
        txtPass.value = item.pass;
      }
    });
  });
  btnSave.onclick = function () {
    btnSave.style.display = "none";
    handleEditAdmin(
      { img: txtImg.src, user: txtUser.value, pass: txtPass.value },
      id
    );
  };
}
function removeAdmin(id) {
  if (confirm("Bạn cần xóa dư liệu này không ?")) {
    var option = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    };
    fetch(`http://localhost:3000/admin/${id}`, option)
      .then(function (response) {
        return response.json();
      })
      .then(function () {});
  }
}
// Oder

getCoursesOder(randerCoursesOder);

function getCoursesOder(callback) {
  document.querySelector(".txt_product_name").focus();
  fetch("http://localhost:3000/donHang")
    .then(function (response) {
      return response.json();
    })
    .then(callback);
}
function randerCoursesOder(courses) {
  // console.log(courses)
  courses.reverse();
  const html = courses.map((couse) => {
    // ouse.arrRevers.map(item=>)
    return `
		<div class="col l-3")>
          <div class="conitner_item_img">
            <img style="padding: 20px;" width="100%" src="${couse.arrRevers[0].img}" alt="">
            <div class="container">
              <span style="color:rgb(0, 42, 255); font-weight: bold;">Thông Tin Người Mua</span>
              <div style="border-bottom: 1px solid #c2c2c2;">
                <span style="color:rgb(255, 0, 0); font-weight: bold;">Họ Tên: </span><span>${couse.name}</span>
              </div>
              <div  style="border-bottom: 1px solid #c2c2c2;">
                <span style="color:rgb(255, 0, 0); font-weight: bold;">Email: </span><span>${couse.email}</span>
              </div>
			  <div style="border-bottom: 1px solid #c2c2c2;">
                <span style="color:rgb(255, 0, 0); font-weight: bold;">Số Điện Thoại: </span><span>${couse.phone}</span>
              </div>
              <div style="border-bottom: 1px solid #c2c2c2;">
                <span style="color:rgb(255, 0, 0); font-weight: bold;">Địa Chỉ: </span><span>${couse.address}</span>
              </div>
			  <div">
                <span style="color:rgb(255, 0, 0); font-weight: bold;">Thời gian đặt hàng: </span><span>${couse.arrRevers[0].time}</span>
              </div>
			  <div class="container_btn">
			  <a>
			  <button onclick="removeOder(${couse.id})" class="btn_all remove_user">Hủy Đơn</button>
			  </a>
			  <a href="./print.html">
			  <button onclick=" onclickSetId(${couse.id})" class="btn_all print_don">Xem Đơn</button>
			  </a>
		  	</div>
            </div>
			
          </div>

        </div>
		
			`;
  });
  document.querySelector(".container_oder_item").innerHTML = html.join("");
}
function removeOder(id) {
  if (confirm("Bạn cần xóa dư liệu này không ?")) {
    var option = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    };
    fetch(`http://localhost:3000/donHang/${id}`, option)
      .then(function (response) {
        return response.json();
      })
      .then(function () {});
  }
}
function onclickSetId(id) {
  localStorage.setItem("save", id);
}
//
CKEDITOR.replace("editor1");
