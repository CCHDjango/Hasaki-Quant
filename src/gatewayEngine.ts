/*
hasaki-quant 对交易所网关

hasaki-quant -> exchange
*/

import {Log} from './log'

let log = new Log()

export class GatewayEngine{
    init():void{
        log.print("hasaki-quant gateway init")
    }
}