import React from 'react'
import ReactModal from 'react-modal'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { matchPath } from 'react-router-dom'
import * as actions from '../../actions/tables'
import ActionButton from '../../components/ActionButton'
import Button from '../../components/Button'
import ButtonGroup from '../../components/ButtonGroup'
import DataTable, { DataTableRow } from '../../components/DataTable'
import Form, { FormField }  from '../../components/Form'
import Flex, { FlexItem, FlexSeparator } from '../../components/Flex'
import ListBox, { ListBoxItem } from '../../components/ListBox'
import Placeholder from '~/components/Placeholder'
import PropertyEditor from '../../components/PropertyEditor'
import Select from '../../components/Select'
import Spinner from '../../components/Spinner'
import Textbox from '../../components/Textbox'
import Title from '../../components/Title'
import Toolbar, { ToolBarButton, ToolBarSeparator } from '../../components/ToolBar'
import block from 'bem-cn'
import bytes from '~/helpers/bytes'
import './style.less';

/**
 * Database container
 * @class
 */
class Tables extends React.Component {
    /**
     * Database container properties
     * @static
     * @property {bool} fetching Is data fetching
     * @property {bool} minimized Is window minimized
     * @property {array} tables Tables
     */
    static propTypes = {
        collations: PropTypes.array.isRequired,
        collationsLoading: PropTypes.bool.isRequired,
        engines: PropTypes.array.isRequired,
        enginesLoading: PropTypes.bool.isRequired,
        fetching: PropTypes.bool.isRequired,
        filter: PropTypes.string.isRequired,
        tables: PropTypes.array.isRequired,
        listBoxFieldsSelectedIndex: PropTypes.number.isRequired,
        modalCreateTableVisible: PropTypes.bool.isRequired,
        saving: PropTypes.bool.isRequired,
        tableCollation: PropTypes.string.isRequired,
        tableComment: PropTypes.string.isRequired,
        tableEngine: PropTypes.string.isRequired,
        tableFields: PropTypes.array.isRequired,
        tableName: PropTypes.string.isRequired,
        addTableField: PropTypes.func.isRequired,
        closeCreateTableModal: PropTypes.func.isRequired,
        getTables: PropTypes.func.isRequired,
        openCreateTableModal: PropTypes.func.isRequired,
        removeTableField: PropTypes.func.isRequired,
        setListBoxFieldsSelectedIndex: PropTypes.func.isRequired,
        setTableCollation: PropTypes.func.isRequired,
        setTableComment: PropTypes.func.isRequired,
        setTableEngine: PropTypes.func.isRequired,
        setTableName: PropTypes.func.isRequired
    };

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
            columns = [
                { name: 'table', label: 'Table' },
                { name: 'rows', label: 'Rows', style: { alignment: 'right' } },
                { name: 'type', label: 'Type' },
                { name: 'collation', label: 'Collation' },
                { name: 'size', label: 'Size', style: { alignment: 'right' } },
                { name: 'overhead', label: 'Overhead', style: { alignment: 'right' } }
            ],
            {
                location,
                match,
                collations,
                collationsLoading,
                engines,
                enginesLoading,
                fetching,
                filter,
                tables,
                listBoxFieldsSelectedIndex,
                modalCreateTableVisible,
                saving,
                tableCollation,
                tableComment,
                tableEngine,
                tableFields,
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
                                tables.length ? (
                                    <DataTable
                                        columns={columns}
                                        onChange={this.onDataTableChange}
                                        onValueTransform={this.onDataTableValueTransform}
                                    >
                                        {
                                            tables.map((table, index) =>
                                                <DataTableRow
                                                    cells={table}
                                                    key={index}
                                                    selected={_match && _match.params.table === table[0]}
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
                        className="ReactModal__Content-Large"
                        closeTimeoutMS={240}
                        contentLabel="Create new table modal"
                        isOpen={modalCreateTableVisible}
                        overlayClassName="ReactModal__Overlay"
                        onRequestClose={this.onCreateTableModalClose}
                        parentSelector={() => document.body}
                        shouldCloseOnOverlayClick={true}
                    >
                        <Flex>
                            <FlexItem>
                                <Title primaryTitle="New table" size="large" />
                            </FlexItem>
                            <FlexItem size="auto">
                                <Spinner active={saving} type="rect" />
                            </FlexItem>
                        </Flex>
                        <Form
                            onReset={this.onCreateTableModalClose}
                            onSubmit={this.onCreateTableFormSubmit}
                        >
                            <Flex flow="column">
                                <FlexItem>
                                    <Flex>
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
                                        <FlexSeparator size="half" />
                                        <FlexItem>
                                            {/* Column 2 */}
                                            <Flex flow="column">
                                                <FlexItem>
                                                    <FormField label="Fields">
                                                        <ListBox
                                                            id="name"
                                                            name="name"
                                                            selected={listBoxFieldsSelectedIndex}
                                                            onChange={this.handleListBoxFieldsChange}
                                                        >
                                                            {
                                                                tableFields.map((tableField, index) => (
                                                                    <ListBoxItem
                                                                        index={index}
                                                                        key={index}
                                                                        tooltip={tableField.name}
                                                                    >{tableField.name}</ListBoxItem>
                                                                ))
                                                            }
                                                        </ListBox>
                                                    </FormField>
                                                </FlexItem>
                                                <FlexSeparator size="quarter" />
                                                <FlexItem size="auto">
                                                    <ButtonGroup align="left">
                                                        <ActionButton
                                                            icon="add-24"
                                                            onClick={this.onActionButtonAddFieldClick}
                                                        />
                                                        <ActionButton
                                                            disabled={listBoxFieldsSelectedIndex < 0}
                                                            icon="remove-24"
                                                            onClick={this.onActionButtonRemoveFieldClick}
                                                        />
                                                    </ButtonGroup>
                                                </FlexItem>
                                            </Flex>
                                        </FlexItem>
                                        <FlexSeparator size="half" />
                                        <FlexItem>
                                            {/* Column 3 */}
                                            <FormField label="Properties">
                                                <PropertyEditor
                                                    properties={[]}
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
                                            disabled={tableName.length === 0 || tableFields.length === 0 || saving}
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

function mapStateToProps (state) {
    return {
        collations: state.tables.collations,
        collationsLoading: state.tables.collationsLoading,
        engines: state.tables.engines,
        enginesLoading: state.tables.enginesLoading,
        fetching: state.tables.fetching,
        filter: state.tables.filter,
        tables: state.tables.tables,
        listBoxFieldsSelectedIndex: state.tables.listBoxFieldsSelectedIndex,
        modalCreateTableVisible: state.tables.modalCreateTableVisible,
        saving: state.tables.saving,
        tableCollation: state.tables.tableCollation,
        tableComment: state.tables.tableComment,
        tableEngine: state.tables.tableEngine,
        tableFields: state.tables.tableFields,
        tableName: state.tables.tableName
    }
}

function mapDispatchToProps(dispatch) {
    const {
        addTableField,
        closeCreateTableModal,
        getTables,
        openCreateTableModal,
        removeTableField,
        setListBoxFieldsSelectedIndex,
        setTableCollation,
        setTableComment,
        setTableEngine,
        setTableName
    } = actions;

    return  bindActionCreators({
        addTableField,
        closeCreateTableModal,
        getTables,
        openCreateTableModal,
        removeTableField,
        setListBoxFieldsSelectedIndex,
        setTableCollation,
        setTableComment,
        setTableEngine,
        setTableName
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Tables)