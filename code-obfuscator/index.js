/*
 *  ┌─────────────────────────────────────────────────────────────┐
 *  │┌───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┐│
 *  ││Esc│!1 │@2 │#3 │$4 │%5 │^6 │&7 │*8 │(9 │)0 │_- │+= │|\ │`~ ││
 *  │├───┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴───┤│
 *  ││ Tab │ Q │ W │ E │ R │ T │ Y │ U │ I │ O │ P │{[ │}] │ BS  ││
 *  │├─────┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴─────┤│
 *  ││ Ctrl │ A │ S │ D │ F │ G │ H │ J │ K │ L │: ;│" '│ Enter  ││
 *  │├──────┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴────┬───┤│
 *  ││ Shift  │ Z │ X │ C │ V │ B │ N │ M │< ,│> .│? /│Shift │Fn ││
 *  │└─────┬──┴┬──┴──┬┴───┴───┴───┴───┴───┴──┬┴───┴┬──┴┬─────┴───┘│
 *  │      │Fn │ Alt │         Space         │ Alt │Win│   HHKB   │
 *  │      └───┴─────┴───────────────────────┴─────┴───┘          │
 *  └─────────────────────────────────────────────────────────────┘
 * 
 * @Author: guanhaimin
 * @Date: 2020-11-16 13:58:52
 * @LastEditTime: 2020-11-24 18:55:58
 * @LastEditors: guanhaimin
 * @Description: 
 * @FilePath: \code-obfuscator-demo\code-obfuscator\index.js
 * @
 */

const fs = require("fs");
const path = require("path");
const _ = require('lodash');
const obfuscate = require('./obfuscator');

const DEFAULT_CONFIG_FILENAME = "obfuscate.config.js";
const DEFAULT_IGNORE_FOLDERS = ["code-obfuscator", "obfuscate.config.js", ".DS_Store", "test", "node_modules", ".idea", ".vscode", ".gitignore", ".git"]
DEFAULT_IGNORE_FOLDERS.push(DEFAULT_CONFIG_FILENAME);

const deleteFolder = function (folderPath) {
    const dirs = fs.readdirSync(folderPath);
    _.forEach(dirs, function (dir) {
        const temp = path.join(folderPath, dir);
        if (fs.statSync(temp).isFile()) {
            fs.unlinkSync(temp);
        } else {
            deleteFolder(temp);
        }
    });
    fs.rmdirSync(folderPath);
}

const currentDir = path.resolve();
const configFile = path.join(currentDir, DEFAULT_CONFIG_FILENAME);
console.log(configFile);
const configObj = require(configFile);
console.log(configObj);
const outputDir = path.join(path.resolve(), configObj["outputDir"]);

if (fs.existsSync(outputDir)) {
    deleteFolder(outputDir);
    fs.mkdirSync(outputDir);
} else {
    fs.mkdirSync(outputDir);
}
configObj["ignoreFolders"] = _.concat(configObj["ignoreFolders"], DEFAULT_IGNORE_FOLDERS);
configObj["ignoreFolders"].push(path.basename(configFile))
configObj["ignoreFolders"].push(configObj['outputDir'])
obfuscate.obfuscateFolder(currentDir, outputDir, configObj['obfuscateConfig'], configObj["ignoreFolders"]);
