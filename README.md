git hubの使い方と、基本用語をまとめておく
html,cssについての基本もまとめておく

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

～html,css基礎～

：ページ構造系タグ：

；<div>
レイアウトを区切るために使う
CSSでスタイルを当てたり、JSXでグループ化するのに必須

例：
<div class="card">
  <h2>タイトル</h2>
  <p>内容です。</p>
</div>

；<h1> ~ <h6>
見出し
<h1> が一番大きくて重要、 <h6> が一番小さい

；<p>
段落（paragraph）
テキストをひとまとまりにするときに使う

；<ul> と <li>
<ul>: unordered list（順序なしリスト）
<li>: list item（リストの中身）

例：
<ul>
  <li>りんご</li>
  <li>みかん</li>
  <li>ぶどう</li>
</ul>

：フォーム系タグ：
；<input type="text">

・ユーザーが文字を入力できるフィールド

    ・type で種類を変えられる

        text: テキスト入力
        number: 数字専用
        password: ●●●で表示される
        checkbox: チェックボックス
        radio: ラジオボタン

例：

<input type="text" placeholder="名前を入力してください">
<input type="password" placeholder="パスワード">
<input type="checkbox">利用規約に同意

<input> は 空要素タグ と呼ばれていて、「中身を入れる」ことができないタイプ。
だから </input> みたいな閉じタグは存在しません。
一方で、<button> は「中に文字や要素を入れる」から閉じタグが必要

；<button>

・ボタン

クリックでイベントを発生させる

デフォルトだと「送信ボタン」として働く（フォームの中だと submit になる）

例：

<button>クリックしてね</button>
<button type="button">ただのボタン</button>
<button type="submit">送信</button>

・属性（attribute）
；class 

class: 複数の要素にスタイルや動きをまとめて当てる

例：

<p class="error-text">エラーです</p>

；type / placeholder

type: inputの種類（text, password, number など）

placeholder: 入力欄に表示するヒント（入力すると消える）

例：

<input type="text" placeholder="メールアドレスを入力">

value

<input> に「中の値（入力されている文字）」を持たせる属性

入力前に「初期値」を入れておくこともできる

Reactでは「入力欄の中身 = 状態(state)」として扱うのが基本。
これを 制御されたコンポーネント (Controlled Component)

例（HTML）：

<input type="text" value="デフォルト値">

例（React）：

const [name, setName] = useState(""); // 状態を作る

return (
  <input
    type="text"
    value={name}   // ← 入力欄の値は必ず state "name"
    onChange={(e) => setName(e.target.value)} // ← 入力されるたびに state 更新
  />
);




；onChange, onClick（React特有のイベント）

onClick: ボタンや要素をクリックしたときに動く関数を指定する

onChange: input の内容が変わったときに動く

例（React）：

<button onClick={() => alert("クリックされました!")}>クリック</button>

onClick={...} ← ボタンがクリックされた時に実行する関数を渡す

() => alert("クリックされました!") ← 関数そのもの

() は「引数なし」

=> は「アロー関数」

alert("クリックされました!") が実際に動く処理

<input
  type="text"
  value={name}
  onChange={(e) => setName(e.target.value)}
/>



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