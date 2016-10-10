import React, {
  Component
}
from 'react';
import '../App.css';

class Header extends Component {
  render() {
    return(
      < h2 >{this.props.showActive? "Current Tasks": "Task History"}< /h2>
    );
  }
}

export default Header;
