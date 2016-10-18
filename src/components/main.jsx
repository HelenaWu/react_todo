import React, {
  Component
}
from 'react';
import '../App.css';
import Header from './header';
import TodoForm from './form';
import List from './list';

class Main extends Component {
  render() {
    return (
      <div>
        <Header title="Current Tasks" />
        <TodoForm/>
        <List state="main"/>
      </div>
    );
  }
}

export default Main;
