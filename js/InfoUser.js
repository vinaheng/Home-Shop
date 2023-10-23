// show input error message

const Api = "http://localhost:3000/dataUser";
function getCourses(callback) {
  fetch(Api)
    .then(function (response) {
      return response.json();
    })
    .then(callback);
}

const value = localStorage.getItem("SaveLogin");
if (value !== null) {
  // The value was found in localStorage
  getCourses(function (courses) {
    courses.map((item) => {
      if (value == item.id) {
        document.querySelector(".hover_show_form_login").classList.add("hide");
        localStorage.setItem("name", `${item.name}`);
        localStorage.setItem("email", item.Email);
        localStorage.setItem("address", item.address);
        localStorage.setItem("phone", item.numberPhone);
        const html = `
					<span class="header__navbar-bar--txt">
						<img class="header__navbar-bar--item-img--user" src="${
              item.logo != "" ? item.logo : "./img/user.png"
            }" alt="">
						<a href="#" class="header__navbar-bar--link header__navbar-bar--link-user">${
              item.name
            }</a>
					</span>
					<ul class="header__navbar-bar--list-user1">
                            <li class="header__navbar-bar--item-user">
                                <a href="IndexInfoUser.html">Tải khoản của tôi</a>
                            </li>
                            <li  class="header__navbar-bar--item-user">
                                <a href="indexDonHang.html">Đơn mua</a>
                            </li>
				
                            <li class="header__navbar-bar--item-user btn_logout" class="btn_logout">
                                <a  href="">Đăng xuất</a>
                            </li>
           	             </ul>`;
        document.querySelector(".show__user-list").innerHTML = html;

        document.querySelector(".show__user-list").classList.remove("hide");
        document.querySelector(".btn_logout").addEventListener("click", () => {
          if (confirm("Bạn động ý đăng xuất không ?")) {
            localStorage.removeItem("SaveLogin");
            document
              .querySelector(".hover_show_form_register")
              .classList.remove("hide");
            document
              .querySelector(".hover_show_form_login")
              .classList.remove("hide");
            document.querySelector(".show__user-list").classList.add("hide");
          }
        });

        document.querySelector(".hover_show_form_login").classList.add("hide");
        document.querySelector(".show__user-list").classList.remove("hide");
      }
    });
  });
}
// console.log(it)
