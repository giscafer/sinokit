# blocks

区块是组件的拼装集合，它比组件库提供了更上层的业务封装能力，但是这也让它变得没有组件库那么地纯粹。

## 约定

### 目录结构

```
 |-- article-list # 区块名称
     |-- src # 源码文件
     |-- index.ts # 统一入口文件
     |-- package.json # 区块信息文件描述
```

### package.json 文件说明

重要的属性有如下，还有 `version` 、 `description`、`repository`，这些信息都会动态展示到网站，所以需要认真书写。

```json

  "blockConfig": {
    "name": "article-list", // 区块名，以 selector 来标识
    "entryClassName": "ArticlesListPageComponent", // 区块入口组件类名（重要）
    "title": "文章列表", // 区块标题，是什么东西
    "categories": [ // 区块类型标签，可多个
      "列表"
    ],
    "screenshot": "https://raw.githubusercontent.com/1ziton/pixelmon/materials/blocks/article-list/screenshot.png", // 区块demo截图，截图命名为screenshot.png放到根目录即可展示
    "publishTime": "2019-09-21 13:29:34", // 区块创建时间
    "updateTime": "2019-09-21 17:29:39" // 区块更新时间
  },

```

`screenshot` 截图地址目前临时使用 GitHub 的，地址固定为: `https://raw.githubusercontent.com/1ziton/pixelmon/master/materials/{区块 or 模板文件目录}/screenshot.png`，每次发版合并到 master 分支，图片即可见效.

### 统一导出

`../entry.js` 文件下统一导出区块，动态创建组件预览需要使用。
