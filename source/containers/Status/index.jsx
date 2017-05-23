import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import Connections from './Connections'
import Summary from './Summary'
import Usage from './Usage'
import Tabs, { TabsItem } from '../../components/Tabs'
import Title from '../../components/Title'
import block from 'bem-cn'
import './style.less';

/**
 * Status container
 * @class
 */
class Status extends React.Component {
    /**
     * Status properties
     * @static
     */
    static propTypes = {};

    /**
     * Creates Status container
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
        //const { location } = this.props

        /*this.setState({
            selectedTab: Status.tabs.find(tab => location.pathname.indexOf(tab.name) >= 0).name
        })*/
    }

    /**
     * Renders Status container
     * @method
     */
    render() {
        const
            b = block('status'),
            { match } = this.props;

        return (
            <div className={b()}>
                <div className={b('title')}>
                    <Tabs
                        title={
                            <Title secondaryTitle="Server status" />
                        }
                    >
                        <TabsItem label="Summary" url={`${match.url}/summary`} />
                        <TabsItem label="Usage" url={`${match.url}/usage`} />
                        <TabsItem label="Connections" url={`${match.url}/connections`} />
                    </Tabs>
                </div>
                <div className={b('view')}>
                    <Switch>
                        <Route path={`${match.url}/connection`} component={Connections} />
                        <Route path={`${match.url}/summary`} component={Summary} />
                        <Route path={`${match.url}/usage`} component={Usage} />
                    </Switch>
                    {
                        !this.state.selectedTab ? <Redirect to={`${match.url}/summary`}/> : null
                    }
                </div>
            </div>
        )
    }
}

export default Status