import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Title from '../../../components/Title'
import Spinner from '../../../components/Spinner'
import * as statusSummaryActions from '../../../actions/status/summary'
import block from 'bem-cn'
import './style.less';

/**
 * StatusSummary container
 * @class
 */
class StatusSummary extends Component {
    /**
     * StatusSummary properties
     * @static
     * @property {bool} fetching Is data fetching
     * @property {object} summary The server's status
     */
    static propTypes = {
        fetching: PropTypes.bool,
        summary: PropTypes.object.isRequired,
    }

    /**
     * Creates StatusSummary container
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
        const { getStatusSummary } = this.props.statusSummaryActions

        getStatusSummary()
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
     * Renders StatusSummary container
     * @method
     */
    render() {
        const
            b = block('status-summary'),
            { fetching, summary } = this.props
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
                                            {summary.connections}
                                        </span>
                                        <span className={b('indicator-unit')}>
                                            Kb
                                        </span>
                                    </div>
                                    <div className={b('indicator')}>
                                        <span className={b('indicator-title')}>Sent</span>
                                        <span className={b('indicator-value')}>
                                            {summary.usage}
                                        </span>
                                        <span className={b('indicator-unit')}>
                                            Kb
                                        </span>
                                    </div>
                                    <div className={b('indicator')}>
                                        <span className={b('indicator-title')}>Total</span>
                                        <span className={b('indicator-value')}>
                                            {summary.usage}
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
        fetching: state.statusSummary.fetching,
        summary: state.statusSummary.summary
    }
}

function mapDispatchToProps(dispatch) {
    return {
        statusSummaryActions: bindActionCreators(statusSummaryActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(StatusSummary)