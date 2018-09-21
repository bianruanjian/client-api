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
// 直接设置值
setData({
    'foo': 'foo'
);

// 设置表达式-对象
setData({
    'foo.a': 'foo'
);

// 设置表达式-数组
setData({
    'foo[0].a': 'foo'
);

```

## 属性

| 名称 | 说明 | 值类型 | 默认值 | 是否必填 |
| ---- | ---- | ------ | ------ | -------- |
| data | 数据 | Object |        | 是       |

**注意：**

1. data 为 json 格式数据；
2. data 中的 key 支持表达式，如果表达中式指定的对象不存在，会默认创建；
3. setData 默认存储到全局数据对象 global.store。

