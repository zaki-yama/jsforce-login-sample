jsforce-browser-login
=====================

クライアント側で `jsforce.browser.init()` を使ってログインするサンプル。

### 使い方

- [Heroku CLI](https://devcenter.heroku.com/articles/heroku-command-line) をインストールする
- Salesforce 組織で接続アプリケーションを作成し、コンシューマ鍵(consumer key) を取得する
- public.index.html の以下の部分を修正し、clientId にコンシューマ鍵をセットする
    - redirectUri, proxyUrl は Heroku にデプロイする場合、Heroku の URL に差し替える

```javascript
jsforce.browser.init({
  clientId: 'YOUR_CLIENT_ID', // replace here
  redirectUri: 'http://localhost:5000/',
  proxyUrl: 'http://localhost:5000/proxy/'
});
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
$ cp -r . ~/workspace/jsforce-browser-init
$ cd ~/workspace/jsforce-browser-init
$ heroku create broser-init-sample

# public/index.html を修正し、clientId, redirectUri, proxyUrl を編集

$ git init
$ git add .
$ git commit -m 'first commit'
$ git push heroku master
$ heroku open
```
