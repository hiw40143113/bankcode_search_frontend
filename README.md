# Bankcode-search

## 簡介

本專案是一個結合 Django 和 React 前端技術的 Web 應用，旨在提供使用者可以方便查詢臺灣銀行代碼。因本專案架構為前後端分離，需搭配後端專案一起使用。

後端 Django repo:`https://github.com/hiw40143113/bankcode_search_backend`

## 目錄

- [Bankcode-search](#Bankcode-search)
  - [簡介](#簡介)
  - [目錄](#目錄)
  - [技術棧](#技術棧)
  - [功能](#功能)
  - [安裝與運行](#安裝與運行)
    - [先決條件](#先決條件)
    - [安裝步驟](#安裝步驟)
  - [使用範例](#使用範例)
  - [作者資訊](#作者資訊)

## 技術棧

- React
- axios

## 功能

- 使用者可搜尋或選擇銀行及分行名稱產生分行詳細資訊
- 詳細資訊有複製代碼或複製網址按鈕提供使用者快速紀錄

## 安裝與運行

### 先決條件

- Node.js (14.x 或更高)
- 已將本專案 Django 後端設置完畢並運行

### 安裝步驟

1. 使用 `npm install` 安裝本專案運行時所需套件
2. 設置環境變數：

   在專案根目錄中創建一個 `.env` 文件，並依照 `.env.example` 添加對應的本機端內容

## 使用範例

你可以使用 `npm start` 指令運行專案並在瀏覽器中訪問 `http://127.0.0.1:3000/` 來查看應用並進行操作。

成品展示網址:`https://main--keen-taiyaki-4d7744.netlify.app/

## 作者資訊

- 吳軒逸  
  [GitHub](https://github.com/hiw40143113)
