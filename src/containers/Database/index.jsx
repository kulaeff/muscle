import React from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { debounce } from 'lodash'
import * as databaseActions from '../../actions/database'
import * as serverActions from '../../actions/server'
import DataTable from '../../components/DataTable'
import Spinner from '../../components/Spinner'
import Tabs from '../../components/Tabs'
import Textbox from '../../components/Textbox'
import Title from '../../components/Title'
import Toolbar, { ToolBarButton, ToolBarSeparator } from '../../components/ToolBar'
import block from 'bem-cn'
import bytes from '../../helpers/bytes'
import './style.less';

/**
 * Database container
 * @class
 */
class Database extends React.Component {
    /**
     * Database container properties
     * @static
     * @property {bool} fetching Is data fetching
     * @property {bool} minimized Is window minimized
     * @property {array} items Items
     */
    static propTypes = {
        fetching: PropTypes.bool,
        minimized: PropTypes.bool,
        items: PropTypes.array.isRequired,
    }

    /**
     * Creates Database container
     * @constructor
     */
    constructor(props) {
        const textboxFilterChangeDelay = 700

        super(props)

        this.state = {
            filter: '',
            selectedIndex: null,
            selectedTab: 'tables'
        }

        this.debouncedTextboxFilterChange = debounce(this.debouncedTextboxFilterChange, textboxFilterChangeDelay)
    }

    /**
     * Fetches database when database was selected for the first time
     * @method
     */
    componentDidMount() {
        const
            { params } = this.props,
            { getDatabase } = this.props.databaseActions

        getDatabase(params.database, this.state.filter)
    }

    /**
     * Fetches database when selected database was changed
     * @method
     */
    componentWillReceiveProps(nextProps) {
        const
            { items, params } = this.props,
            { getDatabase, restoreWindow } = this.props.databaseActions

        // Selected database has changed
        if (params.database !== nextProps.params.database) {
            this.setState({
                selectedIndex: null
            })

            restoreWindow()

            getDatabase(nextProps.params.database, this.state.filter)
        // Table view was closed
        } else if (!nextProps.params.hasOwnProperty('table')) {
            this.setState({
                selectedIndex: null
            })
        // Came from direct url (/databases/<name>)
        } else if (nextProps.params.hasOwnProperty('table') && items.length !== nextProps.items.length) {
            this.setState({
                selectedIndex: nextProps.items.findIndex(item => item[0] === params.table)
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
     * Show export window
     * @method
     */
    onToolBarButtonExportTableClick = () => {
        console.log('toolbar button Export cliked')
    }

    /**
     * Show import window
     * @method
     */
    onToolBarButtonImportTableClick = () => {
        console.log('toolbar button Export cliked')
    }

    /**
     * Minimizes the window
     * @method
     */
    onWindowButtonMinimizeClick = (e) => {
        const { minimizeWindow } = this.props.databaseActions

        minimizeWindow()

        e.stopPropagation()
    }

    /**
     * Closes the window and goes to previous route
     * @method
     */
    onWindowButtonCloseClick = () => {
        const { router } = this.props

        router.push('/server')
    }

    /**
     * Restores the window
     * @method
     */
    onWindowClick = () => {
        const { restoreWindow } = this.props.databaseActions

        restoreWindow()
    }

    /**
     * Redirects to selected table details
     * @method
     * @param {number} index The index of selected item
     */
    onDataTableChange = (index) => {
        const
            { items, router, routeParams } = this.props,
            { minimizeWindow } = this.props.serverActions

        this.setState({
            selectedIndex: index
        })

        router.push(`/server/${routeParams.database}/${items[index][0]}`)

        if (JSON.parse(localStorage.getItem('useSmartFolding'))) {
            minimizeWindow()
        }
    }

    onDataTableValueTransform = (column, value) => {
        if (column === 'size' || column === 'overhead') {
            return bytes(value)
        } else {
            return value
        }
    }

    /**
     * Gets the list of database filtered by string (debounced)
     * @function
     * @param {string} filter String used as filter
     */
    debouncedTextboxFilterChange = (token) => {
        const
            { params } = this.props,
            { getDatabase } = this.props.databaseActions

        getDatabase(params.database, token)
    }

    /**
     * Redirects to selected tab
     * */
    onTabsChange = (name) => {
        this.setState({
            selectedTab: name
        })
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
            b = block('database'),
            columns = [
                { name: 'table', title: 'Table' },
                { name: 'rows', title: 'Rows', style: { alignment: 'right' } },
                { name: 'type', title: 'Type' },
                { name: 'collation', title: 'Collation' },
                { name: 'size', title: 'Size', style: { alignment: 'right' } },
                { name: 'overhead', title: 'Overhead', style: { alignment: 'right' } }
            ],
            tabs = [
                { name: 'tables', label: 'Tables'},
                { name: 'query', label: 'Query'}
            ],
            { children, fetching, minimized, items, params } = this.props

        return (
            <div className={b({state: minimized ? 'minimized' : null})}>
                <div className={b('container')} onClick={this.onWindowClick}>
                    <div className={b('header')}>
                        <div className={b('title')}>
                            <Tabs
                                collapsed={minimized}
                                items={tabs}
                                selected={this.state.selectedTab}
                                title={
                                    <Title secondaryTitle={params.database} />
                                }
                                onChange={this.onTabsChange} />
                        </div>
                        <div className={b('spinner')}><Spinner active={fetching} type="rect" /></div>
                        <div className={b('buttons')}>
                            <button
                                className={b('button', {action: 'minimize'})}
                                onClick={this.onWindowButtonMinimizeClick} />
                            <button
                                className={b('button', {action: 'close'})}
                                onClick={this.onWindowButtonCloseClick} />
                        </div>
                    </div>
                    <div className={b('content', {
                        visibility: this.state.selectedTab !== 'tables' ? 'hidden' : null
                    })}>
                        <div className={b('toolbar')}>
                            <Toolbar>
                                <ToolBarButton
                                    icon="create"
                                    label="New"
                                    title="Create new table"
                                    onClick={this.onToolBarButtonCreateDatabaseClick} />
                                <ToolBarButton
                                    disabled={this.state.selectedIndex === null}
                                    icon="edit"
                                    label="Edit"
                                    title="Edit table"
                                    onClick={this.onToolBarButtonEditDatabaseClick} />
                                <ToolBarButton
                                    disabled={this.state.selectedIndex === null}
                                    icon="delete"
                                    label="Delete"
                                    title="Delete table"
                                    onClick={this.onToolBarButtonDeleteDatabaseClick} />
                                <ToolBarSeparator />
                                <ToolBarButton
                                    disabled={this.state.selectedIndex === null}
                                    icon="import"
                                    label="Import"
                                    title="Import table"
                                    onClick={this.onToolBarButtonImportDatabaseClick} />
                                <ToolBarButton
                                    disabled={this.state.selectedIndex === null}
                                    icon="export"
                                    label="Export"
                                    title="Export table"
                                    onClick={this.onToolBarButtonExportDatabaseClick} />
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
                            <DataTable
                                columns={columns}
                                items={items}
                                selectedIndex={this.state.selectedIndex}
                                onChange={this.onDataTableChange}
                                onValueTransform={this.onDataTableValueTransform} />
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
        fetching: state.database.fetching,
        minimized: state.database.minimized,
        items: state.database.items
    }
}

function mapDispatchToProps(dispatch) {
    return {
        databaseActions: bindActionCreators(databaseActions, dispatch),
        serverActions: bindActionCreators(serverActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Database)