/*
Hasaki-Quant Web View
*/
import {ExtensionContext,ViewColumn,WebviewPanel,window,Uri} from 'vscode'
import {vscodeInput} from './inputManager'
import {vscodeShowManager} from './showManager'
let fs = require('fs')
let path = require('path')

// globals
let webViewPanel : WebviewPanel | undefined
let lastView:string=""

export function getIframeHtml(label:string):string{
    // todo : 这个方法需要删掉
    return `
    <body>
    <h1>该页面还没有完成 This page has not finished</h1>
    </body>
    `
}

function loadHTML(context:ExtensionContext,label?:string):string{
    // function : 加载本地html文件
    if (label && label=="Gateio"){
        let relativePath:string="html/gateioQuote.html"
        let resourcePath = path.join(context.extensionPath, relativePath);
        let html = fs.readFileSync(resourcePath, 'utf-8').toString();
        return html
    }
    if (label && label=="Huobi"){
        let relativePath:string="html/huobiQuote.html"
        let resourcePath = path.join(context.extensionPath, relativePath);
        let html = fs.readFileSync(resourcePath, 'utf-8').toString();
        return html
    }
    if (label && label=="Account"){
        let relativePath:string="html/account.html"
        let resourcePath = path.join(context.extensionPath, relativePath);
        let html = fs.readFileSync(resourcePath, 'utf-8').toString();
        return html
    }
    let relativePath:string="html/hasaki-quant-welcome.html"
    let resourcePath = path.join(context.extensionPath, relativePath);
    let dirPath = path.dirname(resourcePath);
    let html = fs.readFileSync(resourcePath, 'utf-8');
    // vscode不支持直接加载本地资源，需要替换成其专有路径格式，这里只是简单的将样式和JS的路径替换
    html = html.replace(/(<link.+?href="|<script.+?src="|<img.+?src="|<header.+?reSignal)(.+?)"/g, (m:any, $1:any, $2:any) => {
        return $1 + Uri.file(path.resolve(dirPath, $2)).with({ scheme: 'vscode-resource' }).toString() + '"';
    });
    // 解决header中style加载背景图片路径不正确的问题
    html = html.replace(/(reSignal)/g,"")
    html = html.replace(/(%29)/g,")")
    return html
}

export function createWebView(context:ExtensionContext,viewColumn:ViewColumn,label:string):any{
    // function : 创建网页面板
    // param context : 插件上下文对象
    // param viewColumn : 
    // param label : 网页展示页面的标题
    if (lastView==label && webViewPanel!=undefined){
        // 点击重复页面的情况，就不再重新加载页面
        webViewPanel.title=label
        webViewPanel.reveal()
        return webViewPanel
    }
    lastView=label

    webViewPanel=undefined

    switch (label){
        case "Gateio":
            return gateioWebView(context,viewColumn,label)
            break
        case "Huobi":
            return huobiWebView(context,viewColumn,label)
            break
        case "Hasaki社区":
            webViewPanel=window.createWebviewPanel('community',label,viewColumn,{retainContextWhenHidden:false,enableScripts:true})
            webViewPanel.webview.html=loadHTML(context)//getIframeHtml(label)
            
            // onDidDispose:如果关闭该面板，将webviewPanel设置为undefined
            webViewPanel.onDidDispose(()=>{
            webViewPanel=undefined
            })
            return webViewPanel
            break
        case "Account":
            return accountWebView(context,viewColumn,label)
            break
        default:
            webViewPanel=window.createWebviewPanel('default',label,viewColumn,{retainContextWhenHidden:false,enableScripts:true})
            webViewPanel.webview.html=getIframeHtml(label)
            
            // onDidDispose:如果关闭该面板，将webviewPanel设置为undefined
            webViewPanel.onDidDispose(()=>{
            webViewPanel=undefined
            })
            return webViewPanel
    }
}

// 数字货币行情页面
export function gateioWebView(context:ExtensionContext,viewColumn:ViewColumn,label:string):any{
    // function : 创建网页面板
    // param context : 插件上下文对象
    // param viewColumn : 
    // param label : 网页展示页面的标题
    if (webViewPanel==undefined){
        webViewPanel=window.createWebviewPanel('gateio',label,viewColumn,{retainContextWhenHidden:false,enableScripts:true})
        webViewPanel.webview.html=loadHTML(context,label)
    }else{
        // 如果面板已经存在，重新设置标题
        webViewPanel.title=label
        webViewPanel.reveal()
    }
    // onDidDispose:如果关闭该面板，将webviewPanel设置为undefined
    webViewPanel.onDidDispose(()=>{
        webViewPanel=undefined
    })
    // 接收webView发过来的消息
    webViewPanel.webview.onDidReceiveMessage(message => {
        console.log('插件收到的消息：', message.text);
        switch (message.text){
            case "gateAPI":
                vscodeInput("gateAPI","please input your gateio API KEY")
                break
            case "gateSecret":
                vscodeInput("gateSecret","please input your gateio Secret KEY")
                break
            case "gateBalance":
                vscodeShowManager("gateBalance")
                break
            case "getGateTick":
                vscodeShowManager("getGateTick")
                break
            case "gateOrder":
                vscodeInput("gateOrder","please input order like: BTC_USDT:9500:1 (品种:当前美元价格:-数量 数量前加-为卖出，不加-为买进)")
                break
            case "gateWithdraw":
                vscodeInput("gateWithdraw","input Your address")
                break
        }
    }, undefined, context.subscriptions)
    return webViewPanel
}

export function huobiWebView(context:ExtensionContext,viewColumn:ViewColumn,label:string):any{
    // function : 创建网页面板
    // param context : 插件上下文对象
    // param viewColumn : 
    // param label : 网页展示页面的标题
    if (webViewPanel==undefined){
        webViewPanel=window.createWebviewPanel('huobi',label,viewColumn,{retainContextWhenHidden:false,enableScripts:true})
        webViewPanel.webview.html=loadHTML(context,label)
    }else{
        // 如果面板已经存在，重新设置标题
        webViewPanel.title=label
        webViewPanel.reveal()
    }
    // onDidDispose:如果关闭该面板，将webviewPanel设置为undefined
    webViewPanel.onDidDispose(()=>{
        webViewPanel=undefined
    })
    // 接收webView发过来的消息
    webViewPanel.webview.onDidReceiveMessage(message => {
        console.log('插件收到的消息：', message.text);
        switch (message.text){
            case "huobiAPI":
                vscodeInput("huobiAPI","please input your huobi API KEY")
                break
            case "huobiSecret":
                vscodeInput("huobiSecret","please input your huobi Secret KEY")
                break
            case "huobiBalance":
                vscodeShowManager("huobiBalance")
                break
            case "getHuobiTick":
                vscodeShowManager("getHuobiTick")
                break
            case "huobiOrder":
                vscodeInput("huobiOrder","please input order like: BTC_USDT:9500:1 (品种:当前美元价格:-数量 数量前加-为卖出，不加-为买进)")
                break
        }
    }, undefined, context.subscriptions)
    return webViewPanel
}

// 股票行情界面
export function stockWebView(context:ExtensionContext,viewColumn:ViewColumn,label:string):any{
    // function : 创建股票的webview
    // param context : 插件上下文对象
    // param viewColumn : 
    // param label : 网页展示页面的标题
    if (webViewPanel==undefined){
        webViewPanel=window.createWebviewPanel('stock',label,viewColumn,{retainContextWhenHidden:false,enableScripts:true})
        webViewPanel.webview.html=loadHTML(context,label)
    }else{
        // 如果面板已经存在，重新设置标题
        webViewPanel.title=label
        webViewPanel.reveal()
    }
    // onDidDispose:如果关闭该面板，将webviewPanel设置为undefined
    webViewPanel.onDidDispose(()=>{
        webViewPanel=undefined
    })
    // 接收webView发过来的消息
    webViewPanel.webview.onDidReceiveMessage(message => {
        console.log('插件收到的消息：', message.text);
        switch (message.text){
            case "AStockDay":
                // 请求股票的一天行情数据
                break
            case "AStockNews":
                // 请求相关的新闻内容
                break
        }
    }, undefined, context.subscriptions)
    return webViewPanel
}

// 用户账户界面
export function accountWebView(context:ExtensionContext,viewColumn:ViewColumn,label:string):any{
    // function : 创建网页面板
    // param context : 插件上下文对象
    // param viewColumn : 
    // param label : 网页展示页面的标题
    if (webViewPanel==undefined){
        webViewPanel=window.createWebviewPanel('account',label,viewColumn,{retainContextWhenHidden:false,enableScripts:true})
        webViewPanel.webview.html=loadHTML(context,label)
    }else{
        // 如果面板已经存在，重新设置标题
        webViewPanel.title=label
        webViewPanel.reveal()
    }
    // onDidDispose:如果关闭该面板，将webviewPanel设置为undefined
    webViewPanel.onDidDispose(()=>{
        webViewPanel=undefined
    })
    // 接收webView发过来的消息
    webViewPanel.webview.onDidReceiveMessage(message => {
        console.log('插件收到的消息：', message.text);
        
    }, undefined, context.subscriptions)
    return webViewPanel
}


// vscode社区界面

// hasaki-quant社区界面
