import React from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { matchPath } from 'react-router-dom'
import * as actions from '../../actions/columns'
import DataTable, { DataTableRow } from '../../components/DataTable'
import Placeholder from '~/components/Placeholder'
import Spinner from '../../components/Spinner'
import Textbox from '../../components/Textbox'
import Toolbar, { ToolBarButton, ToolBarSeparator } from '../../components/ToolBar'
import block from 'bem-cn'
import bytes from '~/helpers/bytes'
import './style.less';

/**
 * Columns container
 * @class
 */
class Columns extends React.Component {
    /**
     * Database container properties
     * @static
     * @property {bool} fetching Is data fetching
     * @property {bool} minimized Is window minimized
     * @property {array} tables Tables
     */
    static propTypes = {
        columns: PropTypes.array.isRequired,
        fetching: PropTypes.bool.isRequired,
        filter: PropTypes.string.isRequired,
        saving: PropTypes.bool.isRequired,
        getColumns: PropTypes.func.isRequired
    };

    /**
     * Fetches database when database was selected for the first time
     * @method
     */
    componentDidMount() {
        const
            { match } = this.props,
            { getColumns } = this.props;

        getColumns(match.params.database, match.params.table);
    }

    componentWillReceiveProps(nextProps) {
        const { getTables } = this.props;

        if (this.props.match.params.database !== nextProps.match.params.database) {
            getTables(nextProps.match.params.database);
        }
    }

    onActionButtonAddFieldClick = () => {
        const { addTableField } = this.props;

        addTableField();
    };

    onActionButtonRemoveFieldClick = () => {
        const { removeTableField } = this.props;

        removeTableField();
    };

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
     * @returns {string} Transformed value
     */
    onDataTableValueTransform = (column, value) => {
        if (column === 'size' || column === 'overhead') {
            return bytes(value)
        } else {
            return value ? value.toString() : '';
        }
    };

    /**
     * Stores the filter and invokes debounced handler
     */
    onTextboxFilterChange = (e) => {
        e.persist();
    };

    onTextboxTableNameChange = (event) => {
        const { setTableName } = this.props;

        setTableName(event.target.value);
    };

    onTextboxTableCommentChange = (event) => {
        const { setTableComment } = this.props;

        setTableComment(event.target.value);
    };

    onCreateTableModalClose = () => {
        const { closeCreateTableModal } = this.props;

        closeCreateTableModal();
    };

    /**
     * Creates a database
     * @param {Event} event Event
     */
    onCreateTableFormSubmit = (event) => {
        const { createTable } = this.props;

        createTable();

        event.preventDefault();
    };

    handleListBoxFieldsChange = (index) => {
        const { setListBoxFieldsSelectedIndex } = this.props;

        setListBoxFieldsSelectedIndex(index);
    };

    selectTableCollationChange = (value) => {
        const { setTableCollation } = this.props;

        setTableCollation(value);
    };

    selectTableEngineChange = (value) => {
        const { setTableEngine } = this.props;

        setTableEngine(value);
    };

    /**
     * Renders Summary container
     * @method
     */
    render() {
        const
            b = block('tables'),
            dataTableColumns = [
                { name: 'column', label: 'Column' },
                { name: 'type', label: 'Type' },
                { name: 'collation', label: 'Collation' },
                { name: 'attributes', label: 'Attributes' },
                { name: 'null', label: 'Null' },
                { name: 'default', label: 'Default' },
                { name: 'extra', label: 'Extra' },
            ],
            {
                location,
                match,
                columns,
                fetching,
                filter,
                //saving,
            } = this.props,
            _match = matchPath(location.pathname, {
                path: '/server/:database/tables/:table',
                strict: false,
                exact: false
            });

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
                                columns.length ? (
                                    <DataTable
                                        columns={dataTableColumns}
                                        onChange={this.onDataTableChange}
                                        onValueTransform={this.onDataTableValueTransform}
                                    >
                                        {
                                            columns.map((column, index) =>
                                                <DataTableRow
                                                    cells={column}
                                                    key={index}
                                                    selected={_match && _match.params.table === column[0]}
                                                />
                                            )
                                        }
                                    </DataTable>
                                ) : (
                                    <Placeholder text="There are no tables in this database" />
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
        columns: state.columns.columns,
        fetching: state.columns.fetching,
        filter: state.columns.filter,
        saving: state.columns.saving
    }
}

function mapDispatchToProps(dispatch) {
    const {
        getColumns,
    } = actions;

    return  bindActionCreators({
        getColumns
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Columns)