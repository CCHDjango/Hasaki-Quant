/*
hasaki-quant server center
when user start this , server center would start and connect the exchange,
Later I will add some news crawls in this server.

so the server center will provide exchange quote data and some latest news and
post user `s order to the exchange.

hasaki-quant服务中心，一个常驻进程，连接交易所和启动爬虫，启动一个本地的websocket服务
给本地的用户连接并接受用户的发单，这个服务是给策略使用的，手动交易的不需要一个进程来监听
用户发单

notice:
node标准库中没有websocket库，该服务暂时不做
*/
import {Log} from './log'
import {readJson,rootPath} from './common'
import {gate} from './gateio'

let log=new Log()