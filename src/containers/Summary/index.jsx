import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Title from '../../components/Title'
import Spinner from '../../components/Spinner'
import * as summaryActions from '../../actions/summary'
import block from 'bem-cn'
import './style.less';

/**
 * Summary container
 * @class
 */
class Summary extends Component {
    /**
     * Summary properties
     * @static
     * @property {bool} fetching Is data fetching
     * @property {object} server The server's status
     */
    static propTypes = {
        fetching: PropTypes.bool,
        server: PropTypes.object.isRequired,
    }

    /**
     * Invoked after the component was mounted
     * @method
     */
    componentDidMount() {
        const { getSummary } = this.props.summaryActions

        getSummary()
    }

    /**
     * Renders Summary container
     * @method
     */
    render() {
        const
            b = block('summary'),
            { fetching, server } = this.props

        return (
            <div className={b()}>
                <div className={b('title')}>
                    <div className={b('title-label')}>
                        <Title size="large" title="Server status" theme="light" />
                    </div>
                    <div className={b('title-spinner')}>
                        <Spinner active={fetching}/>
                    </div>
                </div>
                <div className={b('indicators')}>
                    <span className={b('indicators-title')}>
                        <Title size="small" title="Network traffic" theme="light" />
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
                        <Title size="small" title="Connections" theme="light" />
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
        fetching: state.summary.fetching,
        server: state.summary.server
    }
}

function mapDispatchToProps(dispatch) {
    return {
        summaryActions: bindActionCreators(summaryActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Summary)