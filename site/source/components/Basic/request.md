---
title: request
layout: components
footer: false
date: 2018-09-14 15:10:52
tags:
---

发起 HTTP 网络请求， request(Object object)


## 属性

| 名称   | 说明     | 值类型   | 默认值 | 是否必填 |
| ------ | -------- | -------- | ------ | -------- |
| url    | 地址     | string   |        | 是       |
| method | 方法     | string   | GET    |          |
| data   | 请求数据 | object   |        |          |
| done   | 成功回调 | function |        |          |
| fail   | 失败回调 | function |        |          |


## object.method 的可选值

| 值      | 说明              |
| ------- | ----------------- |
| GET     | HTTP 请求 GET     |
| POST    | HTTP 请求 POST    |
| PUT     | HTTP 请求 PUT     |
| DELETE  | HTTP 请求 DELETE  |
| HEAD    | HTTP 请求 HEAD    |
| OPTIONS | HTTP 请求 OPTIONS |