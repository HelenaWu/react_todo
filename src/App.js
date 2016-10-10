import React, {
  Component
}
from 'react';
import './App.css';
import * as firebase from 'firebase';
import Header from './components/header';
import TodoForm from './components/form';
import List from './components/list';
import {ButtonToolbar, Button} from 'react-bootstrap';

class Todo extends Component {
  constructor(props){
    super(props);

    this.state = {
      showActive: true,
      items: [],
      newTask: {
        description: "",
        Priority: "",
      }
    }
    this.toggleView = this.toggleView.bind(this);

  }

  componentDidMount() {
    const todosRef = firebase.database().ref('todos/');
    //child_added called once to read existing items, then every time a new item added
    todosRef.on('child_added', (data) => {

    })
  }
  toggleView() {
    this.setState((prevState) => ({
      showActive: !prevState.showActive
    }))
  }
  render() {
    return (
      <div className="App">
        <div className="pull-right">
          <ButtonToolbar>
            <Button onClick={this.toggleView} bsStyle="primary">See {this.state.showActive? "Task History": "Active Tasks"}</Button>
          </ButtonToolbar>
        </div>
        < Header showActive={this.state.showActive} />
        <TodoForm/>
        <List showActive={this.state.showActive}/>
      </div>
    );

  }
}

export default Todo;
