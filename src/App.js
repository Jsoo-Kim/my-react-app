import React, {Component} from "react";
import "./App.css";

export default class App extends Component {

  state = {
    todoData : [],
    value: ""
  }

  btnStyle = {
    color: "#fff",
    border: "none", 
    padding: "5px 9px",
    borderRadius: "50%",
    cursor: "pointer",
    float: "right",
  };

  listStyle = (completed) => {
    return {
      padding: "10px",
      borderBottom: "1px #ccc dotted",
      textDecoration: completed? "line-through" : "none"
    };
  };

  handleClick = (id) => {
    let newTodoData = this.state.todoData.filter((data) => data.id !== id); /* id가 달라야 걸러져서 남으므로 id가 같으면 지워짐 */
    console.log("newTodoData", newTodoData); /* 상태 변화 확인하기 위한 부분 */
    this.setState({ todoData: newTodoData });
  };

  handleChange = (e) => {
    this.setState({ value: e.target.value })
  }

  handleSubmit = (e) => {
    //form 안에 input을 전송할 때 페이지 리로드 되는 걸 막아줌
    e.preventDefault();

    //새로운 할 일 데이터
    let newTodo = {
      id: Date.now(),
      title: this.state.value,
      complete: false
    };

    //원래 있던 할 일에 새로운 할 일 더해주기
  this.setState({ todoData: [...this.state.todoData, newTodo], value: "" });
  };

  handleCompleteChange = (id) => {
    let newTodoData = this.state.todoData.map(data => {
      if (data.id === id) {
        data.completed = !data.completed; /* true면 false가 되고 false면 true가 됨 */
      }
      return data;
    });
    this.setState({ todoData: newTodoData });
  };

  render() {
    return(
      <div className="container">
        <div className="todoBlock">
           <div className="title">
            <h1>할 일 목록</h1>
           </div>   

           {this.state.todoData.map((data) => (
            <div style={this.listStyle(data.completed)} key={data.id}> {/* 리스트 여러 개이므로 key 필요 */}
              <p>
              <input 
              type="checkbox" 
              onChange={() => this.handleCompleteChange(data.id)}
              defaultChecked={false} 
              />{" "} {/* " "는 체크박스와 할 일 제목 사이에 공백을 추가하는 역할 */}
              {data.title}
              <button 
              style={this.btnStyle} 
              onClick={() => this.handleClick(data.id)}
              >
                x 
              </button>
              </p>
           </div>
           ))}

            <form style={{ display: "flex" }} onSubmit={this.handleSubmit}>
              <input 
              type="text"
              name="value"
              style={{flex: '10', padding: '5px'}}
              placeholder="해야 할 일을 입력하세요."
              value={this.state.value}
              onChange={this.handleChange}
              />
              <input 
              type="submit"
              value="입력"
              className="btn"
              style={{flex: '1'}}
              />
            </form>
               
        </div>
      </div>
    );
  }
}