/*
hasaki-quant show manager
*/
import {Log} from './log'
import {gate} from './gateio'
import {readJson,rootPath} from './common'

let log=new Log
let root_path:string = rootPath()

export function vscodeShowManager(module:string,otherParam?:string):void{
    // function : 一系列动作得结果展示
    switch (module){
        case "gateBalance":
            getGateBalance()
            break
        case "gateTick":
            if (otherParam){
                getGateTick(otherParam)
            }
            break
        case "huobiBalance":
            break
        default:
            break
    }
}

function getGateBalance():void{
    // function : show amount balance
    let tampJson=readJson(root_path+"/config.json").gate
    let api:string=tampJson.api
    let secret:string=tampJson.secret
    if (api.length>10 && secret.length>10){
        // 简单检测一下api key是否正确
        gate.gateKEY=api
        gate.gateSECRET=secret
        gate.getBalances(function(res:any){
            log.print("账户余额 BTC : "+res.available.BTC+",ETH : "+res.available.ETH+",EOS : "+res.available.EOS+",USDT : "+res.available.USDT)
        })
    }else{
        log.printError("gate api key not right,please check up your api key")
    }
}

function getGateTick(param:string):void{
    // function : 获取gate得tick行情，一条
    // param symbol : 参考示例 eos_usdt
    gate.getTicker(param,function(res:any){

    })
}