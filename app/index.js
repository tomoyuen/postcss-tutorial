require('normalize-css');
require('./index.css');

window.onload = function () {
	var categoryItems = document.querySelectorAll('.category li'),
		subcategoryBlock = document.querySelector('.sub-category'),
		subcategoryItems = document.querySelectorAll('.sub-category li'),
		sidebarBtns = document.querySelectorAll('.sidebar-tabs a.sidebar-btn'),
		shops = document.querySelectorAll('.main-content .shop-item');

	var clearActive,loopEvent,categoryActive;

	clearActive = function (items) {
		for (let i = 0; i <= items.length - 1; i++) {
			items[i].classList.remove('active');
		}
	};
	loopEvent = function (items, event, func, useCapture=false) {
		for (let i = 0; i <= items.length - 1; i++) {
			items[i].addEventListener(event, func, useCapture);
		}
	};
	categoryActive = function () {
		clearActive(categoryItems);
		this.classList.add('active');
		if (this.classList.contains('no-sub')) {
			subcategoryBlock.style.display = 'none';
		} else {
			subcategoryBlock.style.display = 'block';
		}
	};

	loopEvent(categoryItems, 'click', categoryActive);
	loopEvent(subcategoryItems, 'click', function() {
		clearActive(subcategoryItems);
		this.classList.add('active');
	});
	loopEvent(sidebarBtns, 'mouseover', showTooltip);
	loopEvent(sidebarBtns, 'mouseout', function() {
		var tooltip = this.offsetParent.querySelector('.tooltip');
		tooltip.style.display = 'none';
	});
	loopEvent(shops, 'mouseover', showDetail);
	loopEvent(shops, 'mouseout', function() {
		var detailPop = document.querySelector('.main-content .detailpop');
		detailPop.style.display = 'none';
	})
	document.addEventListener('scroll', showBacktop);
	document.querySelector('.sidebar .sidebar-btn-backtop').addEventListener('click', function() {
		document.body.animate({
			scrollTop: [document.body.scrollTop, 0]
		}, 2000);
	});
	document.querySelector('.sidebar .sidebar-cartbtn').addEventListener('click', toggleSidebar);
	document.querySelector('.sidebar-body .icon-angle-double-right').addEventListener('click', closeSidebar);
}


var toggleSidebar = function () {
	if (this.classList.contains('active')) {
		closeSidebar();
	} else {
		this.classList.add('active');
		document.querySelector('.sidebar').animate([
			{ transform: 'translateX(295px)' },
			{ transform: 'translateX(0)' }
		],{
			duration: 300,
			fill: 'forwards',
			timing: 'ease-in'
		});
	}
}

var closeSidebar = function () {
	document.querySelector('.sidebar .sidebar-cartbtn').classList.remove('active');
	document.querySelector('.sidebar').animate([
		{ transform: 'translateX(0)' },
		{ transform: 'translateX(295px)' }
	], {
		duration: 300,
		fill: 'forwards',
		timing: 'ease-out'
	});
}

var showDetail = function () {
	var width = this.offsetWidth,
		left = this.offsetLeft,
		top = this.offsetTop,
		containerWidth = this.offsetParent.offsetWidth,
		detailPop = document.querySelector('.main-content .detailpop');

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

var showTooltip = function () {
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

var showBacktop = function () {
	var btn = document.querySelector('.sidebar .sidebar-btn-backtop');

	if (document.body.scrollTop > 360) {
		btn.style.visibility = 'visible';
	} else {
		btn.style.visibility = 'hidden';
	}
}
