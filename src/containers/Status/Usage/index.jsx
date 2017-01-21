import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Title from '../../../components/Title'
import Spinner from '../../../components/Spinner'
import * as statusUsageActions from '../../../actions/status/usage'
import block from 'bem-cn'
import './style.less';

/**
 * StatusUsage container
 * @class
 */
class StatusUsage extends Component {
    /**
     * StatusUsage properties
     * @static
     * @property {bool} fetching Is data fetching
     * @property {object} usage The server's status
     */
    static propTypes = {
        fetching: PropTypes.bool,
        usage: PropTypes.object.isRequired,
    }

    /**
     * Creates StatusUsage container
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
        const { getStatusUsage } = this.props.statusUsageActions

        getStatusUsage()
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
     * Renders StatusUsage container
     * @method
     */
    render() {
        const
            b = block('status-usage'),
            { fetching, usage } = this.props
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
                            <div className={b('indicators')}>
                                <span className={b('indicators-title')}>
                                    <Title size="small" primaryTitle="Network traffic"  />
                                </span>
                                <div className={b('indicators-container')}>
                                    <div className={b('indicator')}>
                                        <span className={b('indicator-title')}>Received</span>
                                        <span className={b('indicator-value')}>
                                            {usage.usage.received}
                                        </span>
                                        <span className={b('indicator-unit')}>
                                            Kb
                                        </span>
                                    </div>
                                    <div className={b('indicator')}>
                                        <span className={b('indicator-title')}>Sent</span>
                                        <span className={b('indicator-value')}>
                                            {usage.usage.sent}
                                        </span>
                                        <span className={b('indicator-unit')}>
                                            Kb
                                        </span>
                                    </div>
                                    <div className={b('indicator')}>
                                        <span className={b('indicator-title')}>Total</span>
                                        <span className={b('indicator-value')}>
                                            {usage.usage.total}
                                        </span>
                                        <span className={b('indicator-unit')}>
                                            Kb
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                }
            </div>
        )
    }
}

function mapStateToProps (state) {
    return {
        fetching: state.statusUsage.fetching,
        usage: state.statusUsage.usage
    }
}

function mapDispatchToProps(dispatch) {
    return {
        statusUsageActions: bindActionCreators(statusUsageActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(StatusUsage)