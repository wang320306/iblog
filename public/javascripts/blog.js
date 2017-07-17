;(function($) {
	'use strict';

	// Android 4.1
	$(function () {
		var nua = navigator.userAgent;
		var isAndroid = (nua.indexOf('Mozilla/5.0') > -1 && nua.indexOf('Android ') > -1 && nua.indexOf('AppleWebKit') > -1 && nua.indexOf('Chrome') === -1);
		if (isAndroid) { $('select.form-control').removeClass('form-control').css('width', '100%') }
	});
	
	jQuery(document).ready(function() {
		
		// 检测移动设备
		var isMobile = { 
				Android: function() { return navigator.userAgent.match(/Android/i); },
	            BlackBerry: function() { return navigator.userAgent.match(/BlackBerry/i); },
	            iOS: function() { return navigator.userAgent.match(/iPhone|iPad|iPod/i); },
	            Opera: function() { return navigator.userAgent.match(/Opera Mini/i); },
	            Windows: function() { return navigator.userAgent.match(/IEMobile/i); },
	            any: function() { return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows()); }
	        };
		
		// 页面加载完毕关闭等待效果
		/*jQuery(window).load(function() {
			$("#preloader").delay(350).fadeOut("slow");
		});*/
		
		// 设置列表高度并美化滚动条
		setSideBarHeight();
		function setSideBarHeight(){
			jQuery('.sidebar-content').css('height', (jQuery(window).height() - 200));
			jQuery("#sidebar-content").niceScroll({cursorcolor:"#eee"});
		}
		
		// 导航栏鼠标悬停效果显示
		jQuery('li.dropdown, li.dropdown-submenu').hover(
			function() { if(jQuery(window).width() > 767) jQuery('> .dropdown-menu', this).stop().fadeIn(300); }, 
			function() { if(jQuery(window).width() > 767) jQuery('> .dropdown-menu', this).stop().fadeOut(300); }
		);
		
		// 终端屏幕菜单按键
		jQuery('#mobile-button').click(function() {
			if (jQuery('.collapse').css('display') == 'none')
                jQuery('.collapse').css('display', 'block');
            else
            	jQuery('.collapse').css('display', 'none');
        });
		
		/*jQuery(".widget-cfg").click(function() {
			$("#style-sidebar").toggleClass("show");
		});*/
		
		megaMenu();
		function megaMenu(){
			if(jQuery(window).width() > 767) {
				$('.mega-menu').each(function () {
				      $(this).css('width', ($('nav.navbar-area').width()));
				      var offset = $(this).closest('.dropdown').offset();
				      offset = offset.left;
				      var containerOffset = $(window).width() - $('nav.navbar-area').outerWidth();
				      containerOffset = containerOffset /2;
				      offset = offset - containerOffset;
				      $(this).css('left', -offset);
				    });
			}
		  }
		
		jQuery(window).scroll(function(){
			//alert($(window).scrollTop());
		});
		
		jQuery(window).resize(function(){
			
		});
		
		// 导航栏鼠标点击效果显示
		jQuery('li.dropdown > a.arrow, li.dropdown-submenu > a.arrow').click(function() {
			if(jQuery(window).width() < 768) {
				var list = jQuery(this).parent();
				if(jQuery('> .dropdown-menu', list).length > 0) {
					if(!list.hasClass('open')) jQuery(list).addClass('open');
					else jQuery(list).removeClass('open');
					return false;
				}
			}
		});
		
	});

}(jQuery));