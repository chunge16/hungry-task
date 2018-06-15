### 微型MVVM框架

#### MVVM基本概念

   MVVM 中的 Model 表示应用程序使用的数据，View 是与用户进行交互的桥梁，ViewModel 充当数据转换器，讲 Model 信息转换为 View 的信息，讲命令从 View 传递到 Model。

#### MVVM基本原理


1. Object.defineProperty实现数据拦截

	通过存储描述符get和set函数，我们可以在读取或修改属性进行拦截处理，这样就可以达到对数据的监听作用。

	```
	function Archiver() {
	  var temperature = null;
	  var archive = [];

	  Object.defineProperty(this, 'temperature', {
	    get: function() {
	      console.log('get!');
	      return temperature;
	    },
	    set: function(value) {
	      temperature = value;
	      archive.push({ val: temperature });
	    }
	  });

	  this.getArchive = function() { return archive; };
	}

	var arc = new Archiver();
	arc.temperature; // 'get!'
	arc.temperature = 11;
	arc.temperature = 13;
	arc.getArchive(); // [{ val: 11 }, { val: 13 }]

	```


2. 观察者模式

   一个典型的观察者模式应用场景是，用户在一个网站订阅主题，多个用户(观察者，Observer)都可以订阅某个主题(Subject)，当主题内容更新时订阅该主题的用户都能收到通知。

   这里的主题（Subject）可以看做是Model里的数据，而观察者（Observer）就是View用到该数据的指令或模板。当数据一旦改变时就会通知所有订阅者更新。


#### 效果预览

[sample]()
