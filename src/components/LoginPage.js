import React from 'react';
import { connect } from 'react-redux';
import { userActions } from '../_actions';

import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Key from '@material-ui/icons/VpnKey';
import Button from '@material-ui/core/Button';

export class LoginPage extends React.Component {
  constructor(props) {
    super(props);

    // reset login status
    // this.props.dispatch(userActions.logout());

    this.state = {
      username: '',
      password: '',
      submitted: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit(e) {
    e.preventDefault();

    this.setState({ submitted: true });
    const { username, password } = this.state;
    const { dispatch } = this.props;
    if (username && password) {
      dispatch(userActions.login(username, password));
    }
  }

  render() {
    // const { loggingIn } = this.props;
    const { username, password, submitted } = this.state;
    return (
      <div className="login-page-class">
        <Paper className="loginPaper">
          <div className="loginheaderpart">
            <Typography variant="display3" gutterBottom className="loginpageheader">
              Login
            </Typography>
          </div>
          <Typography variant="headline" component="h3">
            Login to your account
        </Typography>
          <form>
            <div className="loginformgroup">

              <AccountCircle />
              <TextField id="input-username" name='username' label="Username" onChange={this.handleChange} />
              {submitted && !username &&
                <div className="help-block">Username is required</div>
              }

            </div>
            <div className="loginformgroup">
              <Key />
              <TextField type="password" name='password' id="input-password" label="Password" onChange={this.handleChange} />
              {submitted && !password &&
                <div className="help-block">Password is required</div>
              }
            </div>
          </form>
          <Button variant="outlined" color="primary" onClick={this.handleSubmit}><Typography variant="button" gutterBottom className="logintypography">
            Login
      </Typography></Button>
        </Paper>
      </div>
    );
  }
}

// const mapDispatchToProps = (dispatch) => ({
//   startLogin: (userid) => dispatch(login(userid))
// });
function mapStateToProps(state) {
  const { loggingIn } = state.authentication;
  return {
    loggingIn
  };
}


export default connect(mapStateToProps)(LoginPage);