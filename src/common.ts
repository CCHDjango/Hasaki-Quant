/*
hasaki - quant plugin common fucntion
*/
let fs=require('fs')
import {workspace} from 'vscode'
import {Log} from './log'

let log=new Log()
let date=new Date()

export function formatTime():string{
    // function : 返回当前的时间 格式 : 2020-1-31 00:00:00
    let tamp1:string=date.getFullYear().toString()+"-"+(date.getMonth()+1).toString()+"-"+date.getDate().toString()
    let tamp2:string=date.getHours().toString()+":"+date.getMinutes().toString()+":"+date.getSeconds().toString()
    return tamp1+" "+tamp2
}

export function rootPath():string{
    // function : 返回根目录的路径
    if (workspace.workspaceFolders!=undefined){
        return workspace.workspaceFolders[0].uri.fsPath
    }else{
        log.printError("无法获取当前目录的路径")
        log.printError("Can`t recognize your project path")
        return ""
    }
}

export function readHTML(path:string):string{
    // function : load hrml file
    // param path : file absolute path
    let html:string=fs.readFileSync(path,'utf-8').toString()
    return html
}

export function deleteFile(path:string):void{
    // function : 删除文件
    // param path : 文件路径  示例：C:/xxx/hasaki.txt
    fs.unlink(path,(err:any)=>{
        if (err){
            return log.printError(err)
        }
    })
}

export function deleteDir(path:string):void{
    // function : remove dir  删除目录
    // param path : 目录路径  C:/xxx/hasaki  xxx目录必须存在，删除hasaki目录
    // Notice : if hasaki is not empty ,dir wouldn`t delete如果文件夹里面有东西，目录不会被删除
    fs.rmdir(path,(err:any)=>{
        if (err){
            return log.printError(err)
        }
    })
}

export function createDir(path:string):void{
    // function : 创建目录
    // param path : 文件目录位置 C:/xxx/hasaki  xxx目录必须存在
    fs.mkdir(path,function(err:any){
        if (err) {
            return log.printError(err);
        }
     })
}

export function readJson(path:string):any{
    // function : 读取json文件，并返回文件句柄
    let jsonFile=require(path)
    return jsonFile
}

export function writeJson(path:string,content:any,type?:string):void{
    // function : 写入本地json文件，追加内容自动分行
    // param path : 文件路径
    // param content : 写入内容
    // param type : 写入类型，参数为a追加写入，参数w覆盖写入，默认为追加写入
    if (type && type=='a'){
        fs.writeFile(path, JSON.stringify(content) , { 'flag': 'a' }, function(err:any):void {
            if (err) {
                log.printError(err)
                throw err;
            }
        })
    }else{
        fs.writeFile(path, JSON.stringify(content) , { 'flag': 'w' }, function(err:any):void {
            if (err) {
                log.printError(err)
                throw err;
            }
        })
    }
    console.log("write JSON file success : ",path)
}

export function readTxt(path:string):any{
    // function : 读取txt文本文件，并返回文件句柄
    let txt=require(path)
    return txt
}

export function writeTxt(path:string,content:any,type?:string):void{
    // function : 写入txt文本文件
    if (type=="a" && type){
        fs.writeFile(path, content , { 'flag': 'a' }, function(err:any):void {
            if (err) {
                log.printError(err)
                throw err;
            }
        })
    }else{
        fs.writeFile(path, content , { 'flag': 'w' }, function(err:any):void {
            if (err) {
                log.printError(err)
                throw err;
            }
        })
    }
    log.print("write TXT file success : "+path)
}

export function readCSV(path:string):any{
    // function : 读取本地csv文件
    // return : 返回的数据类型 {[{...},{...},...]}
    let jsonData:any={"data":[{}]}
    fs.readFile(path,function(err:any,data:any){
        if (err){
            log.printError("读取csv数据报错 : "+err)
        }

        data=data.toString().split("\n")
        let keyList:any = data[0].split(",")
        for (let i of data){
            
        }
    })
    return jsonData
}

export function writeCSV(path:string,content:any,type?:string):void{
    // function : 写入csv文件
    // param type : 写入方式，w是覆盖写入，a是追加写入
    if (type=="a" && type){
        fs.writeFile(path, content , { 'flag': 'a' }, function(err:any):void {
            if (err) {
                log.printError(err)
                throw err;
            }
        })
    }else{
        fs.writeFile(path, content , { 'flag': 'w' }, function(err:any):void {
            if (err) {
                log.printError(err)
                throw err;
            }
        })
    }
    log.print("write CSV file success : "+path)
}

export function sleep(second:number,block?:boolean):void{
    // function : 自封装的睡眠函数,非异步
    // param : 睡眠的秒数
    // param : 是否是异步模式
    if (block){
        setTimeout(function(msg:any){},second*1000)
    }else{
        let d=second*1000
        for(var t = Date.now();Date.now() - t <= d;);
    }
    
}