import React, { useState } from "react";

import { Button, Grid, TextField, IconButton  } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

const AddTodo = (props) => {
    // 사용자의 입력을 저정할 오브젝트
    const [item, setItem] = useState({ title: ""});
    const addItem = props.addItem;

    // onButtonClick 함수 작성
    const onButtonClick = () => {
      if(item.title.trim() === ""){
        alert("할일을 적어주세요")
      }else{
        addItem(item); // addItem 함수 사용
        setItem({ title: "" });
      }
    };

    // onInputChange 함수 작성
    const onInputChange = (e) => {
        setItem({title: e.target.value});
        console.log(item);
    };

    // enterKeyEventHandler 함수
    const enterKeyEventHandler = (e) => {
        if (e.key === 'Enter') {
          if(item.title.trim() === ""){
            alert("할일을 적어주세요")
          }else{
            onButtonClick();
          }
        }
    };

    const clearInput = () => {
      setItem({ title: "" });
    };


    // onInputChange 함수 TextField에 연결
    return (
        <Grid container style={{ marginTop: 20 }}>
          <Grid xs={11} md={11} item style={{ paddingRight: 16 }}>
          <TextField
          placeholder="Add Todo here"
          fullWidth
          onChange={onInputChange}
          onKeyPress={enterKeyEventHandler}
          value={item.title}
          InputProps={{
            endAdornment: (
              <IconButton
                aria-label="clear input"
                onClick={clearInput}
                edge="end"
                style={{ display: item.title ? 'block' : 'none' }}
              >
                <ClearIcon />
              </IconButton>
            ),
          }}
        />
          </Grid>
          <Grid xs={1} md={1} item >
            <Button fullWidth style={{ height: '100%' }} color="secondary" variant="outlined"
            onClick={onButtonClick}>
              +
            </Button>
          </Grid>
        </Grid>
    );
}

export default AddTodo;