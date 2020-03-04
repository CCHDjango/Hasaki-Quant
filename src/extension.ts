// 这个vscode包含了vscode所有接口
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import {InitProject} from './initProject'
import {createWebView} from './webView'
import {QuoteViewProvider,AccountViewProvider,CommunityViewProvider,StrategyViewProvider} from './treeViewProvider'

let init:any = new(InitProject)
// this method is called when your extension is activated
// 插件第一次启动的时候会被调用
export function activate(context: vscode.ExtensionContext) {
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "hasaki-quant" is now active!');
	
	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('extension.hasaki', () => {
		vscode.window.showInformationMessage('欢迎使用hasaki quant插件!');
		init.init()
	});
	context.subscriptions.push(disposable);
	
	// 	查看最新的数字货币的现货行情数据,并展示到代码编辑界面
	let requestQuote = vscode.commands.registerCommand('extension.requestQuote',(label)=>{
		let webView = createWebView(context,vscode.ViewColumn.Active,label)
		context.subscriptions.push(webView)
	})
	context.subscriptions.push(requestQuote)

	QuoteViewProvider.quoteTreeList()
	AccountViewProvider.accountTreeList()
	CommunityViewProvider.communityTreeList()
	StrategyViewProvider.strategyTreeList()
	context.subscriptions.push(vscode.commands.registerCommand('click',
	function(label){
		vscode.window.showInformationMessage(label)
		let webView = createWebView(context,vscode.ViewColumn.Active,label)
		context.subscriptions.push(webView)
	}))
}

// 插件被关闭的时候被调用
export function deactivate() {}
