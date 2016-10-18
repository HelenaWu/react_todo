import React, {
  Component
}
from 'react';
import './App.css';
import {ButtonToolbar, Button} from 'react-bootstrap';
import { Link } from 'react-router';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="pull-right">
          <ButtonToolbar>
            <Link to="/history">
              <Button bsStyle="primary">See Task History</Button>
            </Link>
            <Link to="/">
              <Button bsStyle="primary">See Current Tasks</Button>
            </Link>
          </ButtonToolbar>
        </div>
       { this.props.children }
      </div>
    );
  }
}

export default App;
