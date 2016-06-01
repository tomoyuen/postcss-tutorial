require('normalize-css');
require('./index.css');
import $ from 'jquery';

$(function() {
	$('.category li').on('click', function() {
		$(this).siblings().removeClass('active');
		$(this).addClass('active');
		if ($(this).is('.no-sub')) {
			$('.sub-category').hide();
		} else {
			$('.sub-category').show();
		}
	});

	$('.sub-category li').on('click', function() {
		$(this).siblings().removeClass('active');
		$(this).addClass('active');
	});
});

window.openSidebar = function () {
	$(this).addClass('active');
	$('.sidebar').animate({
		right: '295px'
	}, 300);
}

window.closeSidebar = function () {
	$('.sidebarbd-cartbtn').removeClass('active');
	$('.sidebar').animate({
		right: '0'
	}, 300);
}

window.showDetail = function () {
	var width = this.offsetWidth,
		left = this.offsetLeft,
		top = this.offsetTop,
		containerWidth = this.offsetParent.offsetWidth,
		point = $('.detailpop');

	point.removeClass('placeright').removeClass('placeleft');

	if (left + width + width <= containerWidth) {
		point.addClass('placeright')
		left = width + this.offsetLeft;
	} else {
		point.addClass('placeleft')
		left = this.offsetLeft - width;
	};

	point.css({
		left: left + 'px',
		top: top + 'px',
		width: width + 'px'
	});

	point.show();
}

window.hideDetail = function () {
	$('.detailpop').hide();
}
