import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
    startWS,
    loadingUser,
} from '../../modules/user'


class DashboardContainer extends Component {
    componentDidMount() {
        const { startWS, loadingUser } = this.props;
        loadingUser();
        startWS();
    }

    render() {
        console.log(this.props, 'PROPS');

        if (this.props.loading || this.props.loading === null) {
            return <div>hey</div>
        }

        return (
            <div>
                <div className="container">
                    <h1>Welcome {this.props.user.name}!</h1>
                </div>
            </div>
        );
    }
}



const mapStateToProps = state => ({
    loading: state.user.loading,
    user: state.user.user
})

const mapDispatchToProps = dispatch => bindActionCreators({
    startWS,
    loadingUser,
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DashboardContainer)
