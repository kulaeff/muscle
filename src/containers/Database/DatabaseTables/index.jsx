import React from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { debounce } from 'lodash'
import * as actions from '../../../actions/database'
import DataTable from '../../../components/DataTable/index'
import Placeholder from '../../../components/Placeholder/index'
import Spinner from '../../../components/Spinner/index'
import Textbox from '../../../components/Textbox/index'
import Toolbar, { ToolBarButton, ToolBarSeparator } from '../../../components/ToolBar/index'
import block from 'bem-cn'
import bytes from '../../../helpers/bytes'
import './style.less';

/**
 * Database container
 * @class
 */
class DatabaseTables extends React.Component {
    /**
     * Database container properties
     * @static
     * @property {bool} fetching Is data fetching
     * @property {bool} minimized Is window minimized
     * @property {array} items Items
     */
    static propTypes = {
        fetching: PropTypes.bool,
        items: PropTypes.array.isRequired,
    };

    /**
     * Creates Database container
     * @constructor
     */
    constructor(props) {
        const textboxFilterChangeDelay = 700;

        super(props);

        this.state = {
            filter: '',
            selectedIndex: null,
            selectedTab: 'tables'
        };

        this.debouncedTextboxFilterChange = debounce(this.debouncedTextboxFilterChange, textboxFilterChangeDelay)
    }

    /**
     * Fetches database when database was selected for the first time
     * @method
     */
    componentDidMount() {
        const
            { match } = this.props,
            { getDatabase } = this.props.actions

        getDatabase(match.params.database)
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
     * Redirects to selected table details
     * @method
     * @param {number} index The index of selected item
     */
    onDataTableChange = (index) => {
        const
            { items, history, match } = this.props,
            { minimizeWindow } = this.props.actions

        this.setState({
            selectedIndex: index
        })

        history.push(`${match.url}/${items[index][0]}`)

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
            { match } = this.props,
            { getDatabase } = this.props.actions

        getDatabase(match.params.database, token)
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
            { fetching, items } = this.props;

        return (
            fetching ? (
                <Spinner active={fetching} />
            ) : (
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
                        {
                            items.length
                                ?
                                <DataTable
                                    columns={columns}
                                    items={items}
                                    selectedIndex={this.state.selectedIndex}
                                    onChange={this.onDataTableChange}
                                    onValueTransform={this.onDataTableValueTransform}/>
                                :
                                <Placeholder text="There are no tables in this database" />
                        }
                    </div>
                </div>
            )
        )
    }
}

function mapStateToProps (state) {
    return {
        fetching: state.database.fetching,
        items: state.database.items
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DatabaseTables)