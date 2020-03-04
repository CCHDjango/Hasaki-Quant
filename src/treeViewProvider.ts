/*
主界面Tree View的组件内容
最后修改时间：2020-1-22
*/
import {TreeItem,TreeItemCollapsibleState,TreeDataProvider,Uri,window} from 'vscode'

export class TreeNode extends TreeItem{
    constructor(
        public readonly label:string,
        public readonly collapsibleState:TreeItemCollapsibleState.None
    ){
        super(label,collapsibleState)
    }
    // 为每项添加事件命令
    command={
        title:this.label,
        command:"click",
        tooltip:this.label,
        arguments:[this.label]
    }
}

// 行情页面的tree view数据
export class QuoteViewProvider implements TreeDataProvider<TreeNode>{
    onDidChangeTreeData?:import("vscode").Event<TreeNode | null | undefined> | undefined

    getTreeItem(element:TreeNode):TreeItem | Thenable<TreeItem>{
        return element
    }

    getChildren(element?:TreeNode | undefined):import("vscode").ProviderResult<TreeNode[]>{
        return ["Gateio","Huobi","商品期货","股票"].map(item=>new TreeNode(item as string,
            TreeItemCollapsibleState.None))
    }

    public static quoteTreeList(){
        // 实例化TreeViewProvier
        const treeViewProvider = new QuoteViewProvider()
        // 把上面一堆的名字列表和命令绑在这个SW3的tree view节点下
        window.registerTreeDataProvider('SW3',treeViewProvider)
        
    }
}

// 社区页面的tree view 数据
export class CommunityViewProvider implements TreeDataProvider<TreeNode>{
    onDidChangeTreeData?:import("vscode").Event<TreeNode | null | undefined> | undefined

    getTreeItem(element:TreeNode):TreeItem | Thenable<TreeItem>{
        return element
    }

    getChildren(element?:TreeNode | undefined):import("vscode").ProviderResult<TreeNode[]>{
        return ["vscode社区","数字货币社区","股票社区","Hasaki社区"].map(item=>new TreeNode(item as string,
            TreeItemCollapsibleState.None))
    }

    public static communityTreeList(){
        // 实例化TreeViewProvier
        const treeViewProvider = new CommunityViewProvider()
        window.registerTreeDataProvider('SW4',treeViewProvider)
        
    }
}

// 策略界面的tree view
export class StrategyViewProvider implements TreeDataProvider<TreeNode>{
    onDidChangeTreeData?:import("vscode").Event<TreeNode | null | undefined> | undefined

    getTreeItem(element:TreeNode):TreeItem | Thenable<TreeItem>{
        return element
    }

    getChildren(element?:TreeNode | undefined):import("vscode").ProviderResult<TreeNode[]>{
        return ["初始化项目","初始化ts策略模板","初始化py策略模板","初始化go策略模板","初始化js策略模板"].map(item=>new TreeNode(item as string,
            TreeItemCollapsibleState.None))
    }

    public static strategyTreeList(){
        // 实例化TreeViewProvier
        const treeViewProvider = new StrategyViewProvider()
        window.registerTreeDataProvider('SW1',treeViewProvider)
        
    }
}

// 账户信息的tree view数据
export class AccountViewProvider implements TreeDataProvider<TreeNode>{
    onDidChangeTreeData?:import("vscode").Event<TreeNode | null | undefined> | undefined

    getTreeItem(element:TreeNode):TreeItem | Thenable<TreeItem>{
        return element
    }

    getChildren(element?:TreeNode | undefined):import("vscode").ProviderResult<TreeNode[]>{
        return ["登陆/注册Hasaki","策略运行状态","Account"].map(item=>new TreeNode(item as string,
            TreeItemCollapsibleState.None))
    }

    public static accountTreeList(){
        // 实例化TreeViewProvier
        const treeViewProvider = new AccountViewProvider()
        window.registerTreeDataProvider('SW2',treeViewProvider)
        
    }
}