import React from 'react'
import PropTypes from 'prop-types'
import ReactModal from 'react-modal'
import { Route } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Database from '../../containers/Database'
import Button from '../../components/Button'
import Form, { FormRow, FormField, FormButtons, FormButton }  from '../../components/Form'
import Grid, { GridItem } from '../../components/Grid'
import Spinner from '../../components/Spinner'
import Textbox from '../../components/Textbox'
import Title from '../../components/Title'
import Toolbar, { ToolBarButton, ToolBarSeparator } from '../../components/ToolBar'
import ListView from '../../components/ListView'
import * as actions from '../../actions/server'
import block from 'bem-cn'
import './style.less';

/**
 * Server container
 * @class
 */
class Server extends React.Component {
    /**
     * Properties
     * @static
     * @property {bool} fetching Is data fetching
     * @property {bool} minimized Is window minimized
     * @property {array} databases List of databases
     * @property {number} selectedDatabase Selected database index
     */
    static propTypes = {
        closeModalCreateDatabase: PropTypes.func.isRequired,
        closeModalDeleteDatabase: PropTypes.func.isRequired,
        fetching: PropTypes.bool.isRequired,
        saving: PropTypes.bool.isRequired,
        databases: PropTypes.array.isRequired,
        minimized: PropTypes.bool.isRequired,
        modalTextboxDatabaseNameValue: PropTypes.string.isRequired,
        modalCreateDatabaseVisible: PropTypes.bool.isRequired,
        modalDeleteDatabaseVisible: PropTypes.bool.isRequired,
        modalEditDatabaseVisible: PropTypes.bool.isRequired,
        createDatabase: PropTypes.func.isRequired,
        deleteDatabase: PropTypes.func.isRequired,
        updateDatabase: PropTypes.func.isRequired,
        selectedDatabase: PropTypes.number,
        getDatabases: PropTypes.func.isRequired,
        selectDatabase: PropTypes.func.isRequired,
        showModalCreateDatabase: PropTypes.func.isRequired,
        showModalDeleteDatabase: PropTypes.func.isRequired,
        updateDatabaseName: PropTypes.func.isRequired,
        initWindow: PropTypes.func.isRequired,
        minimizeWindow: PropTypes.func.isRequired,
        restoreWindow: PropTypes.func.isRequired,
        textboxFilterValue: PropTypes.string.isRequired
    };

    /**
     * Create the container
     * @constructor
     */
    constructor(props) {
        super(props);
    }

    /**
     * Fetches data after the component was mounted
     * @method
     */
    componentDidMount() {
        const
            { getDatabases, initWindow } = this.props;

        getDatabases();
        initWindow();
    }

    onCreateDatabaseModalClose = () => {
        const { closeModalCreateDatabase } = this.props;

        closeModalCreateDatabase();
    };

    onDeleteDatabaseModalClose = () => {
        const { closeModalDeleteDatabase } = this.props;

        closeModalDeleteDatabase();
    };

    onEditDatabaseModalClose = () => {
        const { closeModalEditDatabase } = this.props;

        closeModalEditDatabase();
    };

    /**
     * Show modal when toolbar button Create clicked
     * @method
     */
    onToolBarButtonCreateDatabaseClick = () => {
        const { showModalCreateDatabase } = this.props;

        showModalCreateDatabase();
    };

    /**
     * Show modal when toolbar button Edit clicked
     * @method
     */
    onToolBarButtonEditDatabaseClick = () => {
        const { showModalEditDatabase } = this.props;

        showModalEditDatabase();
    };

    /**
     * Show confirm modal when toolbar button Delete clicked
     * @method
     */
    onToolBarButtonDeleteDatabaseClick = () => {
        const { showModalDeleteDatabase } = this.props;

        showModalDeleteDatabase();
    };

    /**
     * Minimizes the window
     * @method
     */
    onWindowButtonMinimizeClick = (e) => {
        const { minimizeWindow } = this.props;

        minimizeWindow();

        e.stopPropagation();
    };

    /**
     * Closes the window and goes to previous route
     * @method
     */
    onWindowButtonCloseClick = () => {
        const { history } = this.props;

        history.push('/');
    };

    /**
     * Restores the window
     * @method
     */
    onWindowClick = () => {
        const { restoreWindow } = this.props;

        restoreWindow();
    };

    /**
     * Redirects to the selected database details
     * @method
     * @param {number} index Index of selected item
     */
    onListViewChange = (event, index) => {
        const { history, databases, selectDatabase } = this.props;

        selectDatabase(index);

        history.push(`/server/${databases[index]}`);

        event.stopPropagation();
    };

    /**
     * Gets the list of server filtered by string (debounced)
     */
    debouncedTextboxFilterChange = () => {
        const { getDatabases } = this.props;

        getDatabases();
    };

    /**
     * Stores the filter and invokes debounced handler
     * @param {Event} event Event
     */
    onTextboxFilterChange = (event) => {
        const { updateFilter } = this.props;

        updateFilter(event.target.value);
    };

