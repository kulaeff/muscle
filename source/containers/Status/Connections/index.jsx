import React from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Spinner from '../../../components/Spinner'
import * as statusConnectionsActions from '../../../actions/status/connections'
import block from 'bem-cn'
import './style.less';

/**
 * StatusConnections container
 * @class
 */
class StatusConnections extends React.Component {
    /**
     * StatusConnections properties
     * @static
     * @property {bool} fetching Is data fetching
     * @property {object} connections The server's status
     */
    static propTypes = {
        fetching: PropTypes.bool,
        connections: PropTypes.object.isRequired,
    }

    /**
     * Creates StatusConnections container
     * @constructor
     */
    constructor(props) {
        super(props)

        this.state = {
            selectedTab: null,
        }
    }

    /**
     * Invoked after the component was mounted
     * @method
     */
    componentDidMount() {
        const { getStatusConnections } = this.props.statusConnectionsActions

        getStatusConnections()
    }

    /**
     * Redirects to selected tab
     * */
    onTabsChange = (name) => {
        const { router } = this.props

        this.setState({
            selectedTab: name
        })

        router.push(`/status/${name}`)
    }

    /**
     * Renders StatusConnections container
     * @method
     */
    render() {
        const
            b = block('status-connections'),
            { fetching, connections } = this.props
            // received = bytesToString(server.usage.received)

        return (
            <div className={b()}>
                {
                    fetching
                        ?
                        <div className={b('spinner')}>
                            <div className={b('spinner-container')}>
                                <Spinner active={true}/>
                            </div>
                        </div>
                        :
                        <div className={b('container')}>
                            {connections.upTime}
                        </div>
                }
            </div>
        )
    }
}

function mapStateToProps (state) {
    return {
        fetching: state.statusConnections.fetching,
        connections: state.statusConnections.connections
    }
}

function mapDispatchToProps(dispatch) {
    return {
        statusConnectionsActions: bindActionCreators(statusConnectionsActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(StatusConnections)