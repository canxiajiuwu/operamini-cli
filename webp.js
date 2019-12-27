const fs = require('fs');
const { resolve } = require('path');
let utils = require('./build/utils');

//读取dist文件夹里的所有图片转化成webp
//static文件夹的图片转化
let staticFilePath = resolve('./static/img/');
utils.getDistImg(staticFilePath); // 获得入口js文件
//assets/img文件夹的图片转化
let assetsImgFilePath = resolve('./src/assets/img/');
utils.getDistImg(assetsImgFilePath); // 获得入口js文件
