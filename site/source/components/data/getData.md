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
// 数据
const data = {
    foo: {
        a: 'foo'
    },
    bar: [
        {
            a: 'bar'
        }
    ]
}

// 获取 data 对象中的 foo 的值
getData('foo'); // { a: 'foo'}

// 获取 data 对象中的 foo 对象下的 a 的值
getData('foo.a'); // 'foo'

// 获取 data 对象中的 bar 数据下第一个对象的 a 的值
getData('bar[0].a'); // 'bar'

```

## 属性

| 名称 | 说明 | 值类型 | 默认值 | 是否必填 |
| ---- | ---- | ------ | ------ | -------- |
| path | 数据路径 | string |        | 是       |

**注意：**

1. path 可以以数据路径的形式给出，支持获取数组中的某一项或对象的某个属性，如 `array[2].foo.bar`。
