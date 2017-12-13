import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { RingLoader } from 'react-spinners';
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

        // if (this.props.loading || this.props.loading === null) {
        //     return <RingLoader
        //         color={'#123abc'}
        //         loading={this.props.loading}
        //     />
        // }

        return (
            <div className="container">
                {this.props.loading || this.props.loading === null ?
                    <RingLoader
                        color={'#123abc'}
                        loading={this.props.loading}
                    />
                    :
                    <div>
                        <h1>Welcome {this.props.user.name}!</h1>
                    </div>
                }
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
