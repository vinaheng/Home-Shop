
document.querySelector('.header__with-search--find').onclick = () => {
    var count = 0
    if (localStorage.getItem('history') == null) {
        localStorage.setItem('history', '')
    }
    var courses = localStorage.getItem('history').split(',')
    courses.map(item => {
        if (item == document.querySelector('.header__with-search--input-text').value) {
            count += 1
        }
    })

    if (count == 0 & document.querySelector('.header__with-search--input-text').value != '') {
        courses.push(document.querySelector('.header__with-search--input-text').value)
        const filteredArray = courses.filter(item => item.trim() !== '');
        localStorage.setItem('history', filteredArray)
    }
    if (document.querySelector('.header__with-search--input-text').value != '') {
        document.querySelector('.product_find').classList.remove('hide')
        document.querySelector('.product_slider').classList.add('hide')
    }

}
const Api = "http://localhost:3000/history"
function getCoursesHistory(callback) {
    fetch(Api)
        .then(function (response) {
            return response.json();
        })
        .then(callback);
}
document.querySelector('.header__with-search--input-text').addEventListener('keyup', (e) => {
    const searchData = e.target.value.toLowerCase();
    const filteredData = localStorage.getItem('history').split(',').filter((item) => {
        return (
            item.toLowerCase().includes(searchData)
        )
    })
    displayItem(filteredData)
});

const displayItem = (items) => {
    items.reverse()
    document.querySelector('.history__input-list div').innerHTML = items.map((item) => {
        return (
            ` <li class="history__input-item"><span>${item}</span> </li>`
        )

    }).join('')
    document.querySelectorAll('.history__input-item').forEach(item => {
        item.addEventListener('mouseover', function () {
            const spanValue = item.querySelector('span').textContent;
            document.querySelector('.header__with-search--input-text').value = spanValue;
        });
    });
};
displayItem(localStorage.getItem('history').split(','));



// getCoursesHistory(data => {
//     const categories = [...new Set(data.map(item => {
//         if (localStorage.getItem('email') == item.email) {
//             return item
//         }
//     }))];
//     document.querySelector('.header__with-search--input-text').addEventListener('keyup', (e) => {
//         const searchData = e.target.value.toLowerCase();
//         const filteredData = categories.filter((item) => {
//             return (
//                 item.value.toLowerCase().includes(searchData)
//             )
//         })
//         displayItem(filteredData)
//         console.log(filteredData)
//     });

//     const displayItem = (items) => {
//         document.querySelector('.history__input-list div').innerHTML = items.map((item) => {
//             var { value, email } = item;
//             if (localStorage.getItem('email') == email) {
//                 return (
//                     ` <li class="history__input-item"><span>${value}</span> </li>`
//                 )
//             }

//         }).join('')
//         document.querySelectorAll('.history__input-item').forEach(item => {
//             item.addEventListener('mouseover', function () {
//                 const spanValue = item.querySelector('span').textContent;
//                 document.querySelector('.header__with-search--input-text').value = spanValue;
//             });
//         });
//     };
//     displayItem(categories);

// })


function handleCreateHistory(data, callback) {
    var option = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    };
    fetch('http://localhost:3000/history', option)
        .then(function (response) {
            return response.json();
        })
        .then(callback);
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


