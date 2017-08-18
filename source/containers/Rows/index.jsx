import React from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actions from '../../actions/rows'
import DataTable, { DataTableRow } from '../../components/DataTable'
import Placeholder from '~/components/Placeholder'
import Spinner from '../../components/Spinner'
import Textbox from '../../components/Textbox'
import Toolbar, { ToolBarButton } from '../../components/ToolBar'
import block from 'bem-cn'
import './style.less';

/**
 * Rows container
 * @class
 */
class Rows extends React.Component {
    /**
     * Database container properties
     * @static
     * @property {bool} fetching Is data fetching
     * @property {bool} minimized Is window minimized
     * @property {array} rows Rows
     */
    static propTypes = {
        columns: PropTypes.array.isRequired,
        fetching: PropTypes.bool.isRequired,
        filter: PropTypes.string.isRequired,
        rows: PropTypes.array.isRequired,
        saving: PropTypes.bool.isRequired,
        getRows: PropTypes.func.isRequired
    };

    /**
     * Fetches database when database was selected for the first time
     * @method
     */
    componentDidMount() {
        const
            { match } = this.props,
            { getRows } = this.props;

        getRows(match.params.database, match.params.table);
    }

    componentWillReceiveProps(nextProps) {
        const { getRows } = this.props;

        if (this.props.match.params.table !== nextProps.match.params.table) {
            getRows(nextProps.match.params.database, nextProps.match.params.table);
        }
    }

    /**
     * Show modal when toolbar button Create clicked
     * @method
     */
    onToolBarButtonCreateDatabaseClick = () => {
        const { openCreateTableModal } = this.props;

        openCreateTableModal();
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
     * Navigates to the selected table
     * @callback
     * @param {array} row Selected row
     */
    dataTableChange = (row) => {
        console.log(row);
    };

    /**
     * Transforms values
     * @callback
     * @param {object} row Current row
     * @param {object} column Current column
     * @param {*} value A value of the column
     * @returns {*} Transformed value
     */
    dataTableValueTransform = (row, column, value) => {
        switch (column.name) {
            case 'column':
                return <span title={row.comment}>{value}</span>;
            case 'default':
                return value ? 'NULL' : 'NO';
            default:
                return value;
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
            b = block('rows'),
            {
                match,
                columns,
                rows,
                fetching,
                filter,
                //saving,
            } = this.props;

        return (
            fetching ? (
                <Spinner active={fetching} />
            ) : (
                <div className={b()}>
                    {/* CONTENT */}
                    <div className={b('content')}>
                        <div className={b('toolbar')}>
                            <Toolbar>
                                <ToolBarButton
                                    icon="create"
                                    label="New"
                                    title="Create a new column"
                                    url={match.url}
                                    onClick={this.onToolBarButtonCreateDatabaseClick} />
                                <ToolBarButton
                                    icon="edit"
                                    label="Edit"
                                    title="Edit selected column"
                                    url={`${match.url}/:table`}
                                    onClick={this.onToolBarButtonEditDatabaseClick} />
                                <ToolBarButton
                                    icon="delete"
                                    label="Delete"
                                    title="Delete selected column"
                                    url={`${match.url}/:table`}
                                    onClick={this.onToolBarButtonDeleteDatabaseClick} />
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
                                rows.length ? (
                                    <DataTable
                                        columns={columns}
                                        onChange={this.dataTableChange}
                                        onValueTransform={this.dataTableValueTransform}
                                    >
                                        {
                                            rows.map((row, index) =>
                                                <DataTableRow
                                                    cells={row}
                                                    key={index}
                                                />
                                            )
                                        }
                                    </DataTable>
                                ) : (
                                    <Placeholder text="There are no rows in this table" />
                                )
                            }
                        </div>
                    </div>
                    {/* MODALS */}
                </div>
            )
        )
    }
}

function mapStateToProps (state) {
    return {
        columns: state.rows.columns,
        fetching: state.rows.fetching,
        filter: state.rows.filter,
        rows: state.rows.rows,
        saving: state.rows.saving
    }
}

function mapDispatchToProps(dispatch) {
    const {
        getRows,
    } = actions;

    return  bindActionCreators({
        getRows
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Rows)