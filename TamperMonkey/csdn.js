// ==UserScript==
// @name         CSDN_Helper
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  customize csdn for you own taste
// @author       You
// @match        *://blog.csdn.net/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

(function() {
	// 直接将dom移除
	function remove(target) {
		if (typeof target === 'string') {
			document.querySelectorAll(target).forEach(node => {
				remove(node)
			})
		} else {
			target?.parentNode?.removeChild(target)
		}
	}

	// 通过css隐藏的方式屏蔽dom
	function hide(target) {
		if (typeof target === 'string') {
			const style = document.createElement('style')
			style.innerText = `${target} { display: none !important }`

			document.querySelector('head').appendChild(style)
		} else {
			target?.style?.setProperty('display', 'none !important')
		}
	}



	const actions = {}

	// 博客默认全屏浏览
	actions.setBlogFullScreen = function() {
		// 通过cookie强制开启全屏
    document.cookie = 'blog_details_concision=0;domain=csdn.net;path=/;expires=365'

		// cookie不生效时，强制清理左右内容
		remove('aside')
		remove('.rightAside')
	}

	// 博客移除推荐
	actions.removeBlogRecommend = function() {
		remove('.recommend-box')
	}

	// 博客代码未登陆可复制
	actions.setCodeCopyable = function() {
		let style = document.createElement('style')
		style.innerText = `#content_views pre, #content_views pre code { user-select: auto !important }`

		document.querySelector('head').appendChild(style)
		style = null
	}


	function doActions() {
    Object.entries(actions).forEach(([, action]) => action())
	}

	function main() {
	  window.addEventListener('load', doActions)
	}

  main()
})();