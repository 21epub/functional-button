const downloadFile = (url: string ,fileName="file") => {
    const eleLink = document.createElement('a');
    eleLink.style.display = 'none';
    eleLink.href = url;
    eleLink.download = fileName;
    // 受浏览器安全策略的因素，动态创建的元素必须添加到浏览器后才能实施点击
    document.body.appendChild(eleLink);
    // 触发点击  
    eleLink.click();
    // 然后移除
    document.body.removeChild(eleLink);
};
  
export default downloadFile;
