import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Tabs from '../../components/Tabs'
import Title from '../../components/Title'
import block from 'bem-cn'
import './style.less';

/**
 * Tables container
 * @class
 */
class Tables extends Component {
    /**
     * Tables container properties
     * @static
     */
    static propTypes = {
        minimized: PropTypes.bool,
    }

    /**
     * Creates Tables container
     * @constructor
     */
    constructor(props) {
        super(props)

        this.state = {
            selectedTab: null,
        }
    }

    /**
     * Fetches tables when database was selected for the first time
     * @method
     */
    componentDidMount() {
        //const { params } = this.props

    }

    /**
     * Minimizes the window
     * @method
     */
    onWindowButtonMinimizeClick = (e) => {
        const { minimizeWindow } = this.props.tablesActions

        minimizeWindow()

        e.stopPropagation()
    }

    /**
     * Closes the window and goes to previous route
     * @method
     */
    onWindowButtonCloseClick = () => {
        const { router } = this.props

        router.push('/databases')
    }

    /**
     * Restores the window
     * @method
     */
    onWindowClick = () => {
        const { restoreWindow } = this.props.tablesActions

        restoreWindow()
    }

    /**
     * Redirects to selected tab
     * */
    onTabsChange = (name) => {
        const { router, params } = this.props

        this.setState({
            selectedTab: name
        })

        router.push(`/databases/${params.database}/${name}`)
    }

    /**
     * Renders Summary container
     * @method
     */
    render() {
        const
            b = block('tables'),
            tabs = [
                { name: 'tables', label: 'Tables'},
                { name: 'query', label: 'Query'}
            ],
            { children, minimized, params } = this.props

        return (
            <div className={b({state: minimized ? 'minimized' : null})}>
                <div className={b('container')} onClick={this.onWindowClick}>
                    <div className={b('header')}>
                        <div className={b('title')}>
                            <Title secondaryTitle={params.database} />
                            <Tabs
                                collapsed={minimized}
                                items={tabs}
                                selected={this.state.selectedTab}
                                onChange={this.onTabsChange} />
                        </div>
                        <div className={b('buttons')}>
                            <button
                                className={b('button', {action: 'minimize'})}
                                onClick={this.onWindowButtonMinimizeClick}></button>
                            <button
                                className={b('button', {action: 'close'})}
                                onClick={this.onWindowButtonCloseClick}></button>
                        </div>
                    </div>
                </div>
                <div className={b('view')}>
                    {children}
                </div>
            </div>
        )
    }
}

function mapStateToProps (state) {
    return {
        minimized: state.tables.minimized,
    }
}

export default connect(mapStateToProps)(Tables)