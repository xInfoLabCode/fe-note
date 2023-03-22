// ==UserScript==
// @name         adShield
// @version      1.3
// @description  block ad by yourself
// @author       Brandom
// @match        *://*.baidu.com/*
// @match        *://*.jianshu.com/*
// @grant        window.onurlchange
// @noframes
// @run-at        document-body
// ==/UserScript==

(function () {
	const WHITE_LIST = [] // 广告屏蔽白名单，统一小写

	const MAX_AD_SCAN = 5 // 广告最多扫描次数，最小值为1。如果广告有延后加载，可以适当将数值调大
	const SCAN_SPAN = 200 // 广告扫描间隔增幅，一般不建议修改

	function checkWhiteList() {
		const host = window.location.host.toLowerCase()

		return WHITE_LIST.reduce((res, cur) => {
			return res || host.includes(cur)
		}, false)
	}

	function log(msg, type = 'log') {
		type = ['log', 'warn', 'error', 'info'].includes(type) ? type : 'log'

		console[type](`[TamperMonkey] ${msg}`)
	}

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
			let style = document.createElement('style')
			style.innerText = `${target} { display: none !important }`

			document.querySelector('head').appendChild(style)
			style = null
		} else {
			target?.style?.setProperty('display', 'none !important')
		}
	}


	const blockMap = {}

	// iframe广告
	blockMap.iframe = function () {
		remove('iframe')
		hide('iframe')
	}

	// google广告
	blockMap.google = function() {
		let body = document.body
		let html = body.parentNode

		document.querySelectorAll('ins.adsbygoogle').forEach(node => {
			let parent = node.parentNode
			if (![body, html].includes(parent)) {
				remove(parent)
			} else {
				remove(node)
			}
			parent = null
		})

		body = null
		html = null
	}

	// 简书
	blockMap.jianshu = function () {
		const { host, pathname } = window.location
		if (!host.includes('jianshu.com')) {
			return
		}

		// 简书详情页
		if (pathname.startsWith('/p/')) {
			remove('aside') // 右侧热门故事
			remove('ul') // 下方推荐
		}
	}

	// 百度
	blockMap.baidu = function () {
		// 屏蔽右侧的热门推荐及推广
		remove('#content_right')
		hide('#content_right')
	}

	// 屏蔽执行
	function doBlock() {
		log('start')

		function interval(index) {
			setTimeout(() => {
				try {
					if (index >= MAX_AD_SCAN) {
						log(`Ad scan finished. Scaned ${MAX_AD_SCAN} times totally`)
					} else {
						log(`Ad scan No.${index + 1}`)

						Object.entries(blockMap).forEach(([, fn]) => fn())
						interval(++index)
					}
				} catch (err) {
					log(`Ad scan error`, err)
				}
			}, index * SCAN_SPAN)
		}

		interval(0)

		log('finished')
	}

	function main() {
		if (checkWhiteList()) {
			log('current site is in the white list', 'warn')
			return
		}

		doBlock()
		window.addEventListener('urlchange', doBlock)
	}

	main()
})()
