const Api = "http://localhost:3000/donHang"
function getCourses(callback) {
    fetch(Api)
        .then(function (response) {
            return response.json();
        })
        .then(callback);
}
function getCoursesUser(callback) {
    fetch('http://localhost:3000/dataUser')
        .then(function (response) {
            return response.json();
        })
        .then(callback);
}
const value = localStorage.getItem('SaveLogin');
if (value !== null) {
    // The value was found in localStorage
    getCoursesUser(function (courses) {
        courses.map(item => {
            if (value == item.id) {
                const html = `
					<span class="header__navbar-bar--txt">
						<img class="header__navbar-bar--item-img--user" src="${item.logo != '' ? item.logo : './img/user.png'}" alt="">
						<a href="#" class="header__navbar-bar--link header__navbar-bar--link-user">${item.name}</a>
					</span>
					`
                document.querySelector(".show__user-list").innerHTML = html;

                document.querySelector('.show__user-list').classList.remove('hide')


            }
        })
    })
}
getCourses(couses => {
    const html = couses.map(item => {
        var arr = item.arrRevers[0]
        if (localStorage.getItem("SaveLogin") == item.idUser){
            return `
        <a href="indexUnitPrice.html" class="container_cart_bar" onclick="onclickSetId(${item.id})">
        <div class="cart_bar_left">
            <img src="${arr.img}" alt="">
        </div>
        <div class="cart_bar_right">
            <div class="item_bar_pd name">
                <h4>${arr.name}</h4>
            </div>
            <div class="item_bar_pd">
                <h4>${arr.qual}</h4>
            </div>

            <div class="item_bar_p">
                <h4>${arr.price}</h4>
            </div>
            <div class="item_bar_p ">
                <h4>${arr.time}</h4>
            </div>
        </div>
    </a>
        `
        }
    })
    document.querySelector('.container-item_sell .item').innerHTML = html.join('')
})
function onclickSetId(id) {
    localStorage.setItem('save', id)
}