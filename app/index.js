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

	$('.sidebar-cartbtn').on('click', function() {
		$(this).addClass('active');
		$('.sidebar').animate({
			right: '295px'
		}, 300);
	});

	$('.sidebarbd-caption .icon-angle-double-right').on('click', function() {
		$('.sidebarbd-cartbtn').removeClass('active');
		$('.sidebar').animate({
			right: '0'
		}, 300);
	})
})
