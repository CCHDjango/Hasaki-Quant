## Hasaki quant

#### init local catelogue 初始化本地项目目录

1,先在本机创建一个空目录作为hasaki-quant的工程目录

2,使用vscode打开该工程目录，使用Ctrl+Shift+p调出vscode的命令输入框输入:hasaki   来自动初始化该工程目录，

使用vscode命令行hasaki命令初始化目录会生成一个策略目录strategy,顾名思义，用户的策略文件会存放在该目录下

数据目录data,用户用来做数据分析和回测用的行情数据和舆情数据都会存放在这个目录下。

用户行为日志log，用户在hasaki-quant的重要操作会写入在该目录下，方便用户反馈问题以及记录用户自身的操作复盘。

config.json文件，用来保存用户的账户配置信息，如用户在交易所的api key等关键信息。

#### hasaki-quant view hasaki-quant页面操作

安装了hasaki-quant 插件后，vscode的side bar就多一个笔的图标，点击笔的图标，vscode的tree view会改变，

分为四个部分:策略信息，账户信息，市场以及社区。

策略信息用来检测用户的策略状态(还没实现)

账户信息用来展示用户的账户状态(还没实现)

市场即用户可手动获取账户信息，也可手动下单(实现了gateio数字货币交易所，A股的行情正在做)

社区，用户可以从社区获取有关:量化，vscode使用，交易等社区信息(只做了hasaki-quant的页面)

#### quant engine 量化引擎

hasaki-quant支持了typescript/javascript,python,golang编程语言的简化量化引擎，这些引擎都是根据国内比较出名的开源量化架构

vnpy进行设计的，vnpy策略的写法是可以直接用在hasaki-quant上。

量化引擎源码github地址 :

[golang实现的gasaki](https://github.com/CCHDjango/gasaki)

[python实现的pasaki](https://github.com/CCHDjango/pasaki)

[typescript实现的tasaki](https://github.com/CCHDjango/tasaki)

#### hasaki数据中台

[hasaki数据中台源码地址](https://github.com/CCHDjango/hasakiServer)

#### Roadmap

hasaki-quant会由开发者持续测试使用一年之后再开始正式推广

2020 Q1 : finish the Astock webview and fix the quant engine and finish the hasaki server module(make by golang).hasaki server first.

2020 Q2 : finish the hasaki data server, user can load the data from net disk by themself or throuth the plugin to load
 the data.Data include news , quote.

2020 Q3 : start wechat mini program hasaki-quant.

2020 Q4 : fix all bug and ready to push on market.

#### community 社区

[点击获取hasaki-quant微信群二维码](https://gitee.com/CCHChenChangHong/changhong_quantizing_machine/raw/master/head.jpg)

更多有关hasaki-quant的资料在开发者 知乎 : cch陈常鸿