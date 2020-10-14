# 最佳实践

统一技术栈利于项目开发迭代过程中沉淀和积累，提升开发效率，花更少时间在 UI 切图开发，花更多的时间在业务和产品层面。

**技术框架选型时可以从以下几个方面调研了解（前后端通用）：**

- 功能方面
- 性能方面（后端的话 `QPS`、前端 `FPS` 等）
- 高可用（后端架构的话需要考虑，系统的核心链路是什么，任意一个组件挂了对系统有什么影响）
- 稳定性方面
- 可扩展性
- 技术的优缺点
- 生态（开发工具/体验、多端支持度/兼容性、组件库/工具库/demo 实践、接入成本、流行度、开源建设）
- 框架的未来规划
- 详细框架对比，数据说话

不要重复造轮子

- 为什么不用公司的产品？ => 你的业务场景有什么不同?
- 为什么不用开源产品？=> 业务场景有何不同？

要以解决问题为最根本的出发点，最经济和最专业的方式来解决问题。

## 技术选型

列举一些业务场景对应的技术选择方案，这里都默认是使用 Vue.js 技术栈

## 工程框架模板

> 工程框架模板会随着开发沉淀陆续推出

见目录**工程模板**

### 图表

图表开发，`Echarts` 和 `G2` 提供的组件都几乎能满足各种需求场景，两者设计理念和使用方式有较大区别，可根据个人熟悉程度去选择使用，如果有复杂高性能图表可尝试 `D3.js`。

- `Echarts` 推荐 [ve-charts](https://github.com/vueblocks/ve-charts)
- `G2` 推荐 [vue-g2](https://github.com/wupeiwen/vue-g2)

### 地图

（1）、二维地图

地图选择上推荐高德地图，百度地图的开发体验和功能组件相对较弱。高德地图的 vue 组件 [ElemeFE/vue-amap](https://github.com/ElemeFE/vue-amap)。

如果还考虑别的方案，可以了解一下开源地图 JS 库 [Leaflet.js](https://github.com/Leaflet/Leaflet) 和 [OpenLayers](https://github.com/openlayers/openlayers)，他们的 vue 组件分别如下：

- Openlayers 的 vue 封装组件库 [vuelayers](https://github.com/ghettovoice/vuelayers)
- Leaflet 的 vue 封装组件库 [Vue2Leaflet](https://github.com/vue-leaflet/Vue2Leaflet)

此外还有 [Mapbox](https://www.mapbox.com/) 提供的 [mapbox.js](https://docs.mapbox.com/mapbox.js/api/v3.3.1/) 和 [Mapbox GL JS](https://docs.mapbox.com/mapbox-gl-js/)，可以酷炫的定制一写地图效果。

> 说明：业务需求上如果包含导航和 POI 兴趣点查询展示，建议首选高德地图，因为国内的地图数据较全，用户习惯和体验上高德地图也帮忙做了。

（2）、三维地图

开源免费的三维地图目前选择很少，推荐 [CesiumGS/cesium](https://github.com/CesiumGS/cesium)，也比较强大.

### 流程图

- [G6](https://g6.antv.vision/zh/examples/gallery) AntV 是蚂蚁金服全新一代数据可视化解决方案，致力于提供一套简单方便、专业可靠、无限可能的数据可视化最佳实践。
- [topology](https://github.com/le5le-com/topology) 一个轻量（100k 左右）、功能丰富的绘图工具（微服务架构图、拓扑图、流程图、类图等 UML 图、脑图，动画、视频支持）。

### 文本编辑器

- [ueditor](https://github.com/fex-team/ueditor) rich text 富文本编辑器（不支持 Markdown）
- [wangEditor](https://github.com/wangeditor-team/wangEditor) 轻量级 web 富文本编辑器，配置方便，使用简单
- [tui.editor](https://github.com/nhn/tui.editor) Markdown 编辑器，支持图表和 UML 扩展
- [vditor](https://github.com/Vanessa219/vditor) 易于使用的 Markdown 编辑器，为适配不同的应用场景而生

### 代码编辑器

- [monaco-editor](https://github.com/microsoft/monaco-editor) 微软的浏览器代码编辑器，VS Code 在线版
- [CodeMirror](https://github.com/codemirror/CodeMirror) 浏览器代码编辑器，代码高亮
- [ace](https://github.com/ajaxorg/ace) Ajax.org Cloud9 Editor，代码编辑器，代码高亮

### 一些常用 JavaScript 库

- [sortablejs](https://github.com/SortableJS/sortablejs) 使用拖放创建列表并重新排序。
- [xlsx](https://github.com/SheetJS/sheetjs) SheetJS Community Edition——电子表格数据工具包 （Excel 数据处理）

### 其他 vue 功能组件

- [v-viewer](https://github.com/mirari/v-viewer) Vue 图片浏览组件 v-viewer，支持旋转、缩放、翻转等操作
- [vue-dropzone](https://github.com/rowanwins/vue-dropzone) 一个带有图像预览的拖放文件上传工具
- [vuedraggable](https://github.com/SortableJS/Vue.Draggable) 基于`sortablejs` 的 Vue 组件，允许拖放和与视图模型数组同步。
- [vue-split-pane](https://github.com/PanJiaChen/vue-split-pane) 使用 vue2.0 构建的拆分窗格组件，可以垂直拆分或水平拆分。

### 其他 vue 业务场景组件

- [vue-luck-draw](https://github.com/LuckDraw/vue-luck-draw) 抽奖工具

---

> 欢迎补充…… 在 [Github 编辑](https://github.com/giscafer/sinokit/blob/master/docs/best-practise.md) 文档
