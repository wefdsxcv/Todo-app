ミスってreadmeが消えました。webで書いてて、よくわかんなくなった。
git hubの使い方と、基本用語をまとめておく

～基本用語～
commit（コミット）	
ローカルでの変更を「記録する」操作。例：git commit -m "変更内容"

push（プッシュ）	
ローカルのコミットを GitHub に送る操作。例：git push origin main

pull（プル）	
GitHub の最新の状態をローカルに取り込む操作。例：git pull 
origin main

branch（ブランチ）
作業用の分岐。main は基本ブランチ。複数作業を分けられる

merge（マージ）
他のブランチの変更を自分のブランチに統合する操作

rebase（リベース）
履歴をきれいにしたまま、リモートの変更を自分の変更に乗せる操作

conflict（コンフリクト）
同じファイルの同じ部分を両方で変更した時に起きる「どちらを残すか迷った状態」

～git hub の使いかた　基本の流れ～
Step 1: ローカルで編集
README.md やコードを自分の PC で編集

Step 2: 変更をステージに追加
git add README.md
git add app/  # コードも同様

Step 3: コミット（変更を記録）
git commit -m "README 更新"

Step 4: リモートの最新を取り込む（必要に応じて）
git pull Todo-app main --rebase
他の人が GitHub を更新している場合は必須

Step 5: リモートに push
git push Todo-app main


～todoアプリのせつめい～

フロントnext.js tailwindcss
バック　next.js(api router)

orm prisma
db  sqlite 

fetch axios 

app/page.tsx メインページ
app/api/todos/route.ts  GET POST DELETE 

コメント文に詳細書いてある。

～chat gptに書かせたアプリ詳細説明～
1️⃣ 初期画面表示

ユーザーがページを開くと Home コンポーネント が表示される

useEffect によって GET リクエスト が送られる

サーバー（Next.js API）が データベース（Prisma + SQLite） から Todo 一覧を取得

取得したデータを todos の state にセット

画面に Todo リストが表示される

2️⃣ Todo の追加（Add ボタン）

ユーザーが入力フォームに文字を入力

Add ボタンをクリック すると addTodo が呼ばれる

addTodo 内で POST リクエスト が送信される

サーバーが DB に新しい Todo を追加

返ってきた新しい Todo を todos 配列に追加

画面が自動で更新される

3️⃣ Todo の削除（Delete ボタン）

ユーザーが Delete ボタンをクリック

removeTodo が呼ばれる

DELETE リクエスト が送信される

サーバーが DB から該当の Todo を削除

成功したら todos 配列から対象の Todo を削除

画面が自動で更新される