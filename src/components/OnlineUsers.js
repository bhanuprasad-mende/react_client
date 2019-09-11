import React from 'react';
import ActionCable from 'action-cable-react-jwt'
import { SOCKET_URL } from '../_constants';

class OnlineUsers extends React.Component {
  componentDidMount () { 
    this.createSocket()
  }
  createSocket = () => {
    // get your JWT token
    // this is an example using localStorage
    let user = JSON.parse(localStorage.getItem('user'));
    const yourToken = user.auth_token

    let App = {}
    App.cable = ActionCable.createConsumer(SOCKET_URL, yourToken)
    const subscription = App.cable.subscriptions.create({channel: 'OnlineUsersChannel'}, {
      connected () {},
      disconnected () {},
      received (data) { 
        console.log(data)
        let el = document.getElementById('online_users_section')
        el.innerHTML = ''
        data.forEach(function (value) {
            let node = document.createElement("LI");
            let textnode = document.createTextNode(value);
            node.appendChild(textnode);
            el.appendChild(node);
        });
      }
    })
  }
  
  render() {
    return (<React.Fragment>
        <h3>Users from Online Users Channel:</h3>
        <ul id='online_users_section'>
        </ul>
    </React.Fragment>)
  }
}
export default OnlineUsers;