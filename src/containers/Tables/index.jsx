import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { debounce } from 'lodash'
import * as tablesActions from '../../actions/tables'
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
            selectedIndex: null,
        }

        this.debouncedTextboxFilterChange = debounce(this.debouncedTextboxFilterChange, textboxFilterChangeDelay)
    }

    /**
     * Fetches tables for selected database
     */
    refreshTables() {
        const { getTables } = this.props.tablesActions

        getTables()
    }

    /**
     * Fetches tables when database was selected for the first time
     * @method
     */
    componentDidMount() {
        this.refreshTables()
    }

    /**
     * Fetches tables when selected database was changed
     * @method
     */
    componentWillReceiveProps(nextProps) {
        const { items, params } = this.props

        // Load tables if selected database has changed
        if (params.database !== nextProps.params.database) {
            this.refreshTables()
        // Set selectedindex if we came from direct url (/databases/<name>)
        } else if (items.length !== nextProps.items.length) {
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
     * Redirects to selected database details
     * @method
     * @param {number} index The index of selected item
     */
    onDataTableChange = (index) => {
        const
            { items, router, routeParams } = this.props

        this.setState({
            selectedIndex: index
        })

        router.push(`/databases/${routeParams.database}/${items[index][0]}`)
    }

    /**
     * Debounces textbox change handler
     */
    debouncedTextboxFilterChange = (e) => {
        const { setTablesFilter } = this.props.tablesActions

        setTablesFilter(e.target.value)
    }

    /**
     * Filters tables
     */
    onTextboxFilterChange = (e) => {
        e.persist()

        this.debouncedTextboxFilterChange(e)
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
        tablesActions: bindActionCreators(tablesActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Tables)