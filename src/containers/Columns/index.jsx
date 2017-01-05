import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Spinner from '../../components/Spinner'
import Toolbar, { ToolBarButton, ToolBarSeparator } from '../../components/ToolBar'
import DataTable from '../../components/DataTable'
import * as columnsActions from '../../actions/columns'
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
     * @property {bool} minimized Is window minimized
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
        super(props)

        this.state = {
            selectedIndex: null,
        }
    }

    /**
     * Fetches columns for selected database
     */
    refresh() {
        const { getColumns } = this.props.columnsActions

        getColumns()
    }

    /**
     * Fetches columns when database was selected for the first time
     * @method
     */
    componentDidMount() {
        this.refresh()
    }

    /**
     * Fetches columns when selected database was changed
     * @method
     */
    componentWillReceiveProps(nextProps) {
        const { items, params } = this.props

        if (params.table !== nextProps.params.table) {
            this.refresh()
        } else if (params.column !== nextProps.params.column && !nextProps.params.hasOwnProperty('column')) {
            this.setState({
                selectedIndex: null
            })
        // Set selectedindex if we came from direct url (/databases/table/<name>)
        } else if (items.length !== nextProps.items.length) {
            this.setState({
                selectedIndex: nextProps.items.findIndex(item => item[0] === params.column)
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
        const { minimizeWindow } = this.props.columnsActions

        minimizeWindow()

        e.stopPropagation()
    }

    /**
     * Closes the window and goes to previous route
     * @method
     */
    onWindowButtonCloseClick = () => {
        const { router, params } = this.props

        router.push(`/databases/${params.database}`)
    }

    /**
     * Restores the window
     * @method
     */
    onWindowClick = () => {
        const { restoreWindow } = this.props.columnsActions

        restoreWindow()
    }

    /**
     * Redirects to selected database details
     * @method
     * @param {number} index The index of selected item
     */
    onListViewChange = (index) => {
        const
            { items, router, params } = this.props

        this.setState({
            selectedIndex: index
        })

        router.push(`/databases/${params.database}/${params.table}/${items[index][0]}`)
    }

    /**
     * Renders Summary container
     * @method
     */
    render() {
        const
            b = block('columns'),
            columns = [
                { id: 'name', title: 'Name' },
                { id: 'type', title: 'Type' },
                { id: 'collation', title: 'Collation' },
                { id: 'attributes', title: 'Attributes' },
                { id: 'null', title: 'Null' },
                { id: 'default', title: 'Default' },
                { id: 'extra', title: 'Extra' }
            ],
            { children, fetching, minimized, items, params } = this.props

        return (
            <div className={b({state: minimized ? 'minimized' : null})}>
                <div className={b('container')} onClick={this.onWindowClick}>
                    <div className={b('header')}>
                        <div className={b('title')}>
                            <span className={b('title-label')}>Columns</span>
                            <span className={b('title-description')}>{params.table}</span>
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
                        <DataTable
                            columns={columns}
                            items={items}
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
        minimized: state.columns.minimized,
        items: state.columns.items
    }
}

function mapDispatchToProps(dispatch) {
    return {
        columnsActions: bindActionCreators(columnsActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Columns)