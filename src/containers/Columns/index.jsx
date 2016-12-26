import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Spinner from '../../components/Spinner'
import Toolbar, { ToolBarButton, ToolBarSeparator } from '../../components/ToolBar'
import ListView from '../../components/ListView'
import * as columnsActions from '../../actions/columns'
import { debounce } from 'lodash'
import block from 'bem-cn'
import './style.less';

/**
 * Columns container
 * @class
 */
class Columns extends Component {
    /**
     * Columns container properties
     * @static
     * @property {bool} fetching Is data fetching
     * @property {array} items Columns and columns
     */
    static propTypes = {
        fetching: PropTypes.bool,
        items: PropTypes.array.isRequired,
    }

    /**
     * Creates Columns container
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
     * Fetches columns for selected database
     */
    refreshColumns() {
        const { getColumns } = this.props.columnsActions

        getColumns()
    }

    /**
     * Fetches columns when database was selected for the first time
     * @method
     */
    componentDidMount() {
        this.refreshColumns()
    }

    /**
     * Fetches columns when selected database was changed
     * @method
     */
    componentWillReceiveProps(nextProps) {
        if (this.props.routeParams.database !== nextProps.routeParams.database) {
            this.refreshColumns()
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
        const { setColumnsFilter } = this.props.columnsActions

        setColumnsFilter(e.target.value)
    }

    /**
     * Filters columns
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
            b = block('columns'),
            { children, fetching, items, params } = this.props,
            sortedItems = items.sort((a, b) => a.name > b.name)

        return (
            <div className={b({state: this.state.minimized ? 'minimized' : null})}>
                <div className={b('container')} onClick={this.onWindowClick}>
                    <div className={b('header')}>
                        <div className={b('title')}>
                            <span className={b('title', {role: 'title'})}>Columns</span>
                            <span className={b('title', {role: 'caption'})}>{params.table}</span>
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
                    <div className={b('table')}>
                        <ListView
                            icon="table"
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
        fetching: state.columns.fetching,
        items: state.columns.items
    }
}

function mapDispatchToProps(dispatch) {
    return {
        columnsActions: bindActionCreators(columnsActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Columns)