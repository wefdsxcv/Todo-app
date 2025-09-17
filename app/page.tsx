"use client"; //appはデフォルトでサーバーコンポーネントなので状態管理が使えるクライアントコンポーネントに

import { useState, useEffect } from "react";
import axios from "axios";//サーバーからjsonが返ってくる時自動でパースしてくれる

type Todo = {
  id: number;
  title: string;
  createdAt: string;
};//dbで定義したものと同じオブジェクトを作成

export default function Home() {//defalut でページだと認識
  // Todo リストの state
  const [todos, setTodos] = useState<Todo[]>([]);//useState<型>(初期値)　([])は空の配列
  // 入力フォームの state
  const [input, setInput] = useState<string>("");//jsでは文字列もオブジェクトのように扱う。jsのオブジェクトはプロパティだけでなく、メソッドも持てる

  // 初回レンダリング時にAPI(db)からTodo を取得
  useEffect(() => {
    axios.get("/api/todos").then(res => setTodos(res.data));
  },[]);//空の配列を渡すと、コンポーネントの初回レンダリング時にのみ実行される
  
  // Todo 追加
  const  addTodo = async() => {
    if (input.trim() === "") return;//.trim()は前後の空白を削除。もし空ならスキップ
    const res = await axios.post("/api/todos",{title:input});
    setTodos([...todos,res.data]);//...todos で既存の配列を展開し、新しいTodoを追加した新しい配列を作成
    setInput("");//空に
  };

  // Todo 削除
  const removeTodo = async(id: number) => {//idはnumber(数値)でなければならない　tsの型注釈
    await axios.delete("/api/todos",{data:{id}}); // ← ここでボディに id を含める
    setTodos(todos.filter(t => t.id !== id));//filterメソッドは配列の各要素を順番にチェックして、条件が true のものだけを新しい配列に残す
  };//t.id == id の時falseとなり、新しい配列には含まれない。

//Tailwind CSS とは？CSS を直接書かずに、HTML タグに「クラス名」を付けてスタイルを付けるフレームワーク

//{todos.map((todo, index) => ( 　mapメソッド .map((todo) => ...) → 配列の中から 1 つずつ todo を取り出す。取り出した todo を元に <li>...</li> を作る
//<li key={todo.id} 　　　　　     React が各要素を識別するための一意のキー。todo.id idがkeyに使われる。
//{todo.title}                    JSX の中で JavaScript の値を表示。今回は<li> の中に表示。
//() => removeTodo(index) 　　　　無名関数（名前のない関数）クリックしたときにだけ実行される関数
//<li </li>                      今回は一つの<li>の中に{todo.title}と <button Delete（これはボタンに表示される文字） </button>がある。
 return (
  <div className="min-h-screen flex flex-col items-center justify-between p-8">
    <h1 className="text-2xl font-bold mb-6">My Todo List</h1>
    <ul className="w-full max-w-md mb-6">
      {todos.map((todo) => (
        <li key={todo.id} 
        className="flex justify-between items-center bg-gray-100 rounded p-2 mb-2"
        >
          {todo.title}
            <button
            className="text-red-500 font-semibold px-2 py-1 rounded hover:bg-red-100"
            onClick={() => removeTodo(todo.id)}
            >
              Delete
            </button>
        </li>
      ))}
    </ul>
  
   {/* 入力フォームと Add ボタン */}
      <div className="w-full max-w-md flex justify-between items-center border-t pt-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add a new task"
          className="flex-1 p-2 border rounded mr-2 focus:outline-none focus:ring focus:border-blue-300"
        />
        <button
          onClick={addTodo}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add
        </button>
      </div>
    </div>
  );
}