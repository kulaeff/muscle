import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Tabs from '../../components/Tabs'
import Title from '../../components/Title'
import Spinner from '../../components/Spinner'
import * as statusActions from '../../actions/status'
import block from 'bem-cn'
import './style.less';

/**
 * Status container
 * @class
 */
class Status extends Component {
    /**
     * Status properties
     * @static
     * @property {bool} fetching Is data fetching
     * @property {object} server The server's status
     */
    static propTypes = {
        fetching: PropTypes.bool,
        server: PropTypes.object.isRequired,
    }

    /**
     * Creates Status container
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
        const { getStatus } = this.props.statusActions

        getStatus()
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
     * Renders Status container
     * @method
     */
    render() {
        const
            b = block('status'),
            tabs = [
                { name: 'summary', label: 'Summary'},
                { name: 'usage', label: 'Usage'},
                { name: 'connections', label: 'Connections'}
            ],
            { fetching, server } = this.props
            // received = bytesToString(server.usage.received)

        return (
            <div className={b()}>
                <div className={b('title')}>
                    <div className={b('title-label')}>
                        <Title secondaryTitle="Server status" />
                        <Tabs
                            items={tabs}
                            selected={this.state.selectedTab}
                            onChange={this.onTabsChange} />
                    </div>
                    <div className={b('title-spinner')}>
                        <Spinner active={fetching} type="rect" />
                    </div>
                </div>
                <div className={b('indicators')}>
                    <span className={b('indicators-title')}>
                        <Title size="small" primaryTitle="Network traffic"  />
                    </span>
                    <div className={b('indicators-container')}>
                        <div className={b('indicator')}>
                            <span className={b('indicator-title')}>Received</span>
                            <span className={b('indicator-value')}>
                                {server.usage.received}
                            </span>
                            <span className={b('indicator-unit')}>
                                Kb
                            </span>
                        </div>
                        <div className={b('indicator')}>
                            <span className={b('indicator-title')}>Sent</span>
                            <span className={b('indicator-value')}>
                                {server.usage.sent}
                            </span>
                            <span className={b('indicator-unit')}>
                                Kb
                            </span>
                        </div>
                        <div className={b('indicator')}>
                            <span className={b('indicator-title')}>Total</span>
                            <span className={b('indicator-value')}>
                                {server.usage.total}
                            </span>
                            <span className={b('indicator-unit')}>
                                Kb
                            </span>
                        </div>
                    </div>
                </div>
                <div className={b('indicators')}>
                    <span className={b('indicators-title')}>
                        <Title size="small" primaryTitle="Connections"  />
                    </span>
                    <div className={b('indicators-container')}>
                        <div className={b('indicator')}>
                            <span className={b('indicator-title')}>Failed</span>
                            <div className={b('indicator-value')}>
                                {server.connections.failed}
                            </div>
                        </div>
                        <div className={b('indicator')}>
                            <span className={b('indicator-title')}>Aborted</span>
                            <div className={b('indicator-value')}>
                                {server.connections.aborted}
                            </div>
                        </div>
                        <div className={b('indicator')}>
                            <span className={b('indicator-title')}>Total</span>
                            <div className={b('indicator-value')}>
                                {server.connections.total}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps (state) {
    return {
        fetching: state.status.fetching,
        server: state.status.server
    }
}

function mapDispatchToProps(dispatch) {
    return {
        statusActions: bindActionCreators(statusActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Status)