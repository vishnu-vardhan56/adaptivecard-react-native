import * as vscode from "vscode";
import {INode} from "./model/nodes/INode";
import * as glob from "glob";
import * as path from "path";
import * as fs from "fs";
import { ProjectErrorNode } from "./model/nodes/ProjectErrorNode";
import { CardNode } from "./model/CardNode";
import { AdaptiveCardsMain } from "./adaptiveCards";

export class CardProvider implements vscode.TreeDataProvider<INode> {
    private readonly acm: AdaptiveCardsMain;

    public _onDidChangeTreeData: vscode.EventEmitter<INode | undefined> = new vscode.EventEmitter<INode | undefined>();
    public readonly onDidChangeTreeData: vscode.Event<INode | undefined> = this._onDidChangeTreeData.event;

    constructor(private context: vscode.ExtensionContext,  acm: AdaptiveCardsMain) {
        this.acm = acm;
    }

	refresh(node?: INode): void {

        if(node) {
            this._onDidChangeTreeData.fire(node);
        }

		this._onDidChangeTreeData.fire();
	}

    public async getChildren(element?: INode): Promise<INode[]> {
        console.log("ACSTUDIO - Get Child Nodes");
        if(!element) {
            vscode.window.showInformationMessage("Searching for Adaptive Cards in your workspace");
            return await this.GetAdaptiveCardsInFolder();
        }
        return element.getChildren(this.context);
    }

    public async GetAdaptiveCardsInFolder(): Promise<INode[]> {
        console.log("ACSTUDIO - Searching for Cards");
        const items: INode[] = [];
        let folder = vscode.workspace.rootPath;
        vscode.window.showInformationMessage("Searching for Adaptive Cards in your workspace");
        var files = await glob.sync(folder + "/**/*.json", {});
        var i = 0;
        files.forEach(file => {
            var name = path.basename(file,".json");
            const searchTerm = "adaptivecards.io/schemas/adaptive-card.json";
            var content = fs.readFileSync(file, "utf8");
            if (content.includes(searchTerm)) {
                var node = new CardNode(name,file, i, this.acm);
                items.push(node);
                i++;
            }
        });

        if(items.length === 0) {
            items.push(new ProjectErrorNode("No Cards found","","",0));
        }
        return items;
    }

    public getTreeItem(element: INode): Promise<vscode.TreeItem> | vscode.TreeItem  {
        return element.getTreeItem();
    }

}