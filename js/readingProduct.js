import { getCoursesApi } from "./api.js";
import { prev, next } from "./slider.js";
try {
  getCoursesApi("http://localhost:3000/dataProduct", (courses) => {
    const array = [
      ...new Set(
        courses.map((item) => {
          return item;
        })
      ),
    ];
    document.querySelector(".header__with-search--find").addEventListener("click", (e) => {
        const searchData = document
          .querySelector(".header__with-search--input-text")
          .value.toLowerCase();
        document.querySelector(".title_search").textContent =
          document.querySelector(".header__with-search--input-text").value;
        const filteredData = array.filter((item) => {
          return item.name.toLowerCase().includes(searchData);
        });
        if (filteredData.length != 0) {
          searchHtml(filteredData);
        } else {
          document
            .querySelector(".contaienr_empty_data")
            .classList.remove("hide");
        }
      });
    const searchHtml = (items) => {
      document.querySelector(".preview_item_search").innerHTML = items
        .map((item) => {
          var { id, name, img, priceView, discount } = item;
          return `<div id="${id}" class="preview_item item_phone col l-3-4 m-3 c-6 ${
            "item_Phone_" + id
          }">
                    <div class="body__product-home">
                        <a href="indexPreview.html"  class="body__product-home--item" onclick="setIndex(${id})" >
                            <div
                                class="body__product-home--img"
                                style="
                                    background-image: url('${img[0]}');
                                "
                            ></div>
                            <div class="body__product-home-heading">
                                <h3>
                                    ${name}
                                </h3>
                            </div>
                            <div class="body__product-home--price">
                                <span class="body__product-home--price-old">${parseInt(
                                  priceView[0]
                                ).toLocaleString("en-US")} đ</span>
                                
                            </div>
                            <div class="body__product-home--comment">
                                <span class="body__product-home--heart">
                                    <i class="bi bi-suit-heart-fill"></i>
                                    <i class="bi bi-suit-heart"></i>
                                </span>
                                <span class="body__product-home--price-new">${parseInt(
                                  ((100 - discount) / 100) * priceView[0]
                                ).toLocaleString("en-US")} đ</span>
                            </div>
                            <div class="body__product-home--sale">
                                <span>Đã bán 1.7k</span>
                                <span class="body__product-home--heart">
                                <span class="heaed_active hide_active"><i class="fa-solid fa-heart"></i></span>
                                <span class="heaed_none_active "><i class="fa-regular fa-heart"></i></span>
                                </span>
                            </div>
                        </a>
                        <!--  -->
                        <div class="body__product-home--love">
                            <span>Giảm giá ${discount}%</span>
                        </div>
                        <div class="body__product-home--star">
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                        </div>
                    </div>
                </div>`;
        })
        .join("");
    };
    randerCoursesPhone(array);
    randerCoursesLaptop(array);
    randerCoursesTablet(array);
  });
  function setIndex(id) {
    localStorage.setItem("Index", id);
  }
  function randerCoursesPhone(courses) {
    courses.reverse();
    const html = courses.map((course) => {
      //
      if (course.category == "Smart Phone") {
        return `
                <div id="${
                  course.id
                }" class="preview_item item_phone col l-3-4 m-3 c-6 ${
          "item_Phone_" + course.id
        }">
                <div class="body__product-home">
                    <a href="indexPreview.html"  class="body__product-home--item" onclick="setIndex(${
                      course.id
                    })" >
                        <div
                            class="body__product-home--img"
                            style="
                                background-image: url('${course.img[0]}');
                            "
                        ></div>
                        <div class="body__product-home-heading">
                            <h3>
                                ${course.name}
                            </h3>
                        </div>
                        <div class="body__product-home--price">
                            <span class="body__product-home--price-old">${parseInt(
                              course.priceView[0]
                            ).toLocaleString("en-US")} đ</span>
                            
                        </div>
                        <div class="body__product-home--comment">
                            <span class="body__product-home--heart">
                            </span>
                            <span class="body__product-home--price-new">${parseInt(
                              ((100 - course.discount) / 100) *
                                course.priceView[0]
                            ).toLocaleString("en-US")} đ</span>
                        </div>
                        
                    </a>
                    <div class="body__product-home--sale">
                            <span>Đã bán 1.7k</span>
                            <span class="body__product-home--heart">
                            <span class="heaed_active-active hide_active"><i class="fa-solid fa-heart"></i></span>
                            <span class="heaed_none_active"><i class="fa-regular fa-heart"></i></span>
                            </span>
                        </div>
                    <!--  -->
                    <div class="body__product-home--love">
                        <span>Giảm giá ${course.discount}%</span>
                    </div>
                    <div class="body__product-home--star">
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-regular fa-star"></i>
                    </div>
                </div>
            </div>
            `;
      }
    });
    document.querySelector(".container_pd_phone").innerHTML = html.join("");

    let sliderPhone = document.querySelector(".container_pd_phone");
    let scrollPhone = document.querySelector(".container_item_phone");
    let itemsPhone = document.querySelectorAll(
      ".container_pd_phone .item_phone"
    );
    let nextPhone = document.querySelector(".btn_next_phone");
    let prevPhone = document.querySelector(".btn_prev_phone");
    if (window.innerWidth <= 739) {
      var lengthItemsPhone = itemsPhone.length - 2;
    } else {
      var lengthItemsPhone = itemsPhone.length - 4;
    }
    prevPhone.style.display = "none";
    let activePhone = 0;
    var countClickPhone = 0;
    let startXPhone = 0;
    let pressedPhone = false;
    let autoClickPhone = setInterval(() => {
      activePhone = next(
        lengthItemsPhone,
        prevPhone,
        nextPhone,
        activePhone,
        sliderPhone,
        itemsPhone,
        countClickPhone
      );
    }, 3000);

    nextPhone.addEventListener("click", function () {
      clearInterval(autoClickPhone);
      countClickPhone = 1;
      pressedPhone = false;
      console.log(lengthItemsPhone);
      activePhone = next(
        lengthItemsPhone,
        prevPhone,
        nextPhone,
        activePhone,
        sliderPhone,
        itemsPhone,
        countClickPhone
      );
    });

    prevPhone.addEventListener("click", () => {
      clearInterval(autoClickPhone);
      countClickPhone = 1;
      pressedPhone = false;
      activePhone = prev(
        lengthItemsPhone,
        prevPhone,
        nextPhone,
        activePhone,
        sliderPhone,
        itemsPhone,
        countClickPhone
      );
    });
    scrollPhone.addEventListener("mousedown", function (e) {
      pressedPhone = true;
      startXPhone = e.clientX;
    });

    scrollPhone.addEventListener("mousemove", function (e) {
      try {
        if (pressedPhone) {
          pressedPhone = false;
          // console.log(lengthItems)
          countClickPhone = 1;
          clearInterval(autoClickPhone);
          if (startXPhone - e.clientX > 0) {
            activePhone = next(
              lengthItemsPhone,
              prevPhone,
              nextPhone,
              activePhone,
              sliderPhone,
              itemsPhone,
              countClickPhone
            );
          } else {
            activePhone = prev(
              lengthItemsPhone,
              prevPhone,
              nextPhone,
              activePhone,
              sliderPhone,
              itemsPhone,
              countClickPhone
            );
          }
        }
      } catch {}
    });
  }
  // Laptop
  function randerCoursesLaptop(courses) {
    // courses.reverse()
    courses.reverse();
    const html = courses.map((course, index) => {
      if (course.category == "Laptop") {
        return `
            <div class="item_laptop col l-3-4 m-3 c-6 ">
                <div class="body__product-home">
                    <a href="indexPreview.html" class="body__product-home--item" onclick="setIndex(${
                      course.id
                    })">
                        <div
                            class="body__product-home--img"
                            style="
                                background-image: url('${course.img[0]}');
                            "
                        ></div>
                        <div class="body__product-home-heading">
                            <h3>
                                ${course.name}
                            </h3>
                        </div>
                        <div class="body__product-home--price">
                        <span class="body__product-home--price-old">${parseInt(
                          course.priceView[0]
                        ).toLocaleString("en-US")} đ</span>
                        </div>
                        <div class="body__product-home--comment">
                            <div></div>
                            <span class="body__product-home--price-new">${parseInt(
                              ((100 - course.discount) / 100) *
                                course.priceView[0]
                            ).toLocaleString("en-US")} đ</span>
                           
                        </div>
                        
                    </a>
                    <div class="body__product-home--sale">
                            <span>Đã bán 1.7k</span>
                            <span class="body__product-home--heart">
                            <span class="heaed_active-${
                              course.id
                            } hide_active"><i class="fa-solid fa-heart"></i></span>
                            <span onclick="activeHeart(${
                              course.id
                            })" class="heaed_none_active-${
          course.id
        } "><i class="fa-regular fa-heart"></i></span>
                            </span>
                        </div>
                    <!--  -->
                    <div class="body__product-home--love">
                        <span>Giảm giá ${course.discount}%</span>
                    </div>
                    <div class="body__product-home--star">
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-regular fa-star"></i>
                    </div>
                </div>
            </div>
            `;
      }
    });

    document.querySelector(".container_pd_laptop").innerHTML = html.join("");
    let sliderLaptop = document.querySelector(".container_pd_laptop");
    let scrollLaptop = document.querySelector(".container_item_laptop");
    let itemsLaptop = document.querySelectorAll(
      ".container_pd_laptop .item_laptop"
    );
    let nextLaptop = document.querySelector(".btn_next_laptop");
    let prevLaptop = document.querySelector(".btn_prev_laptop");
    if (window.innerWidth <= 739) {
      var lengthItemsLaptop = itemsLaptop.length - 2;
    } else {
      var lengthItemsLaptop = itemsLaptop.length - 4;
    }
    prevLaptop.style.display = "none";

    let activeLaptop = 0;
    var countClickLaptop = 0;
    let startXLaptop = 0;
    let pressedLaptop = false;
    let autoClickLaptop = setInterval(() => {
      activeLaptop = next(
        lengthItemsLaptop,
        prevLaptop,
        nextLaptop,
        activeLaptop,
        sliderLaptop,
        itemsLaptop,
        countClickLaptop
      );
    }, 3000);
    nextLaptop.addEventListener("click", function () {
      clearInterval(autoClickLaptop);
      countClickLaptop = 1;
      pressedLaptop = false;
      activeLaptop = next(
        lengthItemsLaptop,
        prevLaptop,
        nextLaptop,
        activeLaptop,
        sliderLaptop,
        itemsLaptop,
        countClickLaptop
      );
    });

    prevLaptop.addEventListener("click", () => {
      clearInterval(autoClickLaptop);
      countClickLaptop = 1;
      pressedLaptop = false;
      activeLaptop = prev(
        lengthItemsLaptop,
        prevLaptop,
        nextLaptop,
        activeLaptop,
        sliderLaptop,
        itemsLaptop,
        countClickLaptop
      );
    });
    scrollLaptop.addEventListener("mousedown", function (e) {
      pressedLaptop = true;
      startXLaptop = e.clientX;
    });

    scrollLaptop.addEventListener("mousemove", function (e) {
      try {
        if (pressedLaptop) {
          pressedLaptop = false;
          // console.log(lengthItems)
          countClickLaptop = 1;
          clearInterval(autoClickLaptop);

          if (startXLaptop - e.clientX > 0) {
            activeLaptop = next(
              lengthItemsLaptop,
              prevLaptop,
              nextLaptop,
              activeLaptop,
              sliderLaptop,
              itemsLaptop,
              countClickLaptop
            );
          } else {
            activeLaptop = prev(
              lengthItemsLaptop,
              prevLaptop,
              nextLaptop,
              activeLaptop,
              sliderLaptop,
              itemsLaptop,
              countClickLaptop
            );
          }
        }
      } catch {}
    });
  }
  // Laptop
  function randerCoursesTablet(courses) {
    // courses.reverse()
    courses.reverse();
    const html = courses.map((course, index) => {
      if (course.category == "Tablet") {
        return `
            <div class="item_tablet col l-3-4 m-3 c-6 ">
                <div class="body__product-home">
                    <a href="indexPreview.html" class="body__product-home--item" onclick="setIndex(${
                      course.id
                    })">
                        <div
                            class="body__product-home--img"
                            style="
                                background-image: url('${course.img[0]}');
                            "
                        ></div>
                        <div class="body__product-home-heading">
                            <h3>
                                ${course.name}
                            </h3>
                        </div>
                        <div class="body__product-home--price">
                        <span class="body__product-home--price-old">${parseInt(
                          course.priceView[0]
                        ).toLocaleString("en-US")} đ</span>
                        </div>
                        <div class="body__product-home--comment">
                            <span class="body__product-home--heart">
                                <i class="bi bi-suit-heart-fill"></i>
                                <i class="bi bi-suit-heart"></i>
                            </span>
                            <span class="body__product-home--price-new">${parseInt(
                              ((100 - course.discount) / 100) *
                                course.priceView[0]
                            ).toLocaleString("en-US")} đ</span>
                           
                        </div>
                        
                    </a>
                    <div class="body__product-home--sale">
                            <span>Đã bán 1.7k</span>
                            <span class="body__product-home--heart">
                            <span class="heaed_active hide_active"><i class="fa-solid fa-heart"></i></span>
                            <span class="heaed_none_active "><i class="fa-regular fa-heart"></i></span>
                            </span>
                        </div>
                    <!--  -->
                    <div class="body__product-home--love">
                        <span>Giảm giá ${course.discount}%</span>
                    </div>
                    <div class="body__product-home--star">
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-regular fa-star"></i>
                    </div>
                </div>
            </div>
            `;
      }
    });

    document.querySelector(".container_pd_tablet").innerHTML = html.join("");
    let sliderTablet = document.querySelector(".container_pd_tablet");
    let scrollTablet = document.querySelector(".container_item_tablet");
    let itemsTablet = document.querySelectorAll(
      ".container_pd_tablet .item_tablet"
    );
    let nextTablet = document.querySelector(".btn_next_tablet");
    let prevTablet = document.querySelector(".btn_prev_tablet");
    if (window.innerWidth <= 739) {
      var lengthItemsTablet = itemsTablet.length - 2;
    } else {
      var lengthItemsTablet = itemsTablet.length - 4;
    }
    prevTablet.style.display = "none";

    let activeTablet = 0;
    var countClickTablet = 0;
    let startXTablet = 0;
    let pressedTablet = false;
    let autoClickTablet = setInterval(() => {
      activeTablet = next(
        lengthItemsTablet,
        prevTablet,
        nextTablet,
        activeTablet,
        sliderTablet,
        itemsTablet,
        countClickTablet
      );
    }, 3000);

    nextTablet.addEventListener("click", function () {
      clearInterval(autoClickTablet);
      countClickTablet = 1;
      pressedTablet = false;
      activeTablet = next(
        lengthItemsTablet,
        prevTablet,
        nextTablet,
        activeTablet,
        sliderTablet,
        itemsTablet,
        countClickTablet
      );
    });

    prevTablet.addEventListener("click", () => {
      clearInterval(autoClickTablet);
      countClickTablet = 1;
      pressedTablet = false;
      activeTablet = prev(
        lengthItemsTablet,
        prevTablet,
        nextTablet,
        activeTablet,
        sliderTablet,
        itemsTablet,
        countClickTablet
      );
    });
    scrollTablet.addEventListener("mousedown", function (e) {
      pressedTablet = true;
      startXTablet = e.clientX;
    });

    scrollTablet.addEventListener("mousemove", function (e) {
      try {
        if (pressedTablet) {
          pressedTablet = false;
          // console.log(lengthItems)
          countClickTablet = 1;
          clearInterval(autoClickTablet);

          if (startXTablet - e.clientX > 0) {
            activeTablet = next(
              lengthItemsTablet,
              prevTablet,
              nextTablet,
              activeTablet,
              sliderTablet,
              itemsTablet,
              countClickTablet
            );
          } else {
            activeTablet = prev(
              lengthItemsTablet,
              prevTablet,
              nextTablet,
              activeTablet,
              sliderTablet,
              itemsTablet,
              countClickTablet
            );
          }
        }
      } catch {}
    });
  }
} catch {}

// Preview Product
