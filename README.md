# postcss-tutorial
postcss demo

### TODO
- [x] sticky effects
- [x] responsive structure
- [x] sidebar-tooltip
- [x] back-top
- [x] toggle显示backtop-btn
- [ ] 兼容性测试
- [x] 轮播图

### optimize
- click除sidebar-open以外的地方，都应该先触发closeSidebar()
- 聚焦到的店铺，显示详情的应该根据对象屏幕的上下间距设置top或bottom，现在是写死的top

### questions
- 用webpack打包，写的js怎么暴露到全局?
- 用html-minify压缩html代码，相邻的行内元素，多出了一个空格，设置collapseInlineTagWhitespace能清除空格，但是嵌套的标签里的空格也被清除了。
- ie里的请求没有自动加http:或https:

### tips
- 使用了实验性质的animate()方法来实现购物车侧边栏的动画效果，只在新版的chrome里有效
