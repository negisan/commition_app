# Commission App

<br/>

> 稼働中のアプリケーションを確認する：[こちら](https://commission-app.netlify.app)

<br/>

サンプルユーザー：<br/>
email: 'string@email.com'<br/>
password: 'string'<br/>

<br/>


新規ユーザー登録時はユーザー名とメールアドレスにUnique制限があります。<br/>
その他のサンプルユーザー：[こちら](https://github.com/waynejsk/commition_app/blob/main/backend/src/seeders/20211031233803-test-users.js)

<br/>

## 目次

 - [ローカルで動かすには](#ローカルで動かすには)
    - [バックエンドのセットアップ](#バックエンドのセットアップ)
    - [フロントのセットアップ](#フロントのセットアップ)


<br/>
<br/>

# ローカルで動かすには

<br/>

## バックエンドのセットアップ

<br/>

### .envファイルを作成し環境変数の設定

JWT_SECRET='任意の英数字'<br/>
STRIPE_SECRET_KEY='stripeのシークレットキー' &nbsp; stripeDoc：[https://stripe.com/docs/keys](https://stripe.com/docs/keys)<br/>

### DBの準備

#### OSにDBがインストールされているか確認

Mysqlの動作確認 ＊ubuntu の cli での一例です。パス等は環境によって違います。

```
// インストールされているか確認
$ mysql --version

// MySqlの状態を確認
$ sudo /etc/init.d/mysql start

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

### サーバーの起動

```
$ yarn run start
```

<br/>
<br/>

## フロントのセットアップ

<br/>

バックエンドを起動しているのとは別の新しいターミナルを開く

### 定数を変更

STRIPE_PUBLISHABLE_KEY='stripeのパブリックキー' &nbsp; stripeDoc：[https://stripe.com/docs/keys](https://stripe.com/docs/keys)<br/>
BASE_API_URL='http://localhost:4000' &nbsp; ＊backend/server.jsで指定したポート<br/>

### ライブラリのインストール

```
$ cd client/
$ yarn install
```

### アプリケーションの起動

```
$ yarn run start
```