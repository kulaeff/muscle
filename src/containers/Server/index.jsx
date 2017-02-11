import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Spinner from '../../components/Spinner'
import Textbox from '../../components/Textbox'
import Title from '../../components/Title'
import Toolbar, { ToolBarButton, ToolBarSeparator } from '../../components/ToolBar'
import ListView from '../../components/ListView'
import * as serverActions from '../../actions/server'
import { debounce } from 'lodash'
import block from 'bem-cn'
import './style.less';

/**
 * Server container
 * @class
 */
class Server extends Component {
    /**
     * Server container properties
     * @static
     * @property {bool} fetching Is data fetching
     * @property {bool} minimized Is window minimized
     * @property {array} items Server and tables
     */
    static propTypes = {
        fetching: PropTypes.bool,
        minimized: PropTypes.bool,
        items: PropTypes.array.isRequired,
    }

    /**
     * Creates Server container
     * @constructor
     */
    constructor(props) {
        const textboxFilterChangeDelay = 700

        super(props)

        this.state = {
            filter: '',
            selectedIndex: null,
        }

        this.debouncedTextboxFilterChange = debounce(this.debouncedTextboxFilterChange, textboxFilterChangeDelay)
    }

    /**
     * Fetches data after the component was mounted
     * @method
     */
    componentDidMount() {
        const
            { getServer, restoreWindow } = this.props.serverActions

        restoreWindow()
        getServer()
    }

    /**
     * Refreshes server view
     * @method
     * @param {object} nextProps New properties
     */
    componentWillReceiveProps(nextProps) {
        const { items, params } = this.props

        // We came from direct url (/server/<name>)
        if (nextProps.params.hasOwnProperty('database') && items.length !== nextProps.items.length) {
            const sortedItems = nextProps.items.sort((a, b) => a.name > b.name)

            this.setState({
                selectedIndex: sortedItems.findIndex(item => item.name === params.database)
            })
        // Tables window was closed
        } else if (!nextProps.params.hasOwnProperty('database')) {
            this.setState({
                selectedIndex: null
            })
        }
    }

    /**
     * Show modal when toolbar button Create clicked
     * @method
     */
    onToolBarButtonCreateDatabaseClick = () => {
        console.log('toolbar button Create cliked')
    }

    /**
     * Show modal when toolbar button Edit clicked
     * @method
     */
    onToolBarButtonEditDatabaseClick = () => {
        console.log('toolbar button Edit cliked')
    }

    /**
     * Show confirm modal when toolbar button Delete clicked
     * @method
     */
    onToolBarButtonDeleteDatabaseClick = () => {
        console.log('toolbar button Delete cliked')
    }

    /**
     * Minimizes the window
     * @method
     */
    onWindowButtonMinimizeClick = (e) => {
        const { minimizeWindow } = this.props.serverActions

        minimizeWindow()

        e.stopPropagation()
    }

    /**
     * Closes the window and goes to previous route
     * @method
     */
    onWindowButtonCloseClick = () => {
        const { router } = this.props

        router.push('/')
    }

    /**
     * Restores the window
     * @method
     */
    onWindowClick = () => {
        const { restoreWindow } = this.props.serverActions

        restoreWindow()
    }

    /**
     * Redirects to selected database details
     * @method
     * @param {number} index The index of selected item
     */
    onListViewChange = (index) => {
        const
            { items, router } = this.props,
            sortedItems = items.sort((a, b) => a.name > b.name)

        this.setState({
            selectedIndex: index
        })

        router.push(`/server/${sortedItems[index].name}`)
    }

    /**
     * Gets the list of server filtered by string (debounced)
     * @function
     * @param {string} filter String used as filter
     */
    debouncedTextboxFilterChange = (token) => {
        const { getServer } = this.props.serverActions

        getServer(token)
    }

    /**
     * Stores the filter and invokes debounced handler
     */
    onTextboxFilterChange = (e) => {
        e.persist()

        this.setState({
            filter: e.target.value
        })

        this.debouncedTextboxFilterChange(this.state.filter)
    }

    /**
     * Renders Summary container
     * @method
     */
    render() {
        const
            b = block('server'),
            { children, fetching, minimized, items } = this.props,
            sortedItems = items.sort((a, b) => a.name > b.name)

        return (
            <div className={b({state: minimized ? 'minimized' : null})}>
                <div className={b('container')} onClick={this.onWindowClick}>
                    <div className={b('header')}>
                        <div className={b('title')}>
                            <Title primaryTitle="Server" />
                        </div>
                        <div className={b('spinner')}>
                            <Spinner active={fetching} type="rect" />
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
                    <div className={b('toolbar')}>
                        <Toolbar>
                            <ToolBarButton
                                icon="create"
                                label="New"
                                title="Create new database"
                                onClick={this.onToolBarButtonCreateDatabaseClick} />
                            <ToolBarButton
                                disabled={this.state.selectedIndex === null}
                                icon="edit"
                                label="Edit"
                                title="Edit database"
                                onClick={this.onToolBarButtonEditDatabaseClick} />
                            <ToolBarButton
                                disabled={this.state.selectedIndex === null}
                                icon="delete"
                                label="Delete"
                                title="Delete database"
                                onClick={this.onToolBarButtonDeleteDatabaseClick} />
                            <ToolBarSeparator />
                            <ToolBarButton
                                disabled={this.state.selectedIndex === null}
                                icon="import"
                                label="Import"
                                title="Import database"
                                onClick={this.onToolBarButtonEditDatabaseClick} />
                            <ToolBarButton
                                disabled={this.state.selectedIndex === null}
                                icon="export"
                                label="Export"
                                title="Export database"
                                onClick={this.onToolBarButtonEditDatabaseClick} />
                        </Toolbar>
                    </div>
                    <div className={b('filters')}>
                        <Textbox
                            id="filter"
                            placeholder="Filter by name..."
                            value={this.state.filter}
                            onChange={this.onTextboxFilterChange}/>
                    </div>
                    <div className={b('table')}>
                        <ListView
                            icon="database"
                            items={sortedItems}
                            selectedIndex={this.state.selectedIndex}
                            onChange={this.onListViewChange} />
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
        fetching: state.server.fetching,
        minimized: state.server.minimized,
        items: state.server.items
    }
}

function mapDispatchToProps(dispatch) {
    return {
        serverActions: bindActionCreators(serverActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Server)