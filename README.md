next.js Tailwindcss sqlite prisma でtodoアプリを作ってみた。

npx create-next-app@latest my-todo-app
app/page.tsx
"use client"; //appはデフォルトでサーバーコンポーネントなので状態管理が使えるクライアントコンポーネントに

import { useState } from "react";

export default function Home() {//defalut でページだと認識
  // Todo リストの state
  const [todos, setTodos] = useState<string[]>([]);//useState<型>(初期値)　([])は空の配列
  // 入力フォームの state
  const [input, setInput] = useState<string>("");//jsでは文字列もオブジェクトのように扱う。jsのオブジェクトはプロパティだけでなく、メソッドも持てる

  // Todo 追加
  const addTodo = () => {
    if (input.trim() === "") return;//.trim()は前後の空白を削除。もし空ならスキップ
    setTodos([...todos, input]);//setTodosは配列。新しい文字列inputを追加した配列を新しく生成。reactの機能で再描画
    setInput("");//空に
  };

  // Todo 削除
  const removeTodo = (index: number) => {//indexはnumber(数値)でなければならない　tsの型注釈
    setTodos(todos.filter((_, i) => i !== index));//filterメソッドは条件に合う要素だけを残して新しい配列を作る。
  };

//Tailwind CSS とは？CSS を直接書かずに、HTML タグに「クラス名」を付けてスタイルを付けるフレームワーク

//<input/>HTMLのタグ。ユーザが入力する欄。typeでテキストか、チェックボックスかなどを指定
//value={input} は常にreactの現在のinput　stateを表示
//<input/>タグにはユーザーが今入力されている値が入っている。
//onChange input、select、textareaの値がユーザーの操作によって変更された際に発生するイベント　eに情報を詰める（targetはイベントが発生した要素(今回は<input>）

//{todos.map((todo, index) => ( 　　mapメソッドはtodosの要素とインデックスを<li>に変換。
//() => removeTodo(index) 　　　　無名関数（名前のない関数）クリックしたときにだけ実行される関数
 return (
    // 画面全体を縦方向に並べるflexコンテナ
    <div className="min-h-screen flex flex-col justify-between p-8 bg-gray-100">
      
      {/* 上部：タイトルと入力フォーム */}
      <div>
        <h1 className="text-2xl font-bold mb-4">My Todo List</h1>

        {/* 入力フォーム */}
        <div className="flex gap-2 mb-6">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Add a new task"
            className="flex-1 p-2 border rounded"
          />
          <button
            onClick={addTodo}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Add
          </button>
        </div>

        {/* Todo リスト */}
        <ul className="space-y-2">
          {todos.map((todo, index) => (
            <li
              key={index}
              className="flex justify-between items-center p-2 bg-white rounded shadow-sm"
            >
              {todo}
              <button
                onClick={() => removeTodo(index)}
                className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* 下部：中央に固定した Add ボタン（もう1つ例） */}
      <div className="flex justify-center mt-8">
        <div className="border-2 border-blue-500 rounded p-4">
          <button className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600">
            test
          </button>
        </div>
      </div>
    </div>
  );
}
