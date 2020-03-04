/*
hasaki-quant vscode plugin
init the quant project
在项目下生成来量化工程目录
包括：
usrProject:
|
|---strtegy (catelogue)
|
|---data (catelogue)
|
|---usrlog (catelogue)
|
|---config.json (json file)
*/
import * as vscode from 'vscode';
import {createDir,writeJson} from './common'

export class InitProject{
    path:string = ""
    init():void{
        // 获取当前工作目录
        if (vscode.workspace.workspaceFolders!=undefined){
            this.path = vscode.workspace.workspaceFolders[0].uri.fsPath
            this.createStrategy()
            this.createData()
            this.createConfig()
        }else{
            vscode.window.showInformationMessage("无法获取当前目录的路径")
            vscode.window.showInformationMessage("Can`t recognize your project path")
        }
    }
    
    createStrategy():void{
        // function : 生成策略工程目录
        createDir(this.path+"/strategy")
    }

    createData():void{
        // function : 生成数据保存文件夹
        createDir(this.path+"/data")
    }

    createLog():void{
        // function : 生成用户操作日志目录
        createDir(this.path+"/usrlog")
    }

    createConfig():void{
        // function : 生成用户配置文件
        writeJson(this.path+"/config.json",{
        "gate":{"api":"","secret":""},   // 数字货币gateio交易所
        "huobi":{"api":"","secret":""},  // 数字货币交易所火币网
        "AStock":{"api":"","secret":""}, // A股账号
        "bitmex":{"api":"","secret":""}, // 数字货币期货bitmex交易所
        "biance":{"api":"","secret":""}, // 数字货币币安交易所
        "future":{"api":"","secret":""}  // 国内商品期货账号
        },"w")
    }
}