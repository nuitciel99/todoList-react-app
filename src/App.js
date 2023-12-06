import "./App.css";
// import "../src/assets/common.scss"
import React, { useState, useEffect } from "react";
import { Container, List } from "@mui/material";
import AddTodo from "./AddTodo";
import { API_BASE_URL } from "./api-config";
import axios from "axios"; // axios 추가
import Todo from "./Todo";

function App() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios.get(`${API_BASE_URL}/todo`)
    .then((response) => {console.log(response);setItems(response.data.data)})
      
      .catch((error) => console.error("Error fetching todos:", error));
  }, []);

  const addItem = (item) => {
    axios.post(`${API_BASE_URL}/todo`, item)
      .then((response) => setItems(response.data.data))
      .catch((error) => console.error("Error adding todo:", error));
  };

  const editItem = (item) => {
    axios.put(`${API_BASE_URL}/todo`, item)
      .then((response) => setItems(response.data.data))
      .catch((error) => console.error("Error editing todo:", error));
  };

  const deleteItem = (item) => {
    axios.delete(`${API_BASE_URL}/todo`, { data: item })
      .then((response) => setItems(response.data.data))
      .catch((error) => console.error("Error deleting todo:", error));
  };

  let todoItems = items.length > 0 && (
    
      <List>
        {items.map((item) => (
          <Todo
            item={item}
            key={item.id}
            editItem={editItem}
            deleteItem={deleteItem}
          />
        ))}
      </List>
        
    
  );

  return (
    <div className="App">
      <Container maxWidth="md">
        <AddTodo addItem={addItem} />
        <div className="TodoList" >{todoItems}</div>
      </Container>
    </div>
  );
}

export default App;
