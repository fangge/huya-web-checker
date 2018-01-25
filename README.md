# Huya Web Checker

## 功能介绍

可检测页面SEO信息，显示引用的相关统计和组件，检测图片大小是否超标

## 使用说明

1、打开谷歌浏览器，并打开一下地址进行安装
https://chrome.google.com/webstore/detail/yy-web-checker/gkfnpficcdmnddgijpjolajmbifecado?hl=zh-CN

2、插件支持全域名下的页面

3、安装后点击图标即可开始使用
（1）检测SEO
![检测SEO](http://image.game.yy.com/o/cloudapp/25586140/170x170/201506-5af66e47_2e0e_4e95_a1f8_15d6069782aa.png)

（2）检测使用的代码库（不断完善优化中）
![检测使用的代码库](http://image.game.yy.com/o/cloudapp/25586140/170x170/201506-11f789e3_45ef_4695_b14b_ceea7f37eb9e.png)

（3）图片大小
> 有超标图片
![上传图片](http://image.game.yy.com/o/cloudapp/25586140/170x170/201506-7b95dc9c_f127_456e_86be_ae4789d18981.png)

> 无超标图片
![上传图片](http://image.game.yy.com/o/cloudapp/25586140/170x170/201506-d43b5e9d_b87e_4162_8ea3_787b576a768d.png)

图片超标算法是根据网上的一个算法来的，不算是精准测量，不过有比较广泛的参考意义，欢迎大家一起优化：
http://code.yy.com/dw_fangyang1/yy-web-checker/blob/master/js/module/image.js

（4）生成当前页面的二维码
生成浏览页面的二维码，方便手机端查看


## 特别注意

由于谷歌浏览器在**43**版本后，禁止用户使用**未在应用中心发布的扩展**，所以如果大家使用的谷歌浏览器版本是**43**以下的，可以参照下面的流程来调试此扩展（如果43以上请参照使用说明）：

（1）地址栏输入`chrome://extensions/`，打开扩展程序界面

（2）打开http://code.yy.com/dw_fangyang1/yy-web-checker

（3）下载项目并解压到任意目录
![上传图片](http://image.game.yy.com/o/cloudapp/25586140/170x170/201506-04ce8cfb_14a5_4f70_a9e1_4e599b173cc4.png)

（4）在扩展程序界面中点击**“加载正在开发的扩展程序”**，并选择刚才解压的目录即可

> 如果无法上google，可以翻墙，可以参考
[Google翻墙host](http://googlehost.lofter.com/post/1d1307f4_7062403 "Google翻墙host")