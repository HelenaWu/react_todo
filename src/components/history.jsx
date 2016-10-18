import React, {
  Component
}
from 'react';
import '../App.css';
import List from './list';
import Header from './header';

class History extends Component {
  render() {
    return (
      <div>
        < Header title="Task History" />
        <List state="history"/>
      </div>
    );
  }
}

export default History;
