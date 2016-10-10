import React, {
  Component
}
from 'react';
import '../App.css';
import * as firebase from 'firebase';
import {Table} from 'react-bootstrap';
import moment from 'moment';

class List extends Component {
  constructor(props){
    super(props);
    this.state = {
      items: [],
    }
  }

  componentWillMount() {
    this.todosRef = firebase.database().ref('todos/');
    //child_added called once to read existing items, then every time a new item added
    this.todosRef.on('child_added', (snap) => {
      this.addEntry(snap);
    })
  }
  addEntry(data) {
    this.setState( (prevState) => ({
      items: prevState.items.concat(data)
    }))
  }
  markComplete(key, val){
    //doing this because setValue on a single field is not working
    this.todosRef.child(key).set({
      description: val.description,
      priority: val.priority,
      status: 'completed',
      created: val.created,
    });
  }
  render() {
    return (
      <Table striped bordered hover>
      <thead>
        <tr>
          <th>Description</th>
          <th>Priority</th>
          <th>Status</th>
          <th>{this.props.showActive ? "Mark as Complete": "Completed"}</th>
          <th>Created At</th>
        </tr>
      </thead>
      <tbody>
        {this.state.items
          .filter(item => item.val().status === (this.props.showActive ? "active": "completed"))
          .map((item, index) => (
          <tr key={item.key}>
            <td className={this.props.showActive? null : "Complete"}>{item.val().description}</td>
            <td>{item.val().priority}</td>
            <td>{item.val().status}</td>
            <td><div onClick={() => this.markComplete(item.key, item.val())}><span className={ this.props.showActive ?  "glyphicon glyphicon-edit":"glyphicon glyphicon-ok" }></span></div></td>
            <td>{moment(item.val().created).fromNow()}</td>
          </tr>
        ))}
      </tbody>
      </Table>
    );

  }
}

export default List;
