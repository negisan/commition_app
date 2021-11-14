# Commission App

> 稼働中のアプリケーションを確認する：[こちら](https://commission-app.netlify.app)

サンプルユーザー：

  email: 'string@email.com'

  password: 'string'

その他のサンプルユーザー：[こちら](https://github.com/waynejsk/commition_app/blob/main/backend/src/seeders/20211031233803-test-users.js)


## 目次

 - [ローカルで動かすには](#ローカルで動かすには)
    - [バックエンドのセットアップ](#バックエンドのセットアップ)
    - [フロントのセットアップ](#フロントのセットアップ)


# ローカルで動かすには


## バックエンドのセットアップ


### .envファイルを作成し環境変数の設定

JWT_SECRET='任意の英数字'

STRIPE_SECRET_KEY='stripeのシークレットキー'[https://dashboard.stripe.com/test/dashboard](https://dashboard.stripe.com/test/dashboard)


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


## フロントのセットアップ

バックエンドを起動しているのとは別の新しいターミナルを開く

### 定数を変更

STRIPE_PUBLISHABLE_KEY='stripeのパブリックキー'[https://dashboard.stripe.com/test/dashboard](https://dashboard.stripe.com/test/dashboard)
BASE_API_URL='http://localhost:4000' ＊backend/server.jsで指定したポート

### ライブラリのインストール

```
$ cd client/
$ yarn install
```

### アプリケーションの起動

```
$ yarn run start
```