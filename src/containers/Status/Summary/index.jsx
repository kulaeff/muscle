import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as statusSummaryActions from '../../../actions/status/summary'
import Grid, { GridItem } from '../../../components/Grid'
import Indicator from '../../../components/Indicator'
import Spinner from '../../../components/Spinner'
import block from 'bem-cn'
import bytes from '../../../helpers/bytes'
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
                            <Grid>
                                <GridItem>
                                    <Indicator title="Server" value={summary.upTime}/>
                                </GridItem>
                                <GridItem>
                                    <Indicator title="Connections" value={summary.connections}/>
                                </GridItem>
                                <GridItem>
                                    <Indicator title="Usage" value={bytes(summary.usage)} />
                                </GridItem>
                                <GridItem>
                                    <Indicator title="Queries" value={summary.queries} />
                                </GridItem>
                            </Grid>
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