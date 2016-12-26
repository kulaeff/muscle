import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Spinner from '../../components/Spinner'
import Textbox from '../../components/Textbox'
import Toolbar, { ToolBarButton, ToolBarSeparator } from '../../components/ToolBar'
import ListView from '../../components/ListView'
import * as tablesActions from '../../actions/tables'
import { debounce } from 'lodash'
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
     * @property {array} items Tables and tables
     */
    static propTypes = {
        fetching: PropTypes.bool,
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
            minimized: false
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
        if (this.props.routeParams.database !== nextProps.routeParams.database) {
            this.refreshTables()
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
    onWindowButtonMinimizeClick = () => {
        this.setState({
            minimized: true
        })
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
        if (this.state.minimized) {
            this.setState({
                minimized: false
            })
        }
    }

    /**
     * Redirects to selected database details
     * @method
     * @param {number} index The index of selected item
     */
    onListViewChange = (index) => {
        const
            { items, router, routeParams } = this.props,
            sortedItems = items.sort((a, b) => a.name > b.name)

        this.setState({
            selectedIndex: index
        })

        console.log(this.props)

        router.push(`/databases/${routeParams.database}/${sortedItems[index].name}`)
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
            { children, fetching, items, routeParams } = this.props,
            sortedItems = items.sort((a, b) => a.name > b.name)

        return (
            <div className={b({state: this.state.minimized ? 'minimized' : null})}>
                <div className={b('container')} onClick={this.onWindowClick}>
                    <div className={b('header')}>
                        <div className={b('title')}>
                            <span className={b('title', {role: 'title'})}>Tables</span>
                            <span className={b('title', {role: 'caption'})}>{routeParams.database}</span>
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
                        <Textbox name="filter" placeholder="Filter by name..." onChange={this.onTextboxFilterChange}/>
                    </div>
                    <div className={b('table')}>
                        <ListView
                            icon="table"
                            items={sortedItems}
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
        fetching: state.tables.fetching,
        items: state.tables.items
    }
}

function mapDispatchToProps(dispatch) {
    return {
        tablesActions: bindActionCreators(tablesActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Tables)