    onTextboxDatabaseNameChange = (event) => {
        const { updateDatabaseName } = this.props;

        updateDatabaseName(event.target.value);
    };

    /**
     * Creates a database
     * @param {Event} event Event
     */
    onCreateDatabaseFormSubmit = (event) => {
        const { createDatabase } = this.props;

        createDatabase();

        event.preventDefault();
    };

    /**
     * Deletes selected database
     * @param {Event} event Event
     */
    onDeleteDatabaseFormSubmit = (event) => {
        const { deleteDatabase } = this.props;

        deleteDatabase();

        event.preventDefault();
    };

    /**
     * Updates selected database
     * @param {Event} event Event
     */
    onEditDatabaseFormSubmit = (event) => {
        const { updateDatabase } = this.props;

        updateDatabase();

        event.preventDefault();
    };

    /**
     * Render the container
     * @returns {XML} Component
     */
    render() {
        const
            b = block('server'),
            {
                match,
                modalTextboxDatabaseNameValue,
                modalCreateDatabaseVisible,
                modalDeleteDatabaseVisible,
                modalEditDatabaseVisible,
                fetching,
                databases,
                minimized,
                saving,
                selectedDatabase,
                textboxFilterValue
            } = this.props;

        return (
            <div className={b({state: minimized ? 'minimized' : null})}>
                <div className={b('container')} onClick={this.onWindowClick}>
                    <div className={b('header')}>
                        <div className={b('title')}>
                            <Title primaryTitle="Local databases" />
                        </div>
                        <div className={b('buttons')}>
                            <button
                                className={b('button', {action: 'minimize'})}
                                onClick={this.onWindowButtonMinimizeClick} />
                            <button
                                className={b('button', {action: 'close'})}
                                onClick={this.onWindowButtonCloseClick} />
                        </div>
                    </div>
                    {
                        fetching ? (
                            <Spinner active={fetching} />
                        ) : (
                            <div className={b('content')}>
                                <div className={b('toolbar')}>
                                    <Toolbar>
                                        <ToolBarButton
                                            icon="create"
                                            label="New"
                                            title="Create new database"
                                            onClick={this.onToolBarButtonCreateDatabaseClick}/>
                                        <ToolBarButton
                                            disabled={selectedDatabase === null}
                                            icon="edit"
                                            label="Edit"
                                            title="Edit database"
                                            onClick={this.onToolBarButtonEditDatabaseClick}/>
                                        <ToolBarButton
                                            disabled={selectedDatabase === null}
                                            icon="delete"
                                            label="Delete"
                                            title="Delete database"
                                            onClick={this.onToolBarButtonDeleteDatabaseClick}/>
                                        <ToolBarSeparator />
                                        <ToolBarButton
                                            icon="import"
                                            label="Import"
                                            title="Import database"
                                            onClick={this.onToolBarButtonEditDatabaseClick}/>
                                        <ToolBarButton
                                            disabled={selectedDatabase === null}
                                            icon="export"
                                            label="Export"
                                            title="Export database"
                                            onClick={this.onToolBarButtonEditDatabaseClick}/>
                                    </Toolbar>
                                </div>
                                <div className={b('filters')}>
                                    <Textbox
                                        id="textboxFilter"
                                        placeholder="Filter by name..."
                                        value={textboxFilterValue}
                                        onChange={this.onTextboxFilterChange}/>
                                </div>
                                <div className={b('table')}>
                                    <ListView
                                        icon="database"
                                        items={databases}
                                        selectedIndex={selectedDatabase}
                                        onChange={this.onListViewChange}/>
                                </div>
                            </div>
                        )
                    }
                </div>
                <div className={b('view')}>
                    <Route path={`${match.url}/:database`} component={Database} />
                </div>
                {/* MODALS */}
                {/* Create Database */}
                <ReactModal
                    ariaHideApp={true}
                    className="ReactModal__Content-Small"
                    contentLabel="Create new database modal"
                    isOpen={modalCreateDatabaseVisible}
                    overlayClassName="ReactModal__Overlay"
                    onRequestClose={this.onCreateDatabaseModalClose}
                    parentSelector={() => document.body}
                    shouldCloseOnOverlayClick={true}
                >
                    <Grid>
                        <GridItem>
                            <Title primaryTitle="New database" size="large" />
                        </GridItem>
                        <GridItem size="auto">
                            <Spinner active={saving} type="rect" />
                        </GridItem>
                    </Grid>
                    <Form onReset={this.onCreateDatabaseModalClose} onSubmit={this.onCreateDatabaseFormSubmit}>
                        <FormRow>
                            <FormField id="textboxDatabaseName" label="Name">
                                <Textbox
                                    id="textboxDatabaseName"
                                    name="name"
                                    required={true}
                                    value={modalTextboxDatabaseNameValue}
                                    onChange={this.onTextboxDatabaseNameChange}
                                />
                            </FormField>
                            <FormButtons>
                                <FormButton>
                                    <Button
                                        disabled={modalTextboxDatabaseNameValue.length === 0 || saving}
                                        label="Create"
                                        type="submit"
                                    />
                                </FormButton>
                                <FormButton>
                                    <Button
                                        label="Cancel"
                                        type="reset"
                                    />
                                </FormButton>
                            </FormButtons>
                        </FormRow>
                    </Form>
                </ReactModal>
                {/* Edit Database */}
                <ReactModal
                    ariaHideApp={true}
                    className="ReactModal__Content-Small"
                    contentLabel="Edit database modal"
                    isOpen={modalEditDatabaseVisible}
                    overlayClassName="ReactModal__Overlay"
                    onRequestClose={this.onEditDatabaseModalClose}
                    parentSelector={() => document.body}
                    shouldCloseOnOverlayClick={true}
                >
                    <Grid>
                        <GridItem>
                            <Title primaryTitle="Edit database" size="large" />
                        </GridItem>
                        <GridItem size="auto">
                            <Spinner active={saving} type="rect" />
                        </GridItem>
                    </Grid>
                    <Form onReset={this.onEditDatabaseModalClose} onSubmit={this.onEditDatabaseFormSubmit}>
                        <FormRow>
                            <FormField id="textboxDatabaseName" label="Name">
                                <Textbox
                                    id="textboxDatabaseName"
                                    name="name"
                                    required={true}
                                    value={modalTextboxDatabaseNameValue}
                                    onChange={this.onTextboxDatabaseNameChange}
                                />
                            </FormField>
                            <FormButtons>
                                <FormButton>
                                    <Button
                                        disabled={modalTextboxDatabaseNameValue.length === 0 || saving}
                                        label="Save"
                                        type="submit"
                                    />
                                </FormButton>
                                <FormButton>
                                    <Button
                                        label="Cancel"
                                        type="reset"
                                    />
                                </FormButton>
                            </FormButtons>
                        </FormRow>
                    </Form>
                </ReactModal>
                {/* Delete Database */}
                <ReactModal
                    ariaHideApp={true}
                    className="ReactModal__Content-Small"
                    contentLabel="Delete database modal"
                    isOpen={modalDeleteDatabaseVisible}
                    overlayClassName="ReactModal__Overlay"
                    onRequestClose={this.onDeleteDatabaseModalClose}
                    parentSelector={() => document.body}
                    shouldCloseOnOverlayClick={true}
                >
                    <Grid>
                        <GridItem>
                            <Title primaryTitle="Delete database" size="large" />
                        </GridItem>
                        <GridItem size="auto">
                            <Spinner active={saving} type="rect" />
                        </GridItem>
                    </Grid>
                    <Form onReset={this.onDeleteDatabaseModalClose} onSubmit={this.onDeleteDatabaseFormSubmit}>
                        <FormRow>
                            <FormField id="textboxDatabaseName">
                                Are you sure you want to delete this database?
                                <input type="hidden"
                                    name="name"
                                    required={true}
                                    value={modalTextboxDatabaseNameValue}
                                />
                            </FormField>
                            <FormButtons>
                                <FormButton>
                                    <Button
                                        label="Delete"
                                        type="submit"
                                    />
                                </FormButton>
                                <FormButton>
                                    <Button
                                        label="Cancel"
                                        type="reset"
                                    />
                                </FormButton>
                            </FormButtons>
                        </FormRow>
                    </Form>
                </ReactModal>
            </div>
        )
    }
}

