import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { RingLoader } from 'react-spinners';
import {
    startWS,
    loadingUser,
} from '../../modules/user'
import Calendar from './calendar'
import NotesContainer from './notes'
import TodosContainer from './todos'


const styles = {
    header: {
        marginTop: '25px',
        marginBottom: '50px',
    }
}

class DashboardContainer extends Component {
    componentDidMount() {
        const { startWS, loadingUser } = this.props;
        loadingUser();
        startWS();
    }

    render() {
        return (
            <div className="container">
                {this.props.loading || this.props.loading === null ?
                    <RingLoader
                        color={'#123abc'}
                        loading={this.props.loading}
                    />
                    :
                    <div>
                        <h1 style={styles.header} >Welcome {this.props.user.name}!</h1>
                        <div className="row">
                            <div className="col">
                                <Calendar />
                                <NotesContainer />
                            </div>
                            <div className="col-lg-4 col-md">
                                <TodosContainer />
                            </div>
                        </div>
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
