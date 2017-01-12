jsforce-server-side-oauth2
==========================

サーバー側で OAuth2 による認証を行うサンプル。

### 使い方

- [Heroku CLI](https://devcenter.heroku.com/articles/heroku-command-line) をインストールする
- Salesforce 組織で接続アプリケーションを作成し、コンシューマ鍵(consumer key) およびコンシューマの秘密(consumer secret) を取得する
- `.env` ファイルを作り、`CLIENT_ID`, `CLIENT_SECRET` を入力する

```
CLIENT_ID=<Your Salesforce Username>
PASSWORD=<Your Salesforce Password>
```

- 以下のコマンドを実行する

```
$ npm install
$ heroku local web
```

- http://localhost:5000 にアクセスする

### Heroku にデプロイする場合

このディレクトリを一旦コピーし、コミットとプッシュを行う。

```
$ cp -r . ~/workspace/jsforce-login-username-password
$ cd ~/workspace/jsforce-login-username-password
$ heroku create username-password-sample

$ git init
$ git add .
$ git commit -m 'first commit'
$ git push heroku master
$ heroku open
```
