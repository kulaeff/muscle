import React from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as statusSummaryActions from '../../../actions/status/summary'
import Flex, { FlexItem, FlexSeparator } from '../../../components/Flex'
import Tile from '../../../components/Tile'
import Spinner from '../../../components/Spinner'
import cn from 'cn-decorator';
import bytes from '../../../helpers/bytes'
import moment from 'moment'
import './style.less';

/**
 * StatusSummary container
 * @class
 */
@cn('status-summary')
class StatusSummary extends React.Component {
    /**
     * StatusSummary properties
     * @static
     * @property {bool} fetching Is data fetching
     * @property {object} summary The server's status
     */
    static propTypes = {
        fetching: PropTypes.bool,
        summary: PropTypes.object.isRequired,
    };

    /**
     * Creates StatusSummary container
     * @constructor
     */
    constructor(props) {
        super(props);

        this.state = {
            selectedTab: null,
        };
    }

    /**
     * Invoked after the component was mounted
     * @method
     */
    componentDidMount() {
        const { getStatusSummary } = this.props.statusSummaryActions;

        getStatusSummary();
    }

    /**
     * Renders StatusSummary container
     * @method
     */
    render(cn) {
        const
            { fetching, summary } = this.props,
            uptime = moment.duration(summary.uptime * 1000);

        return (
            <div className={cn()}>
                {
                    fetching
                        ?
                        <div className={cn('spinner')}>
                            <div className={cn('spinner-container')}>
                                <Spinner active={true}/>
                            </div>
                        </div>
                        :
                        <div className={cn('container')}>
                            <Flex>
                                <FlexItem>
                                    <Tile title="Up time" value={uptime.humanize()}/>
                                </FlexItem>
                                <FlexSeparator />
                                <FlexItem>
                                    <Tile title="Connections" value={summary.connections.toLocaleString()}/>
                                </FlexItem>
                                <FlexSeparator />
                                <FlexItem>
                                    <Tile title="Traffic" value={bytes(summary.usage)} />
                                </FlexItem>
                                <FlexSeparator />
                                <FlexItem>
                                    <Tile title="Queries" value={summary.queries.toLocaleString()} />
                                </FlexItem>
                            </Flex>
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