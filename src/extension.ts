"use strict";
import * as vscode from "vscode";
import {
  toast,
  createIndex,
  createDir,
  createLess,
  createPropType,
  createService,
  createSpmConfig,
  createStore,
  getFileHeaderText,
  createComponentsDir
} from "./libs";

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand(
    "extension.createReactComponent",
    target => {
      // const fileHeaderText = getFileHeaderText();
      const { fsPath } = target;
      vscode.window.showInputBox({ prompt: "请输入组件名称" }).then(
        name => {
          name = (name || "").trim();
          if (!name) {
            return void toast.error("无效的组件名称");
          }
          let componentDir = createDir(fsPath, name);
          if (!componentDir) return;
          createIndex(name, componentDir);
          createPropType(componentDir);
          createLess(name, componentDir);
          createService(componentDir);
          createSpmConfig(componentDir);
          createStore(name, componentDir);
          createComponentsDir(componentDir);
        },
        err => {
          console.log(err);
        }
      );
    }
  );
  context.subscriptions.push(disposable);
}

export function deactivate() { }
