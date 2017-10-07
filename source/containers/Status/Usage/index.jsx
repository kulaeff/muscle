import React from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Title from '../../../components/Title'
import Spinner from '../../../components/Spinner'
import * as statusUsageActions from '../../../actions/status/usage'
import cn from 'cn-decorator';
import './style.less';

/**
 * StatusUsage container
 * @class
 */
@cn('status-usage')
class StatusUsage extends React.Component {
    /**
     * StatusUsage properties
     * @static
     * @property {bool} fetching Is data fetching
     * @property {object} usage The server's status
     */
    static propTypes = {
        fetching: PropTypes.bool,
        usage: PropTypes.object.isRequired,
    };

    /**
     * Creates StatusUsage container
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
        const { getStatusUsage } = this.props.statusUsageActions;

        getStatusUsage();
    }

    /**
     * Redirects to selected tab
     * */
    onTabsChange = (name) => {
        const { router } = this.props;

        this.setState({
            selectedTab: name
        });

        router.push(`/status/${name}`);
    };

    /**
     * Renders StatusUsage container
     * @method
     */
    render(cn) {
        const { fetching, usage } = this.props;

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
                            <div className={cn('indicators')}>
                                <span className={cn('indicators-title')}>
                                    <Title size="small" primaryTitle="Network traffic"  />
                                </span>
                                <div className={cn('indicators-container')}>
                                    <div className={cn('indicator')}>
                                        <span className={cn('indicator-title')}>Received</span>
                                        <span className={cn('indicator-value')}>
                                            {usage.usage.received}
                                        </span>
                                        <span className={cn('indicator-unit')}>
                                            Kb
                                        </span>
                                    </div>
                                    <div className={cn('indicator')}>
                                        <span className={cn('indicator-title')}>Sent</span>
                                        <span className={cn('indicator-value')}>
                                            {usage.usage.sent}
                                        </span>
                                        <span className={cn('indicator-unit')}>
                                            Kb
                                        </span>
                                    </div>
                                    <div className={cn('indicator')}>
                                        <span className={cn('indicator-title')}>Total</span>
                                        <span className={cn('indicator-value')}>
                                            {usage.usage.total}
                                        </span>
                                        <span className={cn('indicator-unit')}>
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