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
 * @Date: 2020-11-16 09:15:27
 * @LastEditTime: 2020-11-24 19:03:47
 * @LastEditors: guanhaimin
 * @Description: 
 * @FilePath: \code-obfuscator-demo\code-obfuscator\obfuscator.js
 * @
 */
const fs = require("fs");
const path = require("path");
const _ = require("lodash");
const JavaScriptObfuscator = require('javascript-obfuscator');


const obfuscateFile = function (sourceCode, config) {
    var obfuscationResult = JavaScriptObfuscator.obfuscate(sourceCode, 
        config
    );

    // console.log(obfuscationResult.getObfuscatedCode());
    // console.log(obfuscationResult.getSourceMap());
    return obfuscationResult.getObfuscatedCode();
}

exports.obfuscateFolder = function (folderPath, outputPath, obfuscateConfig, ignoreFolders) {
    const dirs = fs.readdirSync(folderPath);
    _.forEach(dirs, function(dir) {
        if (ignoreFolders.indexOf(dir) === -1) {
            const tempdir = path.join(folderPath, dir);
            const targetPath = path.join(outputPath, dir);
            if (fs.statSync(tempdir).isDirectory()) {
                fs.mkdirSync(targetPath);
                exports.obfuscateFolder(tempdir, targetPath, obfuscateConfig, ignoreFolders);
            } else {
                if (dir.endsWith(".js")) {
                    console.log(`obfuscate file ${tempdir}`);
                    const code = obfuscateFile(fs.readFileSync(tempdir).toString(), obfuscateConfig);
                    fs.writeFileSync(targetPath, code);
                } else {
                    console.log(`copy file ${tempdir}`);
                    fs.writeFileSync(targetPath, '')
                    fs.copyFileSync(tempdir, targetPath);
                    // fs.writeFileSync(targetPath, fs.readFileSync(tempdir).toString())
                }
            }
        }
    });
}

// ignoreFolders = ["test", "node_modules", "dist", ".git", ".idea", ".vscode", ".DS_Store", ".gitignore"]
// const sourceDir = path.normalize("C:\\code\\spider-man-server");
// const outputDir = path.join(sourceDir, "\\dist");
// if (fs.existsSync(outputDir)) {
//     // fs.rmdirSync(outputDir);
//     // fs.mkdirSync(outputDir);
// } else {
//     fs.mkdirSync(outputDir);
// }
// obfuscateFolder(sourceDir, outputDir);