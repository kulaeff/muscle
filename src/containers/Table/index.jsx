import React from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Spinner from '../../components/Spinner'
import Tabs from '../../components/Tabs'
import Title from '../../components/Title'
import Toolbar, { ToolBarButton, ToolBarSeparator } from '../../components/ToolBar'
import DataTable from '../../components/DataTable'
import * as tableActions from '../../actions/table'
import * as databaseActions from '../../actions/database'
import block from 'bem-cn'
import './style.less';

/**
 * Table container
 * @class
 */
class Table extends React.Component {
    /**
     * Table container properties
     * @static
     * @property {bool} fetching Is data fetching
     * @property {bool} minimized Is window minimized
     * @property {array} items Table and table
     */
    static propTypes = {
        fetching: PropTypes.bool,
        items: PropTypes.array.isRequired,
    }

    /**
     * Creates Table container
     * @constructor
     */
    constructor(props) {
        super(props)

        this.state = {
            selectedIndex: null,
            selectedTab: 'columns',
        }
    }

    /**
     * Fetches table when database was selected for the first time
     * @method
     */
    componentDidMount() {
        const
            { params } = this.props,
            { getColumns } = this.props.tableActions

        getColumns(params.database, params.table)
    }

    /**
     * Fetches table when selected database was changed
     * @method
     */
    componentWillReceiveProps(nextProps) {
        const
            { items, params } = this.props,
            { getColumns } = this.props.tableActions

        if (params.table !== nextProps.params.table) {
            getColumns(params.database, nextProps.params.table)
        } else if (!nextProps.params.hasOwnProperty('column')) {
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
        const { minimizeWindow } = this.props.tableActions

        minimizeWindow()

        e.stopPropagation()   }

    /**
     * Closes the window and goes to previous route
     * @method
     */
    onWindowButtonCloseClick = () => {
        const { router, params } = this.props

        router.push(`/server/${params.database}`)
    }

    /**
     * Restores the window
     * @method
     */
    onWindowClick = () => {
        const { restoreWindow } = this.props.tableActions

        restoreWindow()
    }

    /**
     * Redirects to selected database details
     * @method
     * @param {number} index The index of selected item
     */
    onDataTableChange = (index) => {
        const
            { items, router, params } = this.props,
            { minimizeWindow } = this.props.databaseActions

        this.setState({
            selectedIndex: index
        })

        router.push(`/server/${params.database}/${params.table}/${items[index][0]}`)

        if (JSON.parse(localStorage.getItem('useSmartFolding'))) {
            minimizeWindow()
        }
    }

    /**
     * Redirects to selected tab
     * */
    onTabsChange = (name) => {
        const
            { params } = this.props,
            { getColumns, getIndexes } = this.props.tableActions

        this.setState({
            selectedTab: name
        })

        switch (name) {
            case 'columns':
                getColumns(params.database, params.table)
                break;
            case 'indexes':
                getIndexes(params.database, params.table)
                break;
            case 'rows':
                break;
        }
    }

    /**
     * Renders Summary container
     * @method
     */
    render() {
        const
            b = block('table'),
            columnsColumns = [
                { name: 'name', title: 'Name' },
                { name: 'type', title: 'Type' },
                { name: 'size', title: 'Size'},
                { name: 'collation', title: 'Collation' },
                { name: 'attribute', title: 'Attribute' },
                { name: 'null', title: 'Null' },
                { name: 'default', title: 'Default' },
                { name: 'extra', title: 'Extra' }
            ],
            columnsIndexes = [
                { name: 'key', title: 'Key' },
                { name: 'type', title: 'Type' },
                { name: 'unique', title: 'Unique' },
                { name: 'packed', title: 'Packed' },
                { name: 'column', title: 'Column' },
                { name: 'cardinality', title: 'Cardinality' },
                { name: 'collation', title: 'Collation' },
                { name: 'null', title: 'Null' },
                { name: 'comment', title: 'Comment' }
            ],
            tabs = [
                { name: 'columns', label: 'Columns'},
                { name: 'indexes', label: 'Indexes'},
                { name: 'rows', label: 'Rows'}
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
                                    <Title secondaryTitle={params.table} />
                                }
                                onChange={this.onTabsChange} />
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
                    {
                        this.state.selectedTab === 'columns' && !fetching ?
                            <div className={b('content')}>
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
                                        columns={columnsColumns}
                                        items={items}
                                        selectedIndex={this.state.selectedIndex}
                                        onChange={this.onDataTableChange} />
                                </div>
                            </div>
                        : this.state.selectedTab === 'indexes' && !fetching?
                            <div className={b('content')}>
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
                                        columns={columnsIndexes}
                                        items={items}
                                        selectedIndex={this.state.selectedIndex}
                                        onChange={this.onDataTableChange} />
                                </div>
                            </div>
                        : null
                    }
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
        fetching: state.table.fetching,
        minimized: state.table.minimized,
        items: state.table.items
    }
}

function mapDispatchToProps(dispatch) {
    return {
        tableActions: bindActionCreators(tableActions, dispatch),
        databaseActions: bindActionCreators(databaseActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Table)