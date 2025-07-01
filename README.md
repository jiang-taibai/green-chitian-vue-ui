# 绿色赤田

主要功能：

1. 实现农户日常化肥农药施用情况的记录，化肥农药种类、用量、图片等信息采集;
2. 通过定位功能显示所在区域土壤养分含量信息;
3. 统计功能，统计月、季度、年，农户化肥农药施用频次、种类、总量等信息，也可以统计所用用户总共的化肥农药施用量、以及各种不同化肥农药的施用量等。
4. 查询功能，能够查询推荐施肥量、病虫害绿色防控技术模式等。
5. 后台管理员能够更新推荐施肥量、病虫害绿色防控技术模式这些信息
6. 上述统计信息能够连接上传到县里面的赤田水库管理云平台，供展示。

# 技术选型

- 前端
    - 运行环境：[Node.js](https://nodejs.org/zh-cn/) 18.16.0
    - 包管理工具：[npm](https://www.npmjs.com/)
    - 框架：[Vue.js](https://v3.cn.vuejs.org/)
    - 构建工具：[Vite](https://vitejs.dev/)
    - UI框架
        - 主UI框架：[Vant 4](https://vant-ui.github.io/vant/#/zh-CN)
        - 可视化图表：[Echarts](https://echarts.apache.org/zh/index.html)
        - 地图：[vue-tmap](https://didi.github.io/vue-tmap/)
    - 路由：[Vue Router](https://next.router.vuejs.org/)
    - 网络请求：[Axios](https://axios-http.com/)
    - 数据验证库：[Joi](https://joi.dev/)
    - 状态管理：[Pinia](https://pinia.vuejs.org/)

# 代码提交规范

* feat: 新功能
* fix: 修复 Bug
* docs: 文档修改
* per: 性能优化
* revert: 版本回退
* ci: CICD集成相关
* test: 添加测试代码
* refactor: 代码重构
* build: 影响项目构建或依赖修改style:不影响程序逻辑的代码修改chore:不属于以上类型的其他类型(日常事务)

# 运行项目

```bash
git clone https://github.com/jiang-taibai/green-chitian-vue-ui
cd green-chitian-vue-ui
npm install
npm run dev
```