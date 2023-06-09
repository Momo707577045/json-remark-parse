// ==UserScript==
// @name         json-parse
// @author       Momo707577045
// @version      0.10.1
// @include        *
// @grant        unsafeWindow
// @namespace    https://github.com/Momo707577045/JSON-Remark-Parse
// @description  https://github.com/Momo707577045/JSON-Remark-Parse 配套插件
// @downloadURL	 https://github.com/Momo707577045/json-remark-parse/raw/master/json-parse.user.js
// @updateURL	   https://github.com/Momo707577045/json-remark-parse/raw/master/json-parse.user.js
// @run-at document-start
// ==/UserScript==

(function () {
  'use strict';
  function init() {

    const icon = document.createElement("div");
    document.body.appendChild(icon);
    icon.style.position = "fixed";
    icon.style.bottom = "10px";
    icon.style.left = "0";
    icon.style.width = "28px";
    icon.style.height = "36px";
    icon.style.zIndex = "9999999";
    icon.style.backgroundImage = "url(data:image/png;base64,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)";
    icon.style.backgroundSize = "cover";
    icon.style.cursor = "pointer";
    icon.style.display = "none";
    icon.addEventListener('click', function () {
      try {
        const $newWindow = window.open('//blog.luckly-mjw.cn/tool-show/json-remark-parse/index.html?t=' + new Date().getTime());
        window.addEventListener('message', function (event) {
          if (event.data === 'jsonRemarkParseLoaded') {
            $newWindow.postMessage(JSON.stringify({
              action: 'setTitle',
              content: document.title,
            }), '*');
            $newWindow.postMessage(JSON.stringify({
              action: 'setSourceStr',
              content: icon.dataset.content,
            }), '*');
            $newWindow.postMessage(JSON.stringify({
              action: 'setOnlyRead',
              content: 0,
            }), '*');
          }
        });
      } catch (error) {
        alert('JSON 错误，请输入有效信息', error.toString());
      }
      icon.style.display = "none";
    })

    // 监听文本选择事件
    document.addEventListener("mouseup", function (event) {
      const selection = window.getSelection().toString().trim();
      if (selection.length > 0) {
        console.log('selection', selection)
        icon.dataset.content = selection;
        icon.style.display = "block";
        icon.style.left = event.clientX - 50 + "px";
        icon.style.top = event.clientY + "px";
      } else {
        icon.style.display = "none";
      }
    });
  }
  const timer = setInterval(() => {
    if (document.body) {
      clearInterval(timer);
      init();
    }
  }, 100)

})();