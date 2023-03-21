// ==UserScript==
// @name         CSDN_Helper
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  customize csdn for you own taste
// @author       You
// @match        *://*.csdn.net/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

(function() {
	const actions = {}

	// 默认博客全屏浏览
	actions.setBlogFullScreen = function() {
    document.cookie = 'blog_details_concision=0;domain=csdn.net;path=/;expires=365'
	}

	function doActions() {
    Object.entries(actions).forEach(([, action]) => action())
	}

	function main() {
	  window.addEventListener('load', doActions)
	}

  main()
})();
