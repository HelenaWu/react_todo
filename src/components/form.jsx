import React, {
  Component
}
from 'react';
import '../App.css';
import Config from '../config';
import * as firebase from 'firebase';
import {Button, FormGroup, FormControl, Table} from 'react-bootstrap';
//Q1: how to mutate state?
//Q2: key in form map function

class TodoForm extends Component {
  constructor(props){
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.syncDescription = this.syncDescription.bind(this);
    this.syncPriority = this.syncPriority.bind(this);
    this.priorities = ['Select Priority', 'high', 'med', 'low'];
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
    const todosRef = firebase.database().ref(Config.firebase.root_ref);
    let newTodoRef = todosRef.push();
    newTodoRef.set({
      status: 'active',
      description: this.state.description,
      priority: this.state.priority,
      created: Date.now(),
    });
    this.setState({
      description: '',
      priority: ''
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
                    componentClass="select" onChange={this.syncPriority} value={this.state.priority} placeholder="Select Priority">
                    {this.priorities.map( (level) =>
                      <option value={level}>{level}</option>
                    )}
                  </FormControl>
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
