import React, { useContext, useState } from "react";
import { UserContext } from "./UserContext";

export default function UserForm({ onUserFormSubmit }) {
  const { name, setName } = useContext(UserContext);
  const [input, setInput] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    setName(input);
    onUserFormSubmit(input);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text"
        placeholder="Enter your name"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button type="submit">Start Quiz</button>
    </form>
  );
}
