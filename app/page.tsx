"use client"; //appはデフォルトでサーバーコンポーネントなので状態管理が使えるクライアントコンポーネントに

import { useState, useEffect } from "react";
import axios from "axios";//サーバーからjsonが返ってくる時自動でパースしてくれる
import './style.css';//外部スタイルシートをimportするため、htmlなら<link>で囲んで

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

 return (
  <div className="container">
    <h1 className="title">My Todo List</h1>
    <ul className="todo-list">
      {todos.map((todo) => (
        <li key={todo.id} className="todo-item">
          {todo.title}
          <button className="delete-btn" onClick={() => removeTodo(todo.id)}>
            Delete
          </button>
        </li>
      ))}
    </ul>

    <div className="input-area">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Add a new task"
        className="input"
      />
      <button onClick={addTodo} className="add-btn">
        Add
      </button>
    </div>
  </div>
 );
}
