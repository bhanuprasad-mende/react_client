import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { userActions } from '../_actions';
import { connect } from 'react-redux';
import OnlineUsers from './OnlineUsers'

class HomePage extends React.Component {
  componentDidMount() {
    this.props.dispatch(userActions.getAll());
  }
  render() {
    const { users } = this.props;

    return (<React.Fragment>

      <Grid container spacing={24}>
        <Grid item xs={12} style={{ marginTop: 10 }}>
          <Paper className="homepagepaper">
            <Typography variant="body1" gutterBottom align="center">
              You're logged in with React & JWT!!
          </Typography>

          </Paper>
        </Grid>
        <Grid item xs={12}>
          <p>You're logged in with React & JWT!!</p>
          <h3>Users from secure api end point:</h3>
          {users.loading && <em>Loading users...</em>}
          {users.error && <span className="text-danger">ERROR: {users.error}</span>}
          {users.items &&
            <ul>
              {users.items.map((user, index) =>
                <li key={user.id}>
                  {user.name + ' ' + user.email}
                </li>
              )}
            </ul>
          }
          <OnlineUsers></OnlineUsers>
        </Grid>
      </Grid>
    </React.Fragment>);
  }
}
function mapStateToProps(state) {
  const { users, authentication } = state;
  const { user } = authentication;
  return {
    user,
    users
  };
}
const connectedHomePage = connect(mapStateToProps)(HomePage);
export { connectedHomePage as HomePage };