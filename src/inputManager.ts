/*
vscode input api manager
*/

import {window} from 'vscode'
import {Log} from './log'
import {writeJson,rootPath,readJson} from './common'
import { gate } from './gateio'

let root_path:string=rootPath()
let log=new Log()

export function vscodeInput(module:string,tip:string,otherParam?:string){
    // function : 在vscode弹出输入框，并接收用户输入，返回用户输入的字符串内容
    window.showInputBox({                           // 这个对象中所有参数都是可选参数
        password:false,                             // 输入内容是否是密码
        ignoreFocusOut:true,                        // 默认false，设置为true时鼠标点击别的地方输入框不会消失
        placeHolder:tip,                            // 在输入框内的提示信息
        prompt:"API KEY只需输入一次并保存在本地"     // 输入框下面的提示
    }).then(function(value){
        if (value==undefined || value.trim()=== ""){
            console.log('+++++++',value)
            return ""
        }else{
            console.log(value)
            switch (module){
                case "gateAPI":
                    setGateAPI(value)
                    break
                case "gateSecret":
                    setGateSecret(value)
                    break
                case "gateOrder":
                    sendOrder(value)
                    break
                case "huobiAPI":
                    setHuobiAPI(value)
                    break
                case "huobiSecret":
                    setHuobiSecret(value)
                    break
                case "AStockAPI":
                    break

            }
        }
    })
}

function setGateAPI(api:string):void{
    // function : 保存gateio api key 在本地的config.json文件内
    let root_path:string=rootPath()
    if (root_path.length<1){
        return
    }else{
        let config:any=readJson(root_path+"/config.json")
        config.gate.api=api
        writeJson(root_path+"/config.json",config,"w")
    }
}

function setGateSecret(secret:string):void{
    // function : 保存gateio api key 在本地的config.json文件内
    let root_path:string=rootPath()
    if (root_path.length<1){
        return
    }else{
        let config:any=readJson(root_path+"/config.json")
        config.gate.secret=secret
        writeJson(root_path+"/config.json",config,"w")
    }
}

function sendOrder(order:string):void{
    // function : gate下单函数
    let symbol:string=order.split(":")[0].toUpperCase()
    let price:string=order.split(":")[1]
    let volume:string=order.split(":")[2]
    let tampJson=readJson(root_path+"/config.json").gate
    let api:string=tampJson.api
    let secret:string=tampJson.secret
    gate.gateKEY=api
    gate.gateSECRET=secret
    if (volume.indexOf("-")==-1){
        // 多单
        gate.buy(symbol,price,volume,function(res:any){
            log.print("buy order return : "+res.message)
        })
    }else{
        // 卖出
        gate.sell(symbol,price,volume.substr(1),function(res:any){
            log.print("sell order return : "+res.message)
        })
    }
}

/*--------------------------火币相关的方法-------------------------*/
export function setHuobiAPI(api:string):void{
    // function : 写入Huobi api到本地config.json
    let root_path:string=rootPath()
    if (root_path.length<1){
        return
    }else{
        let config:any=readJson(root_path+"/config.json")
        config.huobi.api=api
        writeJson(root_path+"/config.json",config,"w")
    }
}

export function setHuobiSecret(secret:string):void{
    // function : 保存huobi api key 在本地的config.json文件内
    let root_path:string=rootPath()
    if (root_path.length<1){
        return
    }else{
        let config:any=readJson(root_path+"/config.json")
        config.huobi.secret=secret
        writeJson(root_path+"/config.json",config,"w")
    }
}