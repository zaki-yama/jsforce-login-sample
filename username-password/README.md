jsforce-username-password-login
===============================

サーバー側で username と password を使ってログインするサンプル。

### 使い方

- [Heroku CLI](https://devcenter.heroku.com/articles/heroku-command-line) をインストールする
- `.env` ファイルを作り、`USERNAME`, `PASSWORD` を入力する

```
USERNAME=<Your Salesforce Username>
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
