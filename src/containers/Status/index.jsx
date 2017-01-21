import React, { Component } from 'react'
import Tabs from '../../components/Tabs'
import Title from '../../components/Title'
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
     */
    static propTypes = {
    }

    static tabs = [
        { name: 'summary', label: 'Summary'},
        { name: 'usage', label: 'Usage'},
        { name: 'connections', label: 'Connections'}
    ]

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
        const { location } = this.props

        this.setState({
            selectedTab: Status.tabs.find(tab => location.pathname.indexOf(tab.name) >= 0).name
        })
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
            { children } = this.props

        return (
            <div className={b()}>
                <div className={b('title')}>
                    <Title secondaryTitle="Server status" />
                    <Tabs
                        items={Status.tabs}
                        selected={this.state.selectedTab}
                        onChange={this.onTabsChange} />
                </div>
                <div className={b('view')}>{children}</div>
            </div>
        )
    }
}

export default Status