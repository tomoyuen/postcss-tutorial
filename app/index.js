require('normalize-css');
require('./index.css');

window.onload = function () {
	var hiddenTitle = '记得回来点单哦';

	var categoryItems = document.querySelectorAll('.category li'),
		subcategoryBlock = document.querySelector('.sub-category'),
		subcategoryItems = document.querySelectorAll('.sub-category li'),
		sidebarBtns = document.querySelectorAll('.sidebar-tabs a.sidebar-btn'),
		shops = document.querySelectorAll('.main-content .shop-item'),
		cartBtn = document.querySelector('.sidebar .sidebar-cartbtn'),
		sidebar = document.querySelector('.sidebar'),
		detailPop = document.querySelector('.main-content .detailpop'),
		backtopBtn = document.querySelector('.sidebar .sidebar-btn-backtop'),
		carouselHeight = document.querySelector('.carousel-wrapper').offsetHeight,
		carouselInner = document.querySelector('.carousel-wrapper .carousel-inner'),
		carouselItems = document.querySelectorAll('.carousel-inner .carousel-item'),
		carouselPagers = document.querySelectorAll('.carousel-pager .pager-number'),
		stickyEle = document.querySelector('.extra-filter'),
		stickyVal = document.querySelector('.extra-filter').offsetTop,
		timer1,
		timer2,
		index = 0;

	var clearActive,
		loopEvent,
		categoryActive,
		toggleSidebar,
		closeSidebar,
		showDetail,
		showTooltip,
		showBacktop;

	// 清除兄弟节点的active类名
	clearActive = function (items) {
		for (let i = 0; i <= items.length - 1; i++) {
			items[i].classList.remove('active');
		}
	}

	// 循环绑定事件
	loopEvent = function (items, event, func, useCapture=false) {
		for (let i = 0; i <= items.length - 1; i++) {
			items[i].addEventListener(event, func, useCapture);
		}
	}
	categoryActive = function () {
		clearActive(categoryItems);
		this.classList.add('active');
		if (this.classList.contains('no-sub')) {
			subcategoryBlock.style.display = 'none';
		} else {
			subcategoryBlock.style.display = 'block';
		}
	}

	// * 使用了实验性质的animate()方法，目前只有新版chrome支持
	toggleSidebar = function () {
		if (this.classList.contains('active')) {
			closeSidebar();
		} else {
			this.classList.add('active');
			sidebar.animate([
				{ transform: 'translateX(295px)' },
				{ transform: 'translateX(0)' }
			],{
				duration: 300,
				fill: 'forwards',
				timing: 'ease-in'
			});
		}
	}
	closeSidebar = function () {
		cartBtn.classList.remove('active');
		sidebar.animate([
			{ transform: 'translateX(0)' },
			{ transform: 'translateX(295px)' }
		], {
			duration: 300,
			fill: 'forwards',
			timing: 'ease-out'
		});
	}
	showDetail = function () {
		var width = this.offsetWidth,
			left = this.offsetLeft,
			top = this.offsetTop,
			containerWidth = this.offsetParent.offsetWidth;

		detailPop.classList.remove('placeright','placeleft');

		if (left + width + width <= containerWidth) {
			detailPop.classList.add('placeright')
			left = width + this.offsetLeft;
		} else {
			detailPop.classList.add('placeleft')
			left = this.offsetLeft - width;
		};

		detailPop.style.cssText = `left: ${left}px;top: ${top}px; width: ${width}px; display: block`;
	}
	showTooltip = function () {
		var top = this.offsetTop + 3,
			tooltip = this.offsetParent.querySelector('.tooltip');

		tooltip.classList.remove('tooltip-placeleft','tooltip-placeright');

		if (this.getAttribute('tooltip-placement') == 'left') {
			tooltip.classList.add('tooltip-placeleft')
		}

		tooltip.querySelector('.tooltip-content').innerText = this.getAttribute('tooltip');
		tooltip.style.left = '-82px';
		tooltip.style.top = top + 'px';
		tooltip.style.display = 'block';
	}
	showBacktop = function () {
		if (document.body.scrollTop > 360) {
			backtopBtn.style.visibility = 'visible';
		} else {
			backtopBtn.style.visibility = 'hidden';
		}
	}

	loopEvent(categoryItems, 'click', categoryActive);
	loopEvent(subcategoryItems, 'click', function() {
		clearActive(subcategoryItems);
		this.classList.add('active');
	});

	cartBtn.addEventListener('click', toggleSidebar);
	document.querySelector('.sidebar-body .icon-angle-double-right').addEventListener('click', closeSidebar);

	loopEvent(sidebarBtns, 'mouseover', showTooltip);
	loopEvent(sidebarBtns, 'mouseout', function() {
		var tooltip = this.offsetParent.querySelector('.tooltip');
		tooltip.style.display = 'none';
	});

	loopEvent(shops, 'mouseover', showDetail);
	loopEvent(shops, 'mouseout', function() {
		detailPop.style.display = 'none';
	})

	document.addEventListener('scroll', showBacktop);
	document.addEventListener('scroll', function() {
		if (document.body.scrollTop >= stickyVal) {
			stickyEle.classList.add('sticky');
		} else {
			stickyEle.classList.remove('sticky');
		}
	})

	function toggleTitle(title) {
		var hidden,
			state,
			visibilityChange,
			defaultTitle = document.title,
			hiddenTitle = title;

		// 兼容性处理
		if (typeof document.hidden !== "undefined") {
			hidden = "hidden";
			visibilityChange = "visibilitychange";
			state = "visibilityState";
		} else if (typeof document.mozHidden !== "undefined") {
			hidden = "mozHidden";
			visibilityChange = "mozvisibilitychange";
			state = "mozVisibilityState";
		} else if (typeof document.msHidden !== "undefined") {
			hidden = "msHidden";
			visibilityChange = "msvisibilitychange";
			state = "msVisibilityState";
		} else if (typeof document.webkitHidden !== "undefined") {
			hidden = "webkitHidden";
			visibilityChange = "webkitvisibilitychange";
			state = "webkitVisibilityState";
		}

		document.addEventListener(visibilityChange, function() {
			if (document[state] === 'visible') {
				document.title = defaultTitle
			} else if (document[state] === 'hidden') {
				document.title = hiddenTitle;
			}
		}, false);
	};

	toggleTitle(hiddenTitle);

	// 轮播图效果
	for (let i = 0; i < carouselPagers.length; i++) {
		carouselPagers[i].index = i;
		carouselPagers[i].addEventListener('click', function() {
			showCarouselItem(this.index);
		})
	};
	function showCarouselItem(i) {
		var top = carouselInner.offsetTop;
		index = i;
		clearActive(carouselPagers);
		carouselPagers[i].classList.add('active');
		clearInterval(timer1);

		if (top < -i * carouselHeight) {
			timer1 = setInterval(function () {
				top += 10;
				if (top > -i * carouselHeight) {
					top = -i * carouselHeight;
				}
				carouselInner.style.top = top + 'px';
				if (top === i * carouselHeight) {
					clearInterval(timer1)
				}
			}, 20)

		} else if (top > -i * carouselHeight) {
			timer1 = setInterval(function () {
				top -= 10;
				if (top < -i * carouselHeight) {
					top = -i * carouselHeight;
				}
				carouselInner.style.top = top + 'px';
				if (top === i * carouselHeight) {
					clearInterval(timer1);
				}
			}, 20)
		}
	}

	function autoPlay() {
		timer2 = setInterval(function () {
			index++;

			if (index >= carouselItems.length) {
				index = 0;
			}
			showCarouselItem(index);
		}, 5000)
	}
	autoPlay();
}
