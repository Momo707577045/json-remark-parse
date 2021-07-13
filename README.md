# 带备注的 JSON 重排版工具
![界面](http://upyun.luckly-mjw.cn/Assets/json-remark-parse/01.png)
### [工具在线地址](http://blog.luckly-mjw.cn/tool-show/json-remark-parse/index.html)

### 研发背景
- 工具欠缺，笔者寻找网络，未找到类似功能的工具。
- YAPI 等接口文档工具，未配备重排版功能，需要手动调整缩进。繁琐且无意义。
    - 网上有许多 JSON 格式化工具，但均仅使用 JSON.parse()，JSON.stringify() 对内容进行解析和排班，无法解析带备注的 JSON 信息。
- 常会将业务代码，拷贝到 YAPI 中。需要手动删除 value 值，并逐个添加双引号「""」。繁琐且无意义。
- 结合以上原因，开发了本工具。

### 使用说明
- 【2缩进】将 json 字符串的缩进修改为 2 个空格。（默认 4 个控制） 。
- 【去值】去除 JSON 的值，只保留 key。常用于复制项目代码到 YAPI 等接口说明文档，清除业务数据值。(注意，只会删除字符串的值，非字符串值，如数值，布尔值等将保留)  。
- 【复制】复制重排版后的 JSON 字符串。
- 【JSDoc】生成 json 数据对应的 JSDoc 备注信息
- 【schemaJSON】将 schemaJSON 转化为普通带备注的 JSON

### 实现思路
*只是代码的基础运用*
- 利用 eval() 将源码字符串转化为对象。
    - 不可用 JSON.parse()，因为源码字符串是携带备注信息的，不是标准 JSON 数据。无法直接解析。
    - 通过挂载在 window 全局变量上，获取解析后的值。
    - ```eval(`window._originStr = ${originStr}`)```。
- 获取「源码字符串」的每一行```originStrLine = originStr.split('\n')```。
    - 并通过正则提取行的备注信息，并以对象「remarkObj」保存。如```"pageIndex": "1", // 第几页```，则保存为```"pageIndex": "// 第几页"```。
- 获取去除备注信息后的「JSON 对象字符串」的每一行```jsonStrLine = jsonStr.split('\n')```。
    - 利用 [JSON.stringify()](https://www.runoob.com/js/javascript-json-stringify.html) 的第三个参数，控制缩进并将 JSON 以对象展开形式组织。
- 遍历 jsonStrLine 每一行，并通过 key 寻找「remarkObj」是否有对应的备注信息，有则重新添加进去。
- 将 jsonStrLine 组合成字符串输出。
- 总结
    - 先找出备注信息。
    - 格式化。
    - 将备注重新添加回去。

### 核心代码
```
parseJSON(originStr) {
      try {
        eval(`window._originStr = ${originStr}`)
        let jsonStr = JSON.stringify(window._originStr, null, this.indent ? 2 : 4)
        let remarkObj = [] // 备注信息
        let originStrLine = originStr.split('\n') // 初始数据的每一行
        let jsonStrLine = jsonStr.split('\n') // 解析后的数据

        // 获取备注信息
        originStrLine.forEach((line) => {
          if (/[^:]\/\//.test(line)) {
            let linePart = line.split('//')
            remarkObj[line.split(':')[0].trim()] = ` // ${linePart.pop().trim()}`
          }
        })

        // 给格式化后的数据添加备注
        jsonStrLine = jsonStrLine.map((line) => {
          if (this.withoutValue) { // 是否去值
            line = line.replace(/: "[^"]+"/, ': ""')
          }
          Object.keys(remarkObj).some((remarkItem) => {
            if (line.indexOf(remarkItem) > -1) {
              let value = remarkObj[remarkItem]
              delete remarkObj[remarkItem]
              line += value
              return true
            }
            return false
          })
          return line
        })
        return jsonStrLine.join('\n')
      } catch (e) {
        return 'JSON 数据有误：' + e.toString()
      }
    },
```

