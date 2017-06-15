import React from 'react'
import ReactModal from 'react-modal'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actions from '../../actions/tables'
import ActionButton from '../../components/ActionButton'
import Button from '../../components/Button'
import ButtonGroup from '../../components/ButtonGroup'
import DataTable from '~/components/DataTable'
import Form, { FormBody, FormButtons, FormButton, FormField, FormGroup }  from '../../components/Form'
import Grid, { GridItem } from '../../components/Grid'
import ListBox, { ListBoxItem } from '../../components/ListBox'
import Placeholder from '~/components/Placeholder'
import PropertyEditor from '../../components/PropertyEditor'
import Spinner from '../../components/Spinner'
import SplitContainer from '../../components/SplitContainer'
import Textbox from '../../components/Textbox'
import Title from '../../components/Title'
import Toolbar, { ToolBarButton, ToolBarSeparator } from '~/components/ToolBar'
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
     * @property {array} items Items
     */
    static propTypes = {
        fetching: PropTypes.bool.isRequired,
        filter: PropTypes.string.isRequired,
        items: PropTypes.array.isRequired,
        modalCreateTableVisible: PropTypes.bool.isRequired,
        saving: PropTypes.bool.isRequired,
        tableCollation: PropTypes.string.isRequired,
        tableComment: PropTypes.string.isRequired,
        tableFields: PropTypes.array.isRequired,
        tableName: PropTypes.string.isRequired,
        tableType: PropTypes.string.isRequired,
        getTables: PropTypes.func.isRequired,
        closeModalCreateTable: PropTypes.func.isRequired,
        showModalCreateTable: PropTypes.func.isRequired,
        setTableComment: PropTypes.func.isRequired,
        setTableFields: PropTypes.func.isRequired,
        setTableName: PropTypes.func.isRequired
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

    onActionButtonAddFieldClick = () => {
        const { setTableFields } = this.props;

        setTableFields();
    };

    onActionButtonRemoveFieldClick = () => {
        console.log('remove field clicked');
    };

    /**
     * Show modal when toolbar button Create clicked
     * @method
     */
    onToolBarButtonCreateDatabaseClick = () => {
        const { showModalCreateTable } = this.props;

        showModalCreateTable();
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
        const { closeModalCreateTable } = this.props;

        closeModalCreateTable();
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

    /**
     * Renders Summary container
     * @method
     */
    render() {
        const
            b = block('tables'),
            columns = [
                { name: 'table', title: 'Table' },
                { name: 'rows', title: 'Rows', style: { alignment: 'right' } },
                { name: 'type', title: 'Type' },
                { name: 'collation', title: 'Collation' },
                { name: 'size', title: 'Size', style: { alignment: 'right' } },
                { name: 'overhead', title: 'Overhead', style: { alignment: 'right' } }
            ],
            {
                match,
                fetching,
                filter,
                items,
                modalCreateTableVisible,
                saving,
                tableCollation,
                tableComment,
                tableFields,
                tableName,
                tableType
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
                    {/* MODALS */}
                    {/* Create Table */}
                    <ReactModal
                        ariaHideApp={true}
                        className="ReactModal__Content-Large"
                        contentLabel="Create new table modal"
                        isOpen={modalCreateTableVisible}
                        overlayClassName="ReactModal__Overlay"
                        onRequestClose={this.onCreateTableModalClose}
                        parentSelector={() => document.body}
                        shouldCloseOnOverlayClick={true}
                    >
                        <Grid>
                            <GridItem>
                                <Title primaryTitle="New table" size="large" />
                            </GridItem>
                            <GridItem size="auto">
                                <Spinner active={saving} type="rect" />
                            </GridItem>
                        </Grid>
                        <Form
                            onReset={this.onCreateTableModalClose}
                            onSubmit={this.onCreateTableFormSubmit}
                        >
                            <FormBody>
                                <FormGroup flow="row">
                                    <FormGroup width={4}>
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
                                        <FormField id="comment" label="Comment">
                                            <Textbox
                                                id="comment"
                                                name="comment"
                                                required={true}
                                                value={tableComment}
                                                onChange={this.onTextboxTableCommentChange}
                                            />
                                        </FormField>
                                        <FormField id="collation" label="Collation">
                                            <Textbox
                                                id="collation"
                                                name="collation"
                                                required={true}
                                                value={tableCollation}
                                                onChange={this.onTextboxTableCollationChange}
                                            />
                                        </FormField>
                                        <FormField id="type" label="Type">
                                            <Textbox
                                                id="type"
                                                name="type"
                                                required={true}
                                                value={tableType}
                                                onChange={this.onTextboxTableTypeChange}
                                            />
                                        </FormField>
                                    </FormGroup>
                                    <FormGroup width={12}>
                                        <FormGroup flow="row">
                                            <FormField label="Fields" width={2}>
                                                <SplitContainer
                                                    panel1={
                                                        <ListBox
                                                            id="name"
                                                            name="name"
                                                            value={tableName}
                                                            onChange={this.onListBoxFieldsChange}
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
                                                    }
                                                    panel2={
                                                        <ButtonGroup>
                                                            <ActionButton
                                                                icon="add-24"
                                                                onClick={this.onActionButtonAddFieldClick}
                                                            />
                                                            <ActionButton
                                                                disabled={true}
                                                                icon="remove-24"
                                                                onClick={this.onActionButtonRemoveFieldClick}
                                                            />
                                                        </ButtonGroup>
                                                    }
                                                />
                                            </FormField>
                                            <FormField label="Properties" width={3}>
                                                <PropertyEditor
                                                    properties={[]}
                                                />
                                            </FormField>
                                        </FormGroup>
                                    </FormGroup>
                                </FormGroup>
                            </FormBody>
                            <FormButtons>
                                <FormButton>
                                    <Button
                                        label="Cancel"
                                        type="reset"
                                    />
                                </FormButton>
                                <FormButton>
                                    <Button
                                        disabled={tableName.length === 0 || saving}
                                        label="Create"
                                        type="submit"
                                    />
                                </FormButton>
                            </FormButtons>
                        </Form>
                    </ReactModal>
                </div>
            )
        )
    }
}

function mapStateToProps (state) {
    return {
        fetching: state.tables.fetching,
        filter: state.tables.filter,
        items: state.tables.items,
        modalCreateTableVisible: state.tables.modalCreateTableVisible,
        saving: state.tables.saving,
        tableCollation: state.tables.tableCollation,
        tableComment: state.tables.tableComment,
        tableFields: state.tables.tableFields,
        tableName: state.tables.tableName,
        tableType: state.tables.tableType
    }
}

function mapDispatchToProps(dispatch) {
    const {
        getTables,
        closeModalCreateTable,
        showModalCreateTable,
        setTableComment,
        setTableFields,
        setTableName
    } = actions;

    return  bindActionCreators({
        getTables,
        closeModalCreateTable,
        showModalCreateTable,
        setTableComment,
        setTableFields,
        setTableName
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Tables)