$(document).ready(function () {
    $("#show_login").click(function () {
        $('.container_frame').css('opacity', '100%');
        $('.container_frame').css('display', 'flex');
    });
    $(".close").click(function () {

        $('.container_frame').css('opacity', '0%');
        $('.container_frame').css('display', 'none');
    });
});
// function setIndex(id) {
//     localStorage.setItem("Index", id)
// }
const ApiCart = "http://localhost:3000/Cart"
  function getCoursesCart(callback) {
    fetch(ApiCart)
      .then(function (response) {
        return response.json();
      })
      .then(callback);
  }
  reload()
  function reload() {

    console.log('loader')
    getCoursesCart((courses) => {
      var htmlCart1 = courses.map(item => {
        if (localStorage.getItem('SaveLogin') == item.idCart) {
          return `
                        <li class="header__search-oder--item">
                            <div class="header__search-oder--img">
                                <img src="${item.img}" alt="">
                            </div>
                            <div class="header__search-oder--heading">
                                <div class="header__search-oder--title">
                                    <div class="header__search-oder--title-heading">
                                        <span class="heading">${item.name}</span>
                                    </div>
                                    <div class="price_product_item">
                                        <h2>${item.price} đ</h2>
                                    </div>
                                </div>

                            </div>
                        </li>`
        }
      })
      document.querySelector('.header__search-oder--container').innerHTML = htmlCart1.join('')
      var countItemCart = document.querySelector('.number_item span')
      var itemCountCart = document.querySelectorAll('.header__search-oder--container .header__search-oder--item')
      countItemCart.textContent = itemCountCart.length
      if (itemCountCart.length == 0) {
        countItemCart.style.display = 'none'
      }
    })

  }

const Api = "http://localhost:3000/dataProduct"
function getCourses(callback) {
    fetch(Api)
        .then(function (response) {
            return response.json();
        })
        .then(callback);
}
readingData(localStorage.getItem("Index"))

function handleCreateCart(data) {
    var option = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    };
    fetch('http://localhost:3000/Cart', option)
        .then(function (response) {
            return response.json();
        })

}

function addToCart(id) {
    if (localStorage.getItem('SaveLogin') != null) {
        var ArrColor = [], ArrType = [], Arrprice = [], priceResult = {}
        document.querySelectorAll('.product_type .price span').forEach(item => {
            Arrprice.push(item.textContent)
        })
        document.querySelectorAll('.product_color .storet span').forEach(item => {
            ArrColor.push(item.textContent)
        })
        document.querySelectorAll('.product_type .type span').forEach(item => {
            ArrType.push(item.textContent)
        })
        for (var i = 0; i < ArrType.length; i++) {
            priceResult[ArrType[i]] = Arrprice[i];
        }
        
        const data = {
            idCart: localStorage.getItem("SaveLogin"),
            name: document.querySelector('.container_title_nav_pro span').textContent,
            price: document.querySelector(".contaienr_price_tiem .price span").textContent,
            descount: document.querySelector(".contaienr_descount_item span").textContent,
            color:document.querySelectorAll('.container_type_product #tt-0').length>=1 ? document.querySelector('.active_type_pro .storet span').textContent:"Khong Co mau",
            type: document.querySelector('.active_type_pro .type span').textContent,
            ArrType: ArrType,
            ArrColor: ArrColor,
            ArrPrice: priceResult,
            img: document.querySelector('.container_img_nav_pro img').src,

        }
        handleCreateCart(data)
        document.querySelector('.link_preview').href = 'indexCart.html'
    } else {
        $(document).ready(function () {
            $('.container_frame').css('opacity', '100%');
            $('.container_frame').css('display', 'flex');
        });

    }
}

