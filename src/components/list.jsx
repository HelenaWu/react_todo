import React, {
  Component
}
from 'react';
import '../App.css';
import Config from '../config';
import * as firebase from 'firebase';
import {Table, Button} from 'react-bootstrap';
import moment from 'moment';
const now = moment();

class List extends Component {
  constructor(props){
    super(props);
    this.state = {
      items: [],
    }
  }

  componentWillMount() {
    this.todosRef = firebase.database().ref(Config.firebase.root_ref);
    //child_added called once to read existing items, then every time a new item added
    this.todosRef.on('child_added', (snap) => {
      this.addEntry(snap);
    })
  }
  addEntry(data) {
    if(data.val().status === 'active' && now.diff(data.val().created, 'days') >= Config.expire_in_days){
      data.status = "expired";
    }else{
      data.status = data.val().status;
    }
    this.setState( (prevState) => ({
      items: prevState.items.concat(data)
    }))
  }
  markComplete(key, val){
    this.todosRef.child(key).set({
      description: val.description,
      priority: val.priority,
      status: "completed",
      created: val.created,
    });
    //loop through items to modify status to completed
    let itemsCopy = this.state.items.slice();
    itemsCopy.forEach((item, index) => {
      if(item.key === key){
        itemsCopy[index].status = "completed";
      }
    });
    this.setState({items: itemsCopy});
  }
  getItems(){
    if(this.props.state === 'main'){
      return this.state.items.filter(item => item.status === "active");
    }else if(this.props.state === 'history'){
      return this.state.items.filter(item => item.status === "completed" || item.status === "expired");
    }
  }
  render() {
    return (
      <Table striped bordered hover>
      <thead>
        <tr>
          <th>Description</th>
          <th>Priority</th>
          <th>Status</th>
          <th>{this.props.state === 'main' ? "Mark as Complete": "Completed"}</th>
          <th>Created At</th>
        </tr>
      </thead>
      <tbody>
        {
          this.getItems()
          .map((item, index) => (
          <tr key={item.key}>
            <td className={item.status === 'active' ? null : "Complete"}>{item.val().description}</td>
            <td>{item.val().priority}</td>
            <td>{item.status}</td>
             <td>{ this.props.state === 'main' ?
                <Button onClick={() => this.markComplete(item.key, item.val())}><span className="glyphicon glyphicon-edit"></span></Button>
                :<span className="glyphicon glyphicon-ok"></span>
                 }</td>
            <td>{moment(item.val().created).fromNow()}</td>
          </tr>
        ))}
      </tbody>
      </Table>
    );
  }
}
export default List;
