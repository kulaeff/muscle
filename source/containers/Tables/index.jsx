import React from 'react'
import ReactModal from 'react-modal'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { matchPath } from 'react-router-dom'
import * as actions from '../../actions/tables'
import * as actions_ from '../../actions/server'
import Button from '../../components/Button'
import ButtonGroup from '../../components/ButtonGroup'
import DataTable, { DataTableRow } from '../../components/DataTable'
import Form, { FormField }  from '../../components/Form'
import Flex, { FlexItem, FlexSeparator } from '../../components/Flex'
import Placeholder from '~/components/Placeholder'
import Select from '../../components/Select'
import Spinner from '../../components/Spinner'
import Textbox from '../../components/Textbox'
import Title from '../../components/Title'
import Toolbar, { ToolBarButton, ToolBarSeparator } from '../../components/ToolBar'
import block from 'bem-cn'
import bytes from '~/helpers/bytes'
import './style.less';

/**
 * Data table columns
 * @constant
 * @type {Array}
 */
const COLUMNS = [
    { name: 'table', label: 'Table' },
    { name: 'rowCount', label: 'Rows', style: { alignment: 'right' } },
    { name: 'engine', label: 'Engine' },
    { name: 'collation', label: 'Collation' },
    { name: 'size', label: 'Size', style: { alignment: 'right' } },
    { name: 'overhead', label: 'Overhead', style: { alignment: 'right' } }
];

/**
 * Database container
 * @class
 */
class Tables extends React.Component {
    /**
     * Fetches database when database was selected for the first time
     * @method
     */
    componentDidMount() {
        const { getTables } = this.props;

        getTables();
    }