function readingData(id) {
    getCourses((courses) => {
        const typeHtml = courses.map((course) => {
            if (id == course.id) {
                document.querySelector('.paragra_about_phone').innerHTML = course.desc;
                document.querySelector(".container_title_nav_pro .title").textContent = course.name
                document.querySelector('.contaienr_descount_item span').textContent = `Giảm giá ${course.discount} %`
                // document.querySelector('.paragra_about_phone p').textContent = course.desc
                const htmlType = course.type.map((type, index) => {

                    return `
                        <div class="col l-4">
                        <input radio_checked-type-${index} onclick="onchengItemActive(${index})" id="ht-${index}" name="id1"
                            type="radio" class="rad_">
                        <label for="ht-${index}" class="type_product type_product-${index} product_type">
                            <i class="icon_active fas fa-check"></i>
                            <div class="type">
                                <span>${type}</span>
                            </div>
                            <div class="price">
                                <span>${parseInt(course.price[type]).toLocaleString('en-US')} đ</span>
                            </div>
                        </label>
                    </div>
                        `;
                });
                return htmlType.join('');
                
            }
        });
        document.querySelector(".items_type").innerHTML = typeHtml.join('');
        
        // indexCart.html
        const htmlBtn = `
            <div class="col l-10 m-12" onclick="addToCart(${id})">
            <a class="link_preview" href="#">
                <div  class="btn__mua">
                    <div>Mua Ngay</div>
                    <span>(Giao nhanh từ 2 giờ hoặc nhận tại cửa hàng)</span>
                </div>
            </a>
            </div>
            <div class="col l-2 m-12">
                <button class="btn_add_cart" onclick="addToCart(${id})"><i class="fa-solid fa-cart-plus"></i></button>
            </div>`
        document.querySelector(".container_btn_product").innerHTML = htmlBtn
        const HtmlColor = courses.map((course) => {
            if (id == course.id) {
                const typColor = course.color.map((color, index) => {
                    return `
                        <div class="col l-4">
                        <input class="radio_checked_olor-${index}" onclick="onchengItemActive1(${index})" id="tt-${index}"
                            name="id2" type="radio" class="rad_">
                        <label for="tt-${index}" class="type_product color_product-${index} product_color">
                        <i class="icon_active fas fa-check"></i>
                            <div class="storet">
                                <span>${color}</span>
                            </div>
                        </label>
                    </div>
                        `;
                });
                return typColor.join('');
            }
        });
        document.querySelector(".container_color_product").innerHTML = HtmlColor.join('');
        document.querySelector('.container_type_product #ht-0').checked = true
        var cont = document.querySelectorAll('.container_type_product #tt-0').length
        if(cont>=1){
            document.querySelector('.container_type_product #tt-0').checked = true
            document.querySelector(`.color_product-${0}`).classList.add('active_type_pro')
        }
        document.querySelector(`.type_product-${0}`).classList.add('active_type_pro')
        var price = document.querySelector(`.active_type_pro .price span`).textContent
        var descount = document.querySelector('.contaienr_descount_item span').textContent
        const regex = /\d+/;
        const match = descount.match(regex);
        document.querySelector('.contaienr_price_tiem .price span').textContent = `${parseInt(((100 - parseInt(match[0])) / 100) * (parseInt(price.replace(/,/g, ''), 10))).toLocaleString("en-US")} đ`
        document.querySelector('.contaienr_price_tiem .price-descount span').textContent = price
        const htmlImg = courses.map((course) => {
            if (id == course.id) {
                const imagesHTML = course.img.map((imgUrl) => {
                    return `<div class="col l-12 item" style="padding: 0;">
                            <div class="container_img_nav_pro">
                                <img src="${imgUrl}" alt="">
                            </div>
                        </div>
                        `;
                });
                return imagesHTML.join('');
            }
        });
        document.querySelector(".scoll_item").innerHTML = htmlImg.join('');
        let sliderProduct = document.querySelector('.scoll_item');
        let scrollProduct = document.querySelector('.bar_scoll')
        let itemsProduct = document.querySelectorAll('.scoll_item .item');
        let nextProduct = document.querySelector('.btn_pro_next');
        let prevProduct = document.querySelector('.btn_pro_prev');
        var lengthItemsProduct = itemsProduct.length - 1;
        prevProduct.style.display = "none";
        let activeProduct = 0;
        var countClickProduct = 0
        let startXProduct = 0;
        let pressedProduct = false;
        let autoClickProduct = setInterval(() => {
            activeProduct = next(lengthItemsProduct, prevProduct, nextProduct, activeProduct, sliderProduct, itemsProduct, countClickProduct);
        }, 3000);

        nextProduct.addEventListener('click', function () {
            clearInterval(autoClickProduct);
            countClickProduct = 1;
            pressedProduct = false
            console.log(lengthItemsProduct)
            activeProduct = next(lengthItemsProduct, prevProduct, nextProduct, activeProduct, sliderProduct, itemsProduct, countClickProduct);
        });

        prevProduct.addEventListener('click', () => {
            clearInterval(autoClickProduct);
            countClickProduct = 1;
            pressedProduct = false
            activeProduct = prev(lengthItemsProduct, prevProduct, nextProduct, activeProduct, sliderProduct, itemsProduct, countClickProduct);
        });
        scrollProduct.addEventListener('mousedown', function (e) {
            pressedProduct = true;
            startXProduct = e.clientX;
        });

        scrollProduct.addEventListener('mousemove', function (e) {

            try {
                if (pressedProduct) {
                    pressedProduct = false;
                    // console.log(lengthItems)
                    countClickProduct = 1;
                    clearInterval(autoClickProduct);
                    if ((startXProduct - e.clientX) > 0) {
                        activeProduct = next(lengthItemsProduct, prevProduct, nextProduct, activeProduct, sliderProduct, itemsProduct, countClickProduct);
                    } else {
                        activeProduct = prev(lengthItemsProduct, prevProduct, nextProduct, activeProduct, sliderProduct, itemsProduct, countClickProduct);
                    }
                }

            } catch { }
        });
    })
}
function onchengItemActive(id) {
    document.querySelectorAll('.container_type_product .product_type').forEach(item => {
        item.classList.remove('active_type_pro')
        document.querySelector(`.type_product-${id}`).classList.add('active_type_pro')
        var price = document.querySelector(`.active_type_pro .price span`).textContent
        var descount = document.querySelector('.contaienr_descount_item span').textContent
        const regex = /\d+/;
        const match = descount.match(regex);
        document.querySelector('.contaienr_price_tiem .price span').textContent = `${parseInt(((100 - parseInt(match[0])) / 100) * (parseInt(price.replace(/,/g, ''), 10))).toLocaleString("en-US")} đ`
        document.querySelector('.contaienr_price_tiem .price-descount span').textContent = price
    });
}
function onchengItemActive1(id) {
    document.querySelectorAll('.container_color_product .product_color').forEach(item => {
        item.classList.remove('active_type_pro')
        document.querySelector(`.color_product-${id}`).classList.add('active_type_pro')
    });
}
function next(lengthAds, prev1, next1, active, slider, items, countClick) {
    if (countClick >= 1) {
        active = active + 1 < lengthAds ? active + 1 : lengthAds
    } else {
        active = active + 1 <= lengthAds ? active + 1 : 0;
    }
    if (active == lengthAds) {
        next1.style.display = "none";
    } else {
        next1.style.display = 'flex'
    }
    if (active == 0) {
        prev1.style.display = "none";
    } else {
        prev1.style.display = 'flex'
    }
    slider.style.left = -(items[active].offsetLeft) + 'px';
    return active;
}

function prev(lengthAds, prev1, next1, active, slider, items, countClick) {

    if (countClick >= 1) {
        active = active - 1;
    } else {
        active = active - 1 >= 0 ? active - 1 : lengthAds;
    }
    if (active == 0) {
        prev1.style.display = "none";
    } else {
        next1.style.display = 'flex'
    }
    if (active <= lengthAds) {
        next1.style.display = "flex";
    } else {
        prev1.style.display = 'none'
    }
    slider.style.left = -(items[active].offsetLeft) + 'px';
    return active;
}
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
