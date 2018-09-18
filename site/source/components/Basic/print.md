---
title: print
layout: components
footer: false
date: 2018-09-17 15:10:52
tags:
---

基于 javascript 的 console 封装的打印组件

## 示例

```javascript
print.log('hello,world');  
print.log('hello, ${world}');//字符串模板  
```

## 方法

| 名称  | 说明 | 参数    |
| ----- | ---- | ------- |
| log   | 日志 | content |
| info  | 提示 | content |
| warn  | 警告 | content |
| error | 错误 | content |

## 参数

| 名称    | 说明     | 值类型 | 默认值 | 是否必填 |
| ------- | -------- | ------ | ------ | -------- |
| content | 打印内容 | any    |        | 否       |
