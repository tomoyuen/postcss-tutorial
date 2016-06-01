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

window.toggleSidebar = function () {
	if ($(this).hasClass('active')) {
		closeSidebar();
	} else {
		$(this).addClass('active');
		$('.sidebar').animate({
			right: '295px'
		}, 300);
	};
}

window.closeSidebar = function () {
	$('.sidebar .sidebar-cartbtn').removeClass('active');
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

window.showTooltip = function () {
	var that = $(this),
		top = this.offsetTop + 3,
		point = that.closest('div').find('.tooltip');

	point.removeClass('tooltip-placeleft');

	if (that.attr('tooltip-placement') == 'left') {
		point.addClass('tooltip-placeleft')
	}

	point.find('.tooltip-content').text(that.attr('tooltip'));

	point.css({
		left: '-82px',
		top: top + 'px'
	});

	point.show();
}

window.hideTooltip = function () {
	$('.sidebar .tooltip').hide();
}

window.backtop = function () {
	$('body').animate({
		scrollTop: 0
	}, 300);
}
