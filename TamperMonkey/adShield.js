// ==UserScript==
// @name         adShield
// @namespace    http://tampermonkey.net/
// @version      1.2
// @description  block ad by yourself
// @author       Brandom
// @match        *://*.baidu.com/*
// @match        *://*.jianshu.com/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
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

	// 事件监听
	function initEvents(callback) {
		// 1.重写路由事件，方便监听（如百度切换搜索词触发重新搜索的场景下）
		const historyWrite = ['pushState', 'replaceState']
		historyWrite.forEach(fn => {
			const stateChange = window.history[fn]
			window.history[fn] = function () {
				window.dispatchEvent(new Event('statechange'))
				stateChange.apply(this, [...arguments])
			}
		})

		// 2.绑定事件监听
		const eventList = [
			'load', // 页面加载完成
			'hashchange', // hash变化时监听
			'popstate', // 前进、后退等操作监听
			'statechange', // 自定义的监听，执行pushState、replaceState时触发
		]
		eventList.forEach(event => {
			window.addEventListener(event, event => callback(event))
		})
	}

	function main() {
		const isWhiteList = checkWhiteList()
		if (isWhiteList) {
			log('current site is in the white list')
		} else {
			initEvents(doBlock)
		}
	}

	main()
})()
