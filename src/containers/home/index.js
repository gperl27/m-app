import React, { Component } from 'react'
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
  startWS,
  postWS
} from '../../modules/user'


class Home extends Component {
  componentDidMount() {
    console.log('mounted');
    this.props.startWS();
  }

  renderUsers() {
    const { users } = this.props;

    return users.map(user => <li key={user.id}>{user.name}</li>)
  }

  render() {
    return (
      <div className="container">
        <div>Hi</div>
        <button onClick={this.props.postWS}>Click me</button>
      </div>
    );
  }
}



const mapStateToProps = state => ({
  user: state.user.user
})

const mapDispatchToProps = dispatch => bindActionCreators({
  postWS,
  startWS,
  changePage: () => push('/about-us')
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
