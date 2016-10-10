import React, {
  Component
}
from 'react';
import '../App.css';
import * as firebase from 'firebase';
import {Button, FormGroup, FormControl, Table} from 'react-bootstrap';

class TodoForm extends Component {
  constructor(props){
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.syncDescription = this.syncDescription.bind(this);
    this.syncPriority = this.syncPriority.bind(this);

    this.state = {
      description: '',
      priority: '',
    }
  }
  syncDescription(e) {
    this.setState({
      description: e.target.value
    });
  }
  syncPriority(e) {
    this.setState({
      priority: e.target.value
    });
  }
  handleSubmit(e) {
    e.preventDefault();

    const todosRef = firebase.database().ref('todos/');
    let newTodoRef = todosRef.push();
    newTodoRef.set({
      status: 'active',
      description: this.state.description,
      priority: this.state.priority,
      created: Date.now(),
    });
  }
  render() {
    return(
      <div>
        <Table>
          <thead>
            <tr>
              <th>Description</th>
              <th>Priority</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <FormGroup>
                  <FormControl
                    type="text" onChange={this.syncDescription} value={this.state.description} placeholder="Enter new Task"
                  />
                </FormGroup>
              </td>
              <td>
                <FormGroup>
                  <FormControl
                    type="text" onChange={this.syncPriority} value={this.state.priority} placeholder="high, med, low"
                  />
                </FormGroup>
              </td>
              <td>
                <Button type="submit" onClick={this.handleSubmit}>
                  Add
                </Button>
              </td>
            </tr>
          </tbody>
        </Table>
       < /div>

    );
  }
}

export default TodoForm;
