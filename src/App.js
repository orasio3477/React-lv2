import React, { useState } from "react";
import "./App.css";
import { useSelector } from "react-redux";

function App() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [workingTodos, setWorkingTodos] = useState([]);
  const [doneTodos, setDoneTodos] = useState([]);

  // react counter (useSelector)
  const date = useSelector((state) => {
    return state;
  });

  console.log("date", date);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  const handleAddTodo = () => {
    if (title === "" || content === "") {
      alert("제목과 내용을 입력해주세요.");
      return;
    }

    const newTodo = {
      title: title,
      content: content,
      isDone: false,
    };

    setWorkingTodos([...workingTodos, newTodo]);

    setTitle("");
    setContent("");
  };

  const handleToggleTodo = (todo, index, isDone) => {
    if (isDone) {
      // Done에서 Working으로 이동
      const updatedDoneTodos = [...doneTodos];
      updatedDoneTodos.splice(index, 1);

      setDoneTodos(updatedDoneTodos);
      setWorkingTodos([...workingTodos, { ...todo, isDone: false }]);
    } else {
      // Working에서 Done으로 이동
      const updatedWorkingTodos = [...workingTodos];
      updatedWorkingTodos.splice(index, 1);

      setWorkingTodos(updatedWorkingTodos);
      setDoneTodos([...doneTodos, { ...todo, isDone: true }]);
    }
  };

  const handleDeleteTodo = (todo, index, isDone) => {
    if (isDone) {
      // Done에서 삭제
      const updatedDoneTodos = [...doneTodos];
      updatedDoneTodos.splice(index, 1);

      setDoneTodos(updatedDoneTodos);
    } else {
      // Working에서 삭제
      const updatedWorkingTodos = [...workingTodos];
      updatedWorkingTodos.splice(index, 1);

      setWorkingTodos(updatedWorkingTodos);
    }
  };

  return (
    <div className="container">
      <header>
        <h1>Todo 추가하기</h1>
      </header>
      <div className="inputbox">
        <label htmlFor="title">제목:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={handleTitleChange}
        />
        <br />
        <label htmlFor="content">내용:</label>
        <input
          type="text"
          id="content"
          value={content}
          onChange={handleContentChange}
        />
        <br />
        <button onClick={handleAddTodo}>추가하기</button>
      </div>
      <div className="workinglist">
        <h2>Working</h2>
        <ul>
          {workingTodos.map((todo, index) => (
            <li key={index}>
              <a href={`/todo/${index}`}>상세보기</a>
              <strong>
                <h1>제목 : {todo.title}</h1>
              </strong>
              <br />
              <p>내용 : {todo.content}</p>
              <br />
              <button
                onClick={() => handleDeleteTodo(todo, index, todo.isDone)}
              >
                삭제
              </button>
              <button
                onClick={() => handleToggleTodo(todo, index, todo.isDone)}
              >
                {todo.isDone ? "취소" : "완료"}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="donelist">
        <h2>Done</h2>
        <ul>
          {doneTodos.map((todo, index) => (
            <li key={index}>
              <a href={`/todo/${index}`}>상세보기</a>
              <strong>
                <h1>제목 : {todo.title}</h1>
              </strong>
              <br />
              <p>내용 : {todo.content}</p>
              <br />
              <button
                onClick={() => handleDeleteTodo(todo, index, todo.isDone)}
              >
                삭제
              </button>
              <button
                onClick={() => handleToggleTodo(todo, index, todo.isDone)}
              >
                {todo.isDone ? "취소" : "완료"}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
