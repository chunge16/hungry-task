## waterfall-sinanews

预览地址
[waterfall-sinanews](http://chunge2016.online/hungry-task/JavaScript/waterfall-sinanews/)

## 瀑布流原理

利用绝对定位方式设置每个元素的top和left值。
- 通过盒子宽度和容器宽度之比得出列数
- 创建一个数组，长度为列数，里面为每列已定位元素高度之和（初始化为0）
- 为定位的元素依次定位到高度最小的行列里

## 实现原理

- 获取接口数据
- 利用数据生成DOM节点
- 将节点插入容器里并且按瀑布流原理进行布局
