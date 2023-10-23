// Call Api
function getCoursesApi(Api, callback) {
  fetch(Api)
    .then(function (response) {
      return response.json();
    })
    .then(callback);
}
//
function preImgUser() {
  var file = document.querySelector("#img_user").files[0];
  const reader = new FileReader();
  reader.addEventListener(
    "load",
    () => {
      // convert image file to base64 string
      document.querySelector(".info_container_img img").src = reader.result;
    },
    false
  );

  if (file) {
    reader.readAsDataURL(file);
    // console.log( reader.readAsDataURL(file))
  }
}

var fistName = document.querySelector("#txt_fist_name");
var phoneNumber = document.querySelector("#txt_number_phone");
var address = document.querySelector("#txt_address");
var email = document.querySelector("#txt_email");
var logo = document.querySelector(".image_show");

const value = localStorage.getItem("SaveLogin");
if (value !== null) {
  // The value was found in localStorage
  getCoursesApi("http://localhost:3000/dataUser", function (courses) {
    courses.map((item) => {
      if (item.id == localStorage.getItem("SaveLogin")) {
        logo.src = item.logo != "" ? item.logo : "./img/user.png";
        fistName.value = item.name;
        phoneNumber.value = item.numberPhone;
        address.value = item.address;
        email.value = item.Email;
      }
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

document.querySelector(".btn_save-info").addEventListener("click", () => {
  getCoursesApi("http://localhost:3000/dataUser", (courses) => {
    courses.map((item) => {
      if (localStorage.getItem("SaveLogin") == item.id) {
        const data = {
          name: fistName.value,
          numberPhone: phoneNumber.value,
          Email: email.value,
          address: address.value,
          password: item.password,
          rePassword: item.repassword,
          logo: logo.src,
          history: item.history,
          productLike: item.productLike,
          cart: item.cart,
          oder: item.oder,
        };
        handleEdit(
          "http://localhost:3000/dataUser",
          data,
          localStorage.getItem("SaveLogin")
        );
      }
    });
  });
});
// Edit Api
function handleEdit(Api, data, id, callback) {
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
