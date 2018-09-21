---
title: getData
layout: components
footer: false
date: 2018-09-21 16:40:52
tags:
---

getData 用于从 store 中取出数据

## 示例

```ts
// 普通字符串
getData('foo');

// 对象路径
getData('foo.a');

// 数组路径
getData('foo[0].a');

```

## 属性

| 名称 | 说明 | 值类型 | 默认值 | 是否必填 |
| ---- | ---- | ------ | ------ | -------- |
| path | 数据 | string |        | 是       |

**注意：**

1. getData 默认从全局数据对象 global.store 中取值；
2. path 可以以数据路径的形式给出，支持获取数组中的某一项或对象的某个属性，如 array[2].foo.bar。
