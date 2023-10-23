// import { courses } from './readingProduct';
// console.log(courses)



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

handleActive()
function handleActive() {
  // value for header navbar
  var unHoverQr = document.querySelector(".header__navbar-hover--qrcode");
  var unHoverLanguage = document.querySelector(".show__list-languages")
  var unHoverUser = document.querySelector(".show__user-list")
  //value for history input hide when scroll
  //var for input
  var unFocus = document.querySelector('.header__with-search--input-text');
  var checkedOn = document.querySelector(".show__form-input");
  var activeInputMobile = document.querySelector(".header__with-search--search-mobile");
  //var form scroll navbar and to top
  var lastScrollTop = 0;
  const toTop = document.querySelector(".to__top");
  const navbar = document.querySelector(".header");

  window.addEventListener("scroll", function () {
    var scrollTop = this.window.pageYOffset;

    if (scrollTop > lastScrollTop) {
      if (this.window.innerWidth <= 1023) {
        navbar.style.top = "-120px";
      } else {
        navbar.style.top = "-40px";
      }

      checkedOn.checked = false;
      unFocus.blur();
      activeInputMobile.classList.remove("expand");




      unHoverUser.classList.remove("expand")
      unHoverLanguage.classList.remove("expand")
    } else {

      navbar.style.top = "0";
      checkedOn.checked = false;
      unFocus.blur();
      activeInputMobile.classList.remove("expand");


      unHoverLanguage.classList.add("expand")
      unHoverUser.classList.add("expand")
    }
    //To Top
    if (scrollTop > 100) {
      toTop.classList.add("active");
    } else {
      toTop.classList.remove("active");
    }
    lastScrollTop = scrollTop;
  });
  //fuction input open and close
  function isChecked() {
    if (checkedOn.checked) {
      activeInputMobile.classList.add("expand");
    } else {
      activeInputMobile.classList.remove("expand");
    }
  }
  //heart active

  // var iconHeartActive = document.querySelector(".heaed_active");
  // var iconHeartNoActive = document.querySelector(".heaed_none_active");
  // iconHeartNoActive.addEventListener('click',()=>{
  //   // iconHeartActive.classList.add("hide_active");
  //   console.log(0)

  // }) 
  // iconHeartActive.onclick = () => {
  //   // iconHeartNoActive.classList.remove("hide_active");
  // };

}
// heart

// activeHeartLove.addEventListener("click",()=>{
//     activeHeartLove.style.display = "none";
//     activeHeart.style.display = "inline-block";
// })

//to top

const toTop = document.querySelector(".to__top");
window.addEventListener("scroll", () => {
  if (window.pageYOffset > 100) {
    toTop.classList.add("active");
  } else {
    toTop.classList.remove("active");
  }
});


// 
