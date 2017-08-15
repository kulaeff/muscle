import React from 'react'
import PropTypes from 'prop-types'
import ReactModal from 'react-modal'
import { Route } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Database from '../../containers/Database'
import Button from '../../components/Button'
import DataTable from '../../components/DataTable'
import Form, { FormBody, FormField, FormButtons, FormButton }  from '../../components/Form'
import Grid, { FlexItem } from '../../components/Flex'
import Spinner from '../../components/Spinner'
import Textbox from '../../components/Textbox'
import Title from '../../components/Title'
import Toolbar, { ToolBarButton, ToolBarSeparator } from '../../components/ToolBar'
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
     * @property {number} databaseName Selected database index
     */
    static propTypes = {
        databaseName: PropTypes.string.isRequired,
        databaseName_: PropTypes.string.isRequired,
        databases: PropTypes.array.isRequired,
        fetching: PropTypes.bool.isRequired,
        filter: PropTypes.string.isRequired,
        saving: PropTypes.bool.isRequired,
        minimized: PropTypes.bool.isRequired,
        modalCreateDatabaseVisible: PropTypes.bool.isRequired,
        modalDeleteDatabaseVisible: PropTypes.bool.isRequired,
        modalEditDatabaseVisible: PropTypes.bool.isRequired,
        closeCreateDatabaseModal: PropTypes.func.isRequired,
        closeDeleteDatabaseModal: PropTypes.func.isRequired,
        closeEditDatabaseModal: PropTypes.func.isRequired,
        createDatabase: PropTypes.func.isRequired,
        deleteDatabase: PropTypes.func.isRequired,
        getDatabases: PropTypes.func.isRequired,
        initWindow: PropTypes.func.isRequired,
        minimizeWindow: PropTypes.func.isRequired,
        openCreateDatabaseModal: PropTypes.func.isRequired,
        openDeleteDatabaseModal: PropTypes.func.isRequired,
        openEditDatabaseModal: PropTypes.func.isRequired,
        restoreWindow: PropTypes.func.isRequired,
        setDatabaseName: PropTypes.func.isRequired,
        setFilter: PropTypes.func.isRequired,
        updateDatabase: PropTypes.func.isRequired,
    };

    /**
     * Fetch the data after the component was mounted
     * @callback
     */
    componentDidMount() {
        const { getDatabases, initWindow } = this.props;

        getDatabases();
        initWindow();
    }

    /**
     * Close the Create Database modal
     * @callback
     */
    onCreateDatabaseModalClose = () => {
        const { closeCreateDatabaseModal } = this.props;

        closeCreateDatabaseModal();
    };

    /**
     * Close the Delete Database modal
     * @callback
     */
    onDeleteDatabaseModalClose = () => {
        const { closeDeleteDatabaseModal } = this.props;

        closeDeleteDatabaseModal();
    };

    /**
     * Close the Edit Database modal
     * @callback
     */
    onEditDatabaseModalClose = () => {
        const { closeEditDatabaseModal } = this.props;

        closeEditDatabaseModal();
    };

    /**
     * Open the Create Database modal
     * @callback
     */
    onToolBarButtonCreateDatabaseClick = () => {
        const { openCreateDatabaseModal } = this.props;

        openCreateDatabaseModal();
    };

    /**
     * Open the Edit Database modal
     * @callback
     * @param {string} database Database to be edited
     */
    onToolBarButtonEditDatabaseClick = (database) => {
        const { setDatabaseName, openEditDatabaseModal } = this.props;

        setDatabaseName(database);
        openEditDatabaseModal();
    };

    /**
     * Open the Delete Database modal
     * @callback
     * @param {string} database Database to be deleted
     */
    onToolBarButtonDeleteDatabaseClick = (database) => {
        const { setDatabaseName, openDeleteDatabaseModal } = this.props;

        setDatabaseName(database);
        openDeleteDatabaseModal();
    };

    /**
     * Open the Import Database modal
     * @callback
     */
    onToolBarButtonImportDatabaseClick = () => {
        console.log('import database clicked');
    };

    /**
     * Open the Export Database modal
     * @callback
     */
    onToolBarButtonExportDatabaseClick = (database) => {
        console.log('export database clicked:', database);
    };
    /**
     *
     * Minimize the window
     * @callback
     * @param {Event} event Event
     */
    onWindowButtonMinimizeClick = (e) => {
        const { minimizeWindow } = this.props;

        minimizeWindow();

        e.stopPropagation();
    };

    /**
     * Close the window and navigate to previous route
     * @callback
     */
    onWindowButtonCloseClick = () => {
        const { history } = this.props;

        history.push('/');
    };

    /**
     * Restore the window
     * @callback
     */
    onWindowClick = () => {
        const { restoreWindow } = this.props;

        restoreWindow();
    };

    /**
     * Set the filter
     * @callback
     * @param {Event} event Event
     */
    onTextboxFilterChange = (event) => {
        const { setFilter } = this.props;

        setFilter(event.target.value);
    };

    /**
     * Set the database name
     * @callback
     * @param {Event} event Event
     */
    onTextboxDatabaseNameChange = (event) => {
        const { setDatabaseName } = this.props;

        setDatabaseName(event.target.value);
    };

    /**
     * Create a database
     * @callback
     * @param {Event} event Event
     */
    onCreateDatabaseFormSubmit = (event) => {
        const { createDatabase } = this.props;

        createDatabase();

        event.preventDefault();
    };

    /**
     * Delete the database
     * @callback
     * @param {Event} event Event
     */
    onDeleteDatabaseFormSubmit = (event) => {
        const { deleteDatabase } = this.props;

        deleteDatabase();

        event.preventDefault();
    };

    /**
     * Updates the database
     * @callback
     * @param {Event} event Event
     */
    onEditDatabaseFormSubmit = (event) => {
        const { updateDatabase } = this.props;

        updateDatabase();

        event.preventDefault();
    };

    dataTableChange = (value) => {
        const { match, history, minimizeWindow } = this.props;

        history.push(`${match.url}/${value}`);

        if (JSON.parse(localStorage.getItem('useSmartFolding'))) {
            minimizeWindow()
        }
    };

    /**
     * Render the container
     * @returns {XML}
     */
    render() {
        const
            b = block('server'),
            columns = [
                { name: 'database', label: 'Database' }
            ],
            {
                match,
                modalCreateDatabaseVisible,
                modalDeleteDatabaseVisible,
                modalEditDatabaseVisible,
                fetching,
                databases,
                minimized,
                saving,
                databaseName,
                databaseName_,
                filter
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
                        fetching && !minimized ? (
                            <Spinner active={fetching} />
                        ) : (
                            <div className={b('content')}>
                                <div className={b('toolbar')}>
                                    <Toolbar>
                                        <ToolBarButton
                                            icon="create"
                                            label="New"
                                            title="Create new database"
                                            url={match.url}
                                            onClick={this.onToolBarButtonCreateDatabaseClick}/>
                                        <ToolBarButton
                                            disabled={databaseName === null}
                                            icon="edit"
                                            label="Edit"
                                            title="Edit database"
                                            url={`${match.url}/:database`}
                                            onClick={this.onToolBarButtonEditDatabaseClick}/>
                                        <ToolBarButton
                                            disabled={databaseName === null}
                                            icon="delete"
                                            label="Delete"
                                            title="Delete database"
                                            url={`${match.url}/:database`}
                                            onClick={this.onToolBarButtonDeleteDatabaseClick}/>
                                        <ToolBarSeparator />
                                        <ToolBarButton
                                            icon="import"
                                            label="Import"
                                            title="Import database"
                                            url={match.url}
                                            onClick={this.onToolBarButtonImportDatabaseClick}/>
                                        <ToolBarButton
                                            disabled={databaseName === null}
                                            icon="export"
                                            label="Export"
                                            title="Export database"
                                            url={`${match.url}/:database`}
                                            onClick={this.onToolBarButtonExportDatabaseClick}/>
                                    </Toolbar>
                                </div>
                                <div className={b('filters')}>
                                    <Textbox
                                        id="textboxFilter"
                                        placeholder="Filter by name..."
                                        value={filter}
                                        onChange={this.onTextboxFilterChange}/>
                                </div>
                                <div className={b('table')}>
                                    <DataTable
                                        columns={columns}
                                        rows={databases}
                                        url={match.url}
                                        onChange={this.dataTableChange}
                                    />
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
                    closeTimeoutMS={240}
                    contentLabel="Create new database modal"
                    isOpen={modalCreateDatabaseVisible}
                    overlayClassName="ReactModal__Overlay"
                    onRequestClose={this.onCreateDatabaseModalClose}
                    parentSelector={() => document.body}
                    shouldCloseOnOverlayClick={true}
                >
                    <Grid>
                        <FlexItem>
                            <Title primaryTitle="New database" size="large" />
                        </FlexItem>
                        <FlexItem size="auto">
                            <Spinner active={saving} type="rect" />
                        </FlexItem>
                    </Grid>
                    <Form onReset={this.onCreateDatabaseModalClose} onSubmit={this.onCreateDatabaseFormSubmit}>
                        <FormBody>
                            <FormField id="textboxDatabaseName" label="Name">
                                <Textbox
                                    autoFocus={true}
                                    id="textboxDatabaseName"
                                    name="name"
                                    required={true}
                                    value={databaseName}
                                    onChange={this.onTextboxDatabaseNameChange}
                                />
                            </FormField>
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
                                    disabled={databaseName.length === 0 || saving}
                                    label="Create"
                                    type="submit"
                                />
                            </FormButton>
                        </FormButtons>
                    </Form>
                </ReactModal>
                {/* Edit Database */}
                <ReactModal
                    ariaHideApp={true}
                    className="ReactModal__Content-Small"
                    closeTimeoutMS={240}
                    contentLabel="Edit database modal"
                    isOpen={modalEditDatabaseVisible}
                    overlayClassName="ReactModal__Overlay"
                    onRequestClose={this.onEditDatabaseModalClose}
                    parentSelector={() => document.body}
                    shouldCloseOnOverlayClick={true}
                >
                    <Grid>
                        <FlexItem>
                            <Title primaryTitle="Edit database" size="large" />
                        </FlexItem>
                        <FlexItem size="auto">
                            <Spinner active={saving} type="rect" />
                        </FlexItem>
                    </Grid>
                    <Form onReset={this.onEditDatabaseModalClose} onSubmit={this.onEditDatabaseFormSubmit}>
                        <FormBody>
                            <FormField id="textboxDatabaseName" label="Name">
                                <Textbox
                                    autoFocus={true}
                                    id="textboxDatabaseName"
                                    name="name"
                                    required={true}
                                    value={databaseName}
                                    onChange={this.onTextboxDatabaseNameChange}
                                />
                            </FormField>
                        </FormBody>
                        <FormButtons>
                            <FormButton>
                                <Button
                                    disabled={
                                        databaseName.length === 0 || databaseName === databaseName_ || saving
                                    }
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
                    </Form>
                </ReactModal>
                {/* Delete Database */}
                <ReactModal
                    ariaHideApp={true}
                    className="ReactModal__Content-Small"
                    closeTimeoutMS={240}
                    contentLabel="Delete database modal"
                    isOpen={modalDeleteDatabaseVisible}
                    overlayClassName="ReactModal__Overlay"
                    onRequestClose={this.onDeleteDatabaseModalClose}
                    parentSelector={() => document.body}
                    shouldCloseOnOverlayClick={true}
                >
                    <Grid>
                        <FlexItem>
                            <Title primaryTitle="Delete database" size="large" />
                        </FlexItem>
                        <FlexItem size="auto">
                            <Spinner active={saving} type="rect" />
                        </FlexItem>
                    </Grid>
                    <Form onReset={this.onDeleteDatabaseModalClose} onSubmit={this.onDeleteDatabaseFormSubmit}>
                        <FormBody>
                            <FormField id="textboxDatabaseName">
                                Are you sure you want to delete this database?
                                <input type="hidden"
                                    name="name"
                                    required={true}
                                    value={databaseName}
                                />
                            </FormField>
                        </FormBody>
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
                    </Form>
                </ReactModal>
            </div>
        )
    }
}

function mapStateToProps (state) {
    return {
        databaseName: state.server.databaseName,
        databaseName_: state.server.databaseName_,
        databases: state.server.databases,
        fetching: state.server.fetching,
        filter: state.server.filter,
        listBoxDatabasesSelectedIndex: state.server.listBoxDatabasesSelectedIndex,
        minimized: state.server.minimized,
        modalCreateDatabaseVisible: state.server.modalCreateDatabaseVisible,
        modalDeleteDatabaseVisible: state.server.modalDeleteDatabaseVisible,
        modalEditDatabaseVisible: state.server.modalEditDatabaseVisible,
        saving: state.server.saving
    }
}

function mapDispatchToProps(dispatch) {
    const {
        closeCreateDatabaseModal,
        closeDeleteDatabaseModal,
        closeEditDatabaseModal,
        createDatabase,
        deleteDatabase,
        updateDatabase,
        getDatabases,
        setDatabaseName,
        openCreateDatabaseModal,
        openDeleteDatabaseModal,
        openEditDatabaseModal,
        setFilter,
        initWindow,
        minimizeWindow,
        restoreWindow
    } = actions;

    return bindActionCreators({
        closeCreateDatabaseModal,
        closeDeleteDatabaseModal,
        closeEditDatabaseModal,
        createDatabase,
        deleteDatabase,
        updateDatabase,
        getDatabases,
        setDatabaseName,
        openCreateDatabaseModal,
        openDeleteDatabaseModal,
        openEditDatabaseModal,
        setFilter,
        initWindow,
        minimizeWindow,
        restoreWindow
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Server)