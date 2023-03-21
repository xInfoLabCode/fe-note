// ==UserScript==
// @name         ad_shield
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  block ad
// @author       Brandom
// @match        *://*/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

(function () {
	const MAX_AD_SCAN = 5 // 广告最多扫描次数，最小值为1
	const SCAN_SPAN = 100 // 广告扫描间隔增幅
	const WHITE_LIST = ['csdn.net']

	function log(msg, type = 'log') {
		type = ['log', 'warn', 'error', 'info'].includes(type) ? type : 'log'

		console[type](`[TamperMonkey] ${msg}`)
	}

	// 直接将dom移除
	function removeDom(selector) {
		document.querySelectorAll(selector).forEach(node => {
			node.parentNode.removeChild(node)
		})
	}

	// 通过css隐藏的方式屏蔽dom
	function hideDom(selector) {
		const style = document.createElement('style')
		style.innerText = `${selector} { display: none !important }`

		document.querySelector('head').appendChild(style)
	}

	function checkWhiteList() {
		const host = window.location.host.toLowerCase()

		return WHITE_LIST.reduce((res, cur) => {
			return res || host.includes(cur)
		}, false)
	}


	const blockMap = {}

	// iframe广告
	blockMap.iframe = function () {
		removeDom('iframe')
		hideDom('iframe')
	}

	// 简书
	blockMap.jianshu = function () {
		if (!window.location.host.includes('jianshu.com')) {
			return
		}

		removeDom('aside') // 右侧热门故事
		removeDom('ul') // 下方推荐
	}

	// 百度
	blockMap.baidu = function () {
		// 屏蔽右侧的热门推荐及推广
		removeDom('#content_right')
		hideDom('#content_right')
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
