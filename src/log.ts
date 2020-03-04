/*
tasaki的日志模块
*/
import {window} from 'vscode'
import {writeTxt,formatTime,rootPath} from './common'

export class Log{
    print(content:string):void{
        console.log(content)
        window.showInformationMessage(content)
    }

    printError(content:string):void{
        // function : 错误信息打印
        window.showWarningMessage(content)
    }
    
    printLocal(content:string):void{
        // function : 保存到本地的日志,主要是记录用户的操作，方便用户检查操作
        // 格式 : 2020-1-31 10:58:00 info: content
        let root_path:string=rootPath()
        let nowTime:string=formatTime()
        if (root_path.length<2){
            // 没有正确返回工程目录路径的情况
            this.printError("写入本地用户操作日志时，没有获取到本地工程目录的地址，检查是否又初始化本地工程目录")
            return
        }else{
            let content_:string=nowTime+" info: " + content+"\n"
            let path:string=root_path+"/log/userLog.txt"
            writeTxt(path,content_,"a")
        }
        
    }
}
