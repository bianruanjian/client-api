---
title: setData
layout: components
footer: false
date: 2018-09-21 15:40:52
tags:
---

setData 用于更新 store 中的值，并检查重绘视图

## 示例

```ts
// key 为普通字符串
setData({
    'foo': 'foo'
);

// key 为表达式--对象路径
setData({
    'foo.a': 'foo'
);

// key 为表达式--数组对象路径
setData({
    'foo[0].a': 'foo'
);

```

## 属性

| 名称 | 说明 | 值类型 | 默认值 | 是否必填 |
| ---- | ---- | ------ | ------ | -------- |
| data | 数据 | Object |        | 是       |

**注意：**

1. setData 默认存储到全局数据对象 global.store；
2. data 为 json 格式数据，以 key: value 的形式表示；
3. data 中的 key 可以以数据路径的形式给出，支持改变数组中的某一项或对象的某个属性，如 array[2].foo.bar，并且不需要在 store 中预先定义。
