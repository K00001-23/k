// JavaScript文件 main.js
document.addEventListener('DOMContentLoaded', function () {
    // 页面加载完成后执行此函数

    // 查找页面中的标题元素
    const title = document.querySelector('h1');

    // 添加交互行为：点击标题时修改标题文本
    title.addEventListener('click', function () {
        title.textContent = 'Hello, Interactive World!';
    });
});
