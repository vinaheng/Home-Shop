try {
    // Function Slider ads
    let sliderAds = document.querySelector('.ads_left');
    let itemsAds = document.querySelectorAll('.container_ads_left .ads_left img');
    let nextAds = document.querySelector('.ads_btn_next');
    let prevAds = document.querySelector('.ads_btn_prev');
    let hoverslider = document.querySelector('.container_ads_left')
    prevAds.style.display = 'none'
    let lengthItemsAds = itemsAds.length - 1;
    let activeAds = 0;
    var countClickAds = 0
    let startX = 0;
    let pressed = false;
    let autoClickAds = setInterval(() => {
        activeAds = next(lengthItemsAds, prevAds, nextAds, activeAds, sliderAds, itemsAds);
    }, 3000);

    nextAds.addEventListener('click', function () {
        clearInterval(autoClickAds);
        countClickAds = 1;
        pressed = false
        activeAds = next(lengthItemsAds, prevAds, nextAds, activeAds, sliderAds, itemsAds, countClickAds);
    });

    prevAds.addEventListener('click', () => {
        clearInterval(autoClickAds);
        countClickAds = 1;
        pressed = false
        activeAds = prev(lengthItemsAds, prevAds, nextAds, activeAds, sliderAds, itemsAds, countClickAds);
    });
    hoverslider.addEventListener('mousedown', function (e) {
        pressed = true;
        startX = e.clientX;
    });

    hoverslider.addEventListener('mousemove', function (e) {

        try {
            if (pressed) {
                // console.log(lengthItems)
                countClickAds = 1;
                clearInterval(autoClickAds);
                if (activeAds != 0) {
                    prevAds.style.left = -25 + 'px';
                }
                if ((startX - e.clientX) > 0) {
                    activeAds = next(lengthItemsAds, prevAds, nextAds, activeAds, sliderAds, itemsAds, countClickAds);
                } else {
                    activeAds = prev(lengthItemsAds, prevAds, nextAds, activeAds, sliderAds, itemsAds, countClickAds);
                }
            }
            pressed = false;
        } catch { }
    });












    //   this.style.left = startX - e.clientX

    // console.log(e.clientX)

    // Funtion hover is show Button Prev and Next

    hoverslider.addEventListener("mouseover", () => {
        prevAds.style.left = -25 + 'px';
        nextAds.style.right = -25 + 'px';
    })

    hoverslider.addEventListener("mouseout", () => {
        prevAds.style.left = -50 + 'px';
        nextAds.style.right = -50 + 'px';
    })


} catch { }
export function next(lengthAds, prev1, next1, active, slider, items, countClick) {
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

export function prev(lengthAds, prev1, next1, active, slider, items, countClick) {

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

export default { next, prev }