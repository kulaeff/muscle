import React from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
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
        fetching: PropTypes.bool.isRequired,
        filter: PropTypes.string.isRequired,
        items: PropTypes.array.isRequired,
        getTables: PropTypes.func.isRequired
    };

    /**
     * Creates Database container
     * @constructor
     */
    constructor(props) {
        super(props);
    }

    /**
     * Fetches database when database was selected for the first time
     * @method
     */
    componentDidMount() {
        const
            { match } = this.props,
            { getTables } = this.props;

        getTables(match.params.database);
    }

    componentWillReceiveProps(nextProps) {
        const { getTables } = this.props;

        if (this.props.match.params.database !== nextProps.match.params.database) {
            getTables(nextProps.match.params.database);
        }
    }

    /**
     * Show modal when toolbar button Create clicked
     * @method
     */
    onToolBarButtonCreateDatabaseClick = () => {
        console.log('toolbar button Create clicked')
    };

    /**
     * Show modal when toolbar button Edit clicked
     * @method
     */
    onToolBarButtonEditDatabaseClick = () => {
        console.log('toolbar button Edit clicked')
    };

    /**
     * Show confirm modal when toolbar button Delete clicked
     * @method
     */
    onToolBarButtonDeleteDatabaseClick = () => {
        console.log('toolbar button Delete clicked')
    };

    /**
     * Show export window
     * @method
     */
    onToolBarButtonExportTableClick = () => {
        console.log('toolbar button Export clicked')
    };

    /**
     * Show import window
     * @method
     */
    onToolBarButtonImportTableClick = () => {
        console.log('toolbar button Export clicked')
    };

    /**
     * Navigates to the selected table
     * @callback
     * @param {array} row Selected row
     */
    onDataTableChange = (row) => {
        const { match, history } = this.props;

        history.push(`${match.url}/${row[0]}`);
    };

    /**
     * Transforms values
     * @callback
     * @param {string} column Column name
     * @param {number} value Value to be transformed
     * @returns {any} Transformed value
     */
    onDataTableValueTransform = (column, value) => {
        if (column === 'size' || column === 'overhead') {
            return bytes(value)
        } else {
            return value
        }
    };

    /**
     * Stores the filter and invokes debounced handler
     */
    onTextboxFilterChange = (e) => {
        e.persist();
    };

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
            { match, fetching, filter, items } = this.props;

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
                                url={match.url}
                                onClick={this.onToolBarButtonCreateDatabaseClick} />
                            <ToolBarButton
                                icon="edit"
                                label="Edit"
                                title="Edit table"
                                url={`${match.url}/:table`}
                                onClick={this.onToolBarButtonEditDatabaseClick} />
                            <ToolBarButton
                                icon="delete"
                                label="Delete"
                                title="Delete table"
                                url={`${match.url}/:table`}
                                onClick={this.onToolBarButtonDeleteDatabaseClick} />
                            <ToolBarSeparator />
                            <ToolBarButton
                                icon="import"
                                label="Import"
                                title="Import table"
                                url={match.url}
                                onClick={this.onToolBarButtonImportTableClick} />
                            <ToolBarButton
                                icon="export"
                                label="Export"
                                title="Export table"
                                url={`${match.url}/:table`}
                                onClick={this.onToolBarButtonExportTableClick} />
                        </Toolbar>
                    </div>
                    <div className={b('filters')}>
                        <Textbox
                            id="filter"
                            placeholder="Filter by name..."
                            value={filter}
                            onChange={this.onTextboxFilterChange}/>
                    </div>
                    <div className={b('table')}>
                        {
                            items.length ? (
                                <DataTable
                                    columns={columns}
                                    items={items}
                                    url={match.url}
                                    onChange={this.onDataTableChange}
                                    onValueTransform={this.onDataTableValueTransform}/>
                            ) : (
                                <Placeholder text="There are no tables in this database" />
                            )
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
        filter: state.database.filter,
        items: state.database.items
    }
}

function mapDispatchToProps(dispatch) {
    const {
        getTables
    } = actions;

    return  bindActionCreators({
        getTables
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(DatabaseTables)