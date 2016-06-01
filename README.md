# postcss-tutorial
postcss demo

### TODO
- [ ] sticky effects
- [x] responsive structure
- [x] sidebar-tooltip
- [x] back-top
- [ ] toggle显示backtop-btn
- [ ] 兼容性测试

### optimize
- click除sidebar-open以外的地方，都应该先触发closeSidebar()
- 聚焦到的店铺，显示详情的应该根据对象屏幕的上下间距设置top或bottom，现在是写死的top

### bugs
- ~~sidebar-tooltip问题（想想还是写两个吧）~~

### questions
- 用webpack打包，写的js怎么暴露到全局?
- 用html-minify压缩html代码，相邻的行内元素，多出了一个空格，设置collapseInlineTagWhitespace能清除空格，但发现本来在标签内的空格也没有了。