    /**
     * Fetches database when database was selected for the first time
     * @method
     */
    componentWillMount() {
        const { match, setCurrentDatabase } = this.props;

        setCurrentDatabase(match.params.database);
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
     * @param {object} row Selected row
     */
    onDataTableChange = (row) => {
        const { match, history, minimizeWindow } = this.props;

        history.push(`${match.url}/${row.table}`);

        if (JSON.parse(localStorage.getItem('useSmartFolding'))) {
            minimizeWindow()
        }
    };

    /**
     * Transforms values
     * @callback
     * @param {array} row Row
     * @param {object} column Column name
     * @param {*} value Value to be transformed
     * @returns {*} Transformed value
     */
    onDataTableValueTransform = (row, column, value) => {
        if (column.name === 'size' || column.name === 'overhead') {
            return bytes(value);
        } else {
            return value;
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

    /**
     * Closes the Create Table modal
     * @method
     */
    formCreateTableReset = () => {
        const { closeCreateTableModal } = this.props;

        closeCreateTableModal();
    };

    /**
     * Creates a database
     * @method
     * @param {Event} event Event
     */
    formCreateTableSubmit = (e) => {
        const { createTable } = this.props;

        createTable();

        e.preventDefault();
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
            {
                location,
                collations,
                collationsLoading,
                engines,
                enginesLoading,
                fetching,
                filter,
                tables,
                modalCreateTableVisible,
                saving,
                tableCollation,
                tableComment,
                tableEngine,
                tableName
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
                                    onClick={this.onToolBarButtonCreateDatabaseClick}
                                />
                                <ToolBarButton
                                    disabled={!_match}
                                    icon="edit"
                                    label="Edit"
                                    title="Edit table"
                                    onClick={this.onToolBarButtonEditDatabaseClick}
                                />
                                <ToolBarButton
                                    disabled={!_match}
                                    icon="delete"
                                    label="Delete"
                                    title="Delete table"
                                    onClick={this.onToolBarButtonDeleteDatabaseClick}
                                />
                                <ToolBarSeparator />
                                <ToolBarButton
                                    icon="import"
                                    label="Import"
                                    title="Import table"
                                    onClick={this.onToolBarButtonImportTableClick}
                                />
                                <ToolBarButton
                                    disabled={!_match}
                                    icon="export"
                                    label="Export"
                                    title="Export table"
                                    onClick={this.onToolBarButtonExportTableClick}
                                />
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
                                tables.length ? (
                                    <DataTable
                                        columns={COLUMNS}
                                        onChange={this.onDataTableChange}
                                        onValueTransform={this.onDataTableValueTransform}
                                    >
                                        {
                                            tables.map((table, index) =>
                                                <DataTableRow
                                                    cells={table}
                                                    key={index}
                                                    selected={_match && _match.params.table === table.table}
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
                    {/* Create Table */}
                    <ReactModal
                        ariaHideApp={true}
                        className="ReactModal__Content-Small"
                        closeTimeoutMS={180}
                        contentLabel="Create new table modal"
                        isOpen={modalCreateTableVisible}
                        overlayClassName="ReactModal__Overlay"
                        onRequestClose={this.formCreateTableReset}
                        parentSelector={() => document.body}
                        shouldCloseOnOverlayClick={true}
                    >
                        <Form
                            onReset={this.formCreateTableReset}
                            onSubmit={this.formCreateTableSubmit}
                        >
                            <Flex flow="column">
                                <FlexItem>
                                    <Flex>
                                        <FlexItem>
                                            <Title primaryTitle="New table" size="large" />
                                        </FlexItem>
                                        <FlexItem size="auto">
                                            <Spinner active={saving} position="static" size="small" />
                                        </FlexItem>
                                    </Flex>
                                </FlexItem>
                                <FlexSeparator/>
                                <FlexItem>
                                    {/* Column 1 */}
                                    <Flex flow="column">
                                        <FlexItem>
                                            <FormField id="name" label="Name">
                                                <Textbox
                                                    autoFocus={true}
                                                    id="name"
                                                    name="name"
                                                    required={true}
                                                    value={tableName}
                                                    onChange={this.onTextboxTableNameChange}
                                                />
                                            </FormField>
                                        </FlexItem>
                                        <FlexSeparator size="half"/>
                                        <FlexItem>
                                            <FormField id="comment" label="Comment">
                                                <Textbox
                                                    id="comment"
                                                    name="comment"
                                                    required={true}
                                                    value={tableComment}
                                                    onChange={this.onTextboxTableCommentChange}
                                                />
                                            </FormField>
                                        </FlexItem>
                                        <FlexSeparator size="half"/>
                                        <FlexItem>
                                            <FormField id="collation" label="Collation">
                                                <Select
                                                    id="collation"
                                                    loading={collationsLoading}
                                                    name="collation"
                                                    options={collations}
                                                    placeholder="Select a collation"
                                                    value={tableCollation}
                                                    onChange={this.selectTableCollationChange}
                                                />
                                            </FormField>
                                        </FlexItem>
                                        <FlexSeparator size="half"/>
                                        <FlexItem>
                                            <FormField id="engine" label="engine">
                                                <Select
                                                    id="engine"
                                                    loading={enginesLoading}
                                                    name="engine"
                                                    options={engines}
                                                    placeholder="Select an engine"
                                                    value={tableEngine}
                                                    onChange={this.selectTableEngineChange}
                                                />
                                            </FormField>
                                        </FlexItem>
                                    </Flex>
                                </FlexItem>
                                <FlexSeparator />
                                <FlexItem size="auto">
                                    <ButtonGroup align="right">
                                        <Button
                                            label="Cancel"
                                            type="reset"
                                        />
                                        <Button
                                            disabled={tableName.length === 0 || saving}
                                            label="Create"
                                            type="submit"
                                        />
                                    </ButtonGroup>
                                </FlexItem>
                            </Flex>
                        </Form>
                    </ReactModal>
                </div>
            )
        )
    }
}

/**
 * Properties
 * @static
 */
Tables.propTypes = {
    collations: PropTypes.array.isRequired,
    collationsLoading: PropTypes.bool.isRequired,
    engines: PropTypes.array.isRequired,
    enginesLoading: PropTypes.bool.isRequired,
    fetching: PropTypes.bool.isRequired,
    filter: PropTypes.string.isRequired,
    tables: PropTypes.array.isRequired,
    modalCreateTableVisible: PropTypes.bool.isRequired,
    saving: PropTypes.bool.isRequired,
    tableCollation: PropTypes.string.isRequired,
    tableComment: PropTypes.string.isRequired,
    tableEngine: PropTypes.string.isRequired,
    tableName: PropTypes.string.isRequired,
    closeCreateTableModal: PropTypes.func.isRequired,
    createTable: PropTypes.func.isRequired,
    getTables: PropTypes.func.isRequired,
    minimizeWindow: PropTypes.func.isRequired,
    openCreateTableModal: PropTypes.func.isRequired,
    setCurrentDatabase: PropTypes.func.isRequired,
    setTableCollation: PropTypes.func.isRequired,
    setTableComment: PropTypes.func.isRequired,
    setTableEngine: PropTypes.func.isRequired,
    setTableName: PropTypes.func.isRequired
};

function mapStateToProps (state) {
    return {
        collations: state.tables.collations,
        collationsLoading: state.tables.collationsLoading,
        engines: state.tables.engines,
        enginesLoading: state.tables.enginesLoading,
        fetching: state.tables.fetching,
        filter: state.tables.filter,
        tables: state.tables.tables,
        modalCreateTableVisible: state.tables.modalCreateTableVisible,
        saving: state.tables.saving,
        tableCollation: state.tables.tableCollation,
        tableComment: state.tables.tableComment,
        tableEngine: state.tables.tableEngine,
        tableName: state.tables.tableName
    }
}

function mapDispatchToProps(dispatch) {
    const
        {
            closeCreateTableModal,
            createTable,
            getTables,
            openCreateTableModal,
            setCurrentDatabase,
            setTableCollation,
            setTableComment,
            setTableEngine,
            setTableName
        } = actions,
        { minimizeWindow } = actions_;

    return bindActionCreators({
        closeCreateTableModal,
        createTable,
        getTables,
        minimizeWindow,
        openCreateTableModal,
        setCurrentDatabase,
        setTableCollation,
        setTableComment,
        setTableEngine,
        setTableName
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Tables)