function mapStateToProps (state) {
    return {
        fetching: state.server.fetching,
        databases: state.server.databases,
        minimized: state.server.minimized,
        modalTextboxDatabaseNameValue: state.server.modalTextboxDatabaseNameValue,
        modalCreateDatabaseVisible: state.server.modalCreateDatabaseVisible,
        modalDeleteDatabaseVisible: state.server.modalDeleteDatabaseVisible,
        modalEditDatabaseVisible: state.server.modalEditDatabaseVisible,
        saving: state.server.saving,
        selectedDatabase: state.server.selectedDatabase,
        textboxFilterValue: state.server.textboxFilterValue
    }
}

function mapDispatchToProps(dispatch) {
    const {
        closeModalCreateDatabase,
        closeModalDeleteDatabase,
        closeModalEditDatabase,
        createDatabase,
        deleteDatabase,
        updateDatabase,
        getDatabases,
        selectDatabase,
        showModalCreateDatabase,
        showModalDeleteDatabase,
        showModalEditDatabase,
        updateDatabaseName,
        updateFilter,
        initWindow,
        minimizeWindow,
        restoreWindow
    } = actions;

    return bindActionCreators({
        closeModalCreateDatabase,
        closeModalDeleteDatabase,
        closeModalEditDatabase,
        createDatabase,
        deleteDatabase,
        updateDatabase,
        getDatabases,
        selectDatabase,
        showModalCreateDatabase,
        showModalDeleteDatabase,
        showModalEditDatabase,
        updateDatabaseName,
        updateFilter,
        initWindow,
        minimizeWindow,
        restoreWindow
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Server)