import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Title from '../../components/Title'
import * as summaryActions from '../../actions/summary'
import block from 'bem-cn'
import './style.less';

class Summary extends Component {
    componentDidMount() {
        const { getSummary } = this.props.summaryActions

        getSummary()
    }

    render() {
        const
            b = block('summary'),
            { summary } = this.props

        return (
            <div className={b()}>
                <div className={b('title')}>
                    <Title size="large" title="Summary" theme="light" />
                </div>
                <div className={b('indicators')}>
                    <span className={b('indicators-title')}>
                        <Title size="small" title="Network traffic" theme="light" />
                    </span>
                    <div className={b('indicators-container')}>
                        <div className={b('indicator')}>
                            <span className={b('indicator-title')}>Received</span>
                            <span className={b('indicator-value')}>
                                {summary.server.usage.received.value}
                            </span>
                            <span className={b('indicator-unit')}>
                                {summary.server.usage.received.unit}
                            </span>
                        </div>
                        <div className={b('indicator')}>
                            <span className={b('indicator-title')}>Sent</span>
                            <span className={b('indicator-value')}>
                                {summary.server.usage.sent.value}
                            </span>
                            <span className={b('indicator-unit')}>
                                {summary.server.usage.sent.unit}
                            </span>
                        </div>
                        <div className={b('indicator')}>
                            <span className={b('indicator-title')}>Total</span>
                            <span className={b('indicator-value')}>
                                {summary.server.usage.total.value}
                            </span>
                            <span className={b('indicator-unit')}>
                                {summary.server.usage.total.unit}
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
                                {summary.server.connections.failed}
                            </div>
                        </div>
                        <div className={b('indicator')}>
                            <span className={b('indicator-title')}>Aborted</span>
                            <div className={b('indicator-value')}>
                                {summary.server.connections.aborted}
                            </div>
                        </div>
                        <div className={b('indicator')}>
                            <span className={b('indicator-title')}>Total</span>
                            <div className={b('indicator-value')}>
                                {summary.server.connections.total}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

Summary.propTypes = {
    summary: PropTypes.object.isRequired,
}

function mapStateToProps (state) {
    return {
        summary: state.summary
    }
}

function mapDispatchToProps(dispatch) {
    return {
        summaryActions: bindActionCreators(summaryActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Summary)