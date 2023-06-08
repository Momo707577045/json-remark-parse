const icon = document.createElement("div");
document.body.appendChild(icon);
icon.style.position = "fixed";
icon.style.bottom = "10px";
icon.style.left = "0";
icon.style.width = "32px";
icon.style.height = "32px";
icon.style.zIndex = "9999999";
icon.style.backgroundImage = "url(http://blog.luckly-mjw.cn/favicon.ico)";
icon.style.backgroundSize = "cover";
icon.style.cursor = "pointer";
icon.style.display = "none";
icon.addEventListener('click', function () {
  try {
    $newWindow = window.open('//blog.luckly-mjw.cn/tool-show/json-remark-parse/index.html?t=' + new Date().getTime());
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
