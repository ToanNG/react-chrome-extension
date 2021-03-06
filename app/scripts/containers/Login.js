import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Paper from 'material-ui/lib/paper';
import LoginForm from 'components/LoginForm';
import * as AuthActions from 'actions/auth';

@connect(
  mapStateToProps,
  mapDispatchToProps
)
class Login extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  }

  _handleSubmit = (email, password) => {
    this.props.actions.login({email, password});
  }

  render = () => {
    const {auth} = this.props;
    let status = 'idle';

    if (auth.get('error')) {
      status = 'error';
    } else if (auth.get('isLoggingIn')) {
      status = 'pending';
    }

    return (
      <div className='screen'>
        <Paper className='login' zDepth={1}>
          <LoginForm status={status} onSubmit={this._handleSubmit} />
        </Paper>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(AuthActions, dispatch),
  };
}

export default Login;
