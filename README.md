# Commission App

<br/>

***稼働中のアプリケーションを確認する：*** [こちら](https://commission-app.netlify.app)

<br/>

**サンプルユーザー：**<br/>
email: 'string@email.com'<br/>
password: 'string'<br/>

<br/>


新規ユーザー登録時はユーザー名とメールアドレスにUnique制限があります。<br/>
その他のサンプルユーザー：[こちら](https://github.com/waynejsk/commition_app/blob/main/backend/src/seeders/20211031233803-test-users.js)

<br/>

## 目次

 - [コア機能](#コア機能)
    - [デモ](#デモ)
    - [概要](#概要)
    - [技術スタック](#技術スタック)
    - [使い方](#使い方)
 - [その他](#その他)
 - [ローカルで動かすには](#ローカルで動かすには)
    - [バックエンドのセットアップ](#バックエンドのセットアップ)
    - [フロントのセットアップ](#フロントのセットアップ)



<br/>
<br/>

## コア機能

#### デモ
<a href="https://www.youtube.com/watch?v=lECa6--BVzA">
 <img src="https://github.com/negisan/commition_app/blob/image/commission-app-demomp4%20-%E5%86%8D%E7%94%9F%E3%82%B5%E3%83%A0%E3%83%8D.png" name="demo">
</a>
 <br/>

#### 概要

skebの習作です。<br/>
個人間の仕事の受注や発注の際に発生する金銭の未払い等の不安を、<br/>
プラットフォームが仲介役となることにより解決する。という機能がコアとなっています。<br/>


#### 技術スタック
1. SPA(REACT)+RESTAPI(nodejs)の構成
2. DBはMySQL、ORMはsequelizeを使用
3. Reactの状態管理にはReactHooksとContnextを利用


#### 使い方

クライアント側
1. Userにリクエストを先払いで申請
2. クリエイターが承認するまではキャンセルすることができます。（支払い済みの料金は自身の売り上げに加算されます）
3. クリエイターが承諾した場合、納品をお待ちください
4. クリエイターが納品したら確認したのちお礼のコメントを送信しましょう。

クリエイター側
1. 自身のリクエスト申請ページのURLを張るなどしてリクエストを募集する。
2. リクエストが届いたら承認orことわるを選択
3. 納品してクライアントの確認を待つ
4. 取引が完了したら売り上げに料金が加算されます
<br/>

<img src="https://github.com/waynejsk/commition_app/blob/image/%E3%82%B3%E3%82%A2%E6%A9%9F%E8%83%BD%E6%A6%82%E8%A6%81.jpg" name="ExplainCoreFunction">
<br/>


<br/>
<br/>

## その他

#### レスポンシブ対応

<details open>
 <summary>画像を開く</summary>
 <img src="https://github.com/waynejsk/commition_app/blob/image/resposive1.jpg" name="responsive1">
 <img src="https://github.com/waynejsk/commition_app/blob/image/resposive2.jpg" name="responsive2">
 <img src="https://github.com/waynejsk/commition_app/blob/image/resposive3.jpg" name="responsive3">
</details>

<br/>

#### インフラ構成

<details open>
 <summary>画像を開く</summary>
 <img src="https://github.com/waynejsk/commition_app/blob/image/%E3%82%A4%E3%83%B3%E3%83%95%E3%83%A9%E6%A7%8B%E6%88%90%E5%9B%B3.jpg" name=" Infrastructure Architect" >
 </details>

<br/>

#### テーブルER図

<details open>
 <summary>画像を開く</summary>
 <img src="https://github.com/waynejsk/commition_app/blob/image/%E3%83%86%E3%83%BC%E3%83%96%E3%83%AB%E8%A8%AD%E8%A8%88er%E5%9B%B3.jpg" name="table er" >
 </details>

<br/>



<br/>
<br/>


# ローカルで動かすには

<br/>

## バックエンドのセットアップ

<br/>

#### .envファイルを作成し環境変数の設定

```
JWT_SECRET='任意の英数字'
STRIPE_SECRET_KEY='stripeのシークレットキー'
```

stripeDoc：[https://stripe.com/docs/keys](https://stripe.com/docs/keys)

#### DBの準備

#### OSにDBがインストールされているか確認

Mysqlの動作確認 ＊ubuntu の cli での一例です。パス等は環境によって違います。

```
// インストールされているか確認
$ mysql --version

// MySqlの状態を確認
$ sudo /etc/init.d/mysql status

// MySqlが起動してなければ起動する
$ sudo /etc/init.d/mysql start

// ログインできるか確認
$ mysql -u root
```

#### このアプリケーションでDBを扱えるよう設定
backend/config/config.js の development の username と password が 自分の環境の MySql のユーザー名、パスワードと一致するように設定してください。

#### ライブラリのインストール

```
$ cd backend/
$ yarn install
```

#### sequelize-cliで各種操作

```
$ cd src/

//dbの作成
$ npx sequelize db:drop
$ npx sequelize db:create

// Migrationの実行
$ npx sequelize db:migrate

// ダミーデータの生成
$ npx sequelize db:seed:all
```

#### サーバーの起動

```
// server.jsがあるディレクトリに戻る
$ cd ..
$ yarn run start
```

<br/>
<br/>

## フロントのセットアップ

<br/>

バックエンドを起動しているのとは別の新しいターミナルを開く

#### 定数を変更

**/client/src/helper/constants.ts**を開く

```
STRIPE_PUBLISHABLE_KEY='stripeのパブリックキー'
// backend/server.jsで指定したポート
BASE_API_URL='http://localhost:4000'
```
stripeDoc：[https://stripe.com/docs/keys](https://stripe.com/docs/keys)<br/>


#### ライブラリのインストール

```
$ cd client/
$ yarn install
```

#### アプリケーションの起動

```
$ yarn run start
```
