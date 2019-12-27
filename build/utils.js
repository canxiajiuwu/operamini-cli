'use strict';
const path = require('path');
const config = require('../config');
const packageConfig = require('../package.json');
const webp=require('webp-converter');
const fs = require('fs');
var glob = require('glob');          //node的glob模块允许你使用 *等符号, 来写一个glob规则,像在shell里一样,获取匹配对应规则的文件.
const env = config.build[process.env.env_config+'Env'];


exports.assetsPath = function (_path,type) {
  const assetsSubDirectory = process.env.NODE_ENV === 'production'
    ? config.build.assetsSubDirectory
    : config.dev.assetsSubDirectory

  return path.posix.join(assetsSubDirectory, _path)
}

exports.createNotifierCallback = () => {
    const notifier = require('node-notifier')

    return (severity, errors) => {
        if (severity !== 'error') return

        const error = errors[0]
        const filename = error.file && error.file.split('!').pop()

        notifier.notify({
            title: packageConfig.name,
            message: severity + ': ' + error.name,
            subtitle: filename || '',
            icon: path.join(__dirname, 'logo.png')
        })
    }
}

//获取多级的入口文件
exports.getMultiEntry = function (globPath) {
    var entries = {},
        basename, tmp, pathname;

    glob.sync(globPath).forEach(function (entry) {
        basename = path.basename(entry, path.extname(entry));
        tmp = entry.split('/').splice(-4);

        var pathsrc = tmp[0]+'/'+tmp[1];
        if( tmp[0] == 'src' ){
            pathsrc = tmp[1];
        }
        //console.log(pathsrc)
        pathname = pathsrc + '/' + basename; // 正确输出js和html的路径
        entries[pathname] = entry;

        //console.log(pathname+'-----------'+entry);

    });
    return entries;

}

//获取多级的入口文件
exports.getSkeletonEntry = function (globPath) {
  var entries = {},
    basename, tmp, pathname;


  glob.sync(globPath).forEach(function (entry) {

    entries[entry] = entry;

    //console.log(pathname+'-----------'+entry);

  });
  return entries;

}

//获取所有图片文件
exports.getDistImg = function (filePath) {
//根据文件路径读取文件，返回文件列表
    fileDisplay(filePath);
};

function fileDisplay(filePath) {
    fs.readdir(filePath,function(err,files){
        if(err){
            console.warn(err)
        }else{
            //遍历读取到的文件列表
            files.forEach(function(filename){
                //获取当前文件的绝对路径
                var filedir = path.join(filePath, filename);
                //根据文件路径获取文件信息，返回一个fs.Stats对象
                fs.stat(filedir,function(eror, stats){
                    if(eror){
                        console.warn('获取文件stats失败');
                    }else{
                        var isFile = stats.isFile();//是文件
                        var isDir = stats.isDirectory();//是文件夹
                        if(isFile && filedir.indexOf('.webp') === -1){
                            webp.cwebp(filedir,filedir+".webp","-q 60",function(status,error)
                            {
                                // console.log(status,error);
                            });
                        }
                        if(isDir){
                            fileDisplay(filedir);//递归，如果是文件夹，就继续遍历该文件夹下面的文件
                        }
                    }
                })
            });
        }
    });
}
