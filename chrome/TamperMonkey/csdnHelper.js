// ==UserScript==
// @name         csdnHelper
// @version      0.4.1
// @description  customize csdn
// @author       You
// @match        *://blog.csdn.net/*
// @match        *://*.blog.csdn.net/*
// @grant        none
// @run-at       document-body
// ==/UserScript==

(function() {
	// 直接将dom移除
	function remove(target) {
		const targets = Array.isArray(target) ? target : [target]

		targets.forEach(item => {
			if (typeof item === 'string') {
				document.querySelectorAll(item).forEach(node => {
					remove(node)
				})
			} else {
				target?.parentNode?.removeChild(item)
			}
		})
	}

	// 通过css隐藏的方式屏蔽dom
	function hide(target) {
		const targets = Array.isArray(target) ? target : [target]

		targets.forEach(item => {
			if (typeof item === 'string') {
				addStyle(`${item} { display: none !important }`)
			} else {
				item?.style?.setProperty('display', 'none !important')
			}
		})
	}

	// 插入css
	function addStyle(styleStr) {
		let style = document.createElement('style')
		style.innerText = styleStr

		document.querySelector('head').appendChild(style)

		style = null
	}

	// 写cookie
	function addCookie(key, value, { domain, path, expires } = {}) {
		const cookie = `
			${key}=${value};
			${domain ? `domain=${domain};` : ''}
			${path ? `path=${path};` : ''}
			${expires ? `domain=${expires};` : ''}
		`

		document.cookie = cookie
	}



	const actions = {}

	// 博客默认全屏浏览
	actions.setBlogFullScreen = function() {
		// 通过cookie强制开启全屏
		addCookie('blog_details_concision', '0', { domain: 'csdn.net', path: '/', expires: 365 })

		// cookie不生效时，强制清理左右内容
		remove(['aside', '.rightAside'])
	}

	// 博客移除推荐
	actions.removeBlogRecommend = function() {
		function clearRecommend() {
			remove('.recommend-box')
			window.removeEventListener('load', clearRecommend)
		}

		window.addEventListener('load', clearRecommend)
	}

	// 博客代码未登陆可复制
	actions.setCodeCopyable = function() {
		addStyle(`#content_views pre, #content_views pre code { user-select: auto !important }`)
	}

	// 屏蔽toolbar、sidebar等
	actions.hideToolbar = function() {
		hide(['#csdn-toolbar', '#recommendNps', '.csdn-side-toolbar', '.blog-footer-bottom', '#toolBarBox'])
	}

	function doActions() {
    Object.entries(actions).forEach(([, action]) => action())
	}

	function main() {
	  doActions()
	}

  main()
})();