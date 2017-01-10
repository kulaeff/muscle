import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { debounce } from 'lodash'
import * as tablesActions from '../../actions/tables'
import * as databasesActions from '../../actions/databases'
import DataTable from '../../components/DataTable'
import Spinner from '../../components/Spinner'
import Textbox from '../../components/Textbox'
import Toolbar, { ToolBarButton, ToolBarSeparator } from '../../components/ToolBar'
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
     * @property {bool} fetching Is data fetching
     * @property {bool} minimized Is window minimized
     * @property {array} items Tables and tables
     */
    static propTypes = {
        fetching: PropTypes.bool,
        minimized: PropTypes.bool,
        items: PropTypes.array.isRequired,
    }

    /**
     * Creates Tables container
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
     * Fetches tables for selected database
     */
    refresh() {
        const { getTables } = this.props.tablesActions

        getTables()
    }

    /**
     * Fetches tables when database was selected for the first time
     * @method
     */
    componentDidMount() {
        this.refresh()
    }

    /**
     * Fetches tables when selected database was changed
     * @method
     */
    componentWillReceiveProps(nextProps) {
        const { items, params } = this.props

        // Load tables if selected database has changed
        if (params.database !== nextProps.params.database) {
            this.setState({
                selectedIndex: null
            })

            this.refresh()
        // Reset selectedindex if we close Table container
        } else if (!nextProps.params.hasOwnProperty('table')) {
            this.setState({
                selectedIndex: null
            })
        // Set selectedindex if we came from direct url (/databases/<name>)
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
     * Redirects to selected table details
     * @method
     * @param {number} index The index of selected item
     */
    onDataTableChange = (index) => {
        const
            { items, router, routeParams } = this.props,
            { minimizeWindow } = this.props.databasesActions

        this.setState({
            selectedIndex: index
        })

        router.push(`/databases/${routeParams.database}/${items[index][0]}`)

        if (localStorage.getItem('useSmartFolding')) {
            minimizeWindow()
        }
    }

    /**
     * Gets the list of tables filtered by string (debounced)
     * @function
     * @param {string} filter String used as filter
     */
    debouncedTextboxFilterChange = (token) => {
        const
            { params } = this.props,
            { getTables } = this.props.tablesActions

        getTables(params.database, token)
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
            b = block('tables'),
            columns = [
                { id: 'table', title: 'Table' },
                { id: 'rows', title: 'Rows' },
                { id: 'type', title: 'Type' },
                { id: 'collation', title: 'Collation' },
                { id: 'size', title: 'Size' },
                { id: 'overhead', title: 'Overhead' }
            ],
            { children, fetching, minimized, items, params } = this.props,
            sortedItems = items.sort((a, b) => a.name > b.name)

        return (
            <div className={b({state: minimized ? 'minimized' : null})}>
                <div className={b('container')} onClick={this.onWindowClick}>
                    <div className={b('header')}>
                        <div className={b('title')}>
                            <span className={b('title-label')}>Tables</span>
                            <span className={b('title-description')}>{params.database}</span>
                        </div>
                        <div className={b('spinner')}><Spinner active={fetching} type="rect" /></div>
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
                                title="Create new table"
                                onClick={this.onToolBarButtonCreateDatabaseClick} />
                            <ToolBarButton
                                disabled={this.state.selectedIndex === null}
                                icon="edit"
                                label="Edit"
                                title="Edit table"
                                onClick={this.onToolBarButtonEditDatabaseClick} />
                            <ToolBarSeparator />
                            <ToolBarButton
                                disabled={this.state.selectedIndex === null}
                                icon="delete"
                                label="Delete"
                                title="Delete table"
                                onClick={this.onToolBarButtonDeleteDatabaseClick} />
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
                            items={sortedItems}
                            selectedIndex={this.state.selectedIndex}
                            onChange={this.onDataTableChange} />
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
        fetching: state.tables.fetching,
        minimized: state.tables.minimized,
        items: state.tables.items
    }
}

function mapDispatchToProps(dispatch) {
    return {
        tablesActions: bindActionCreators(tablesActions, dispatch),
        databasesActions: bindActionCreators(databasesActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Tables)