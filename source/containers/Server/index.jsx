import React from 'react'
import PropTypes from 'prop-types'
import ReactModal from 'react-modal'
import { Route } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Database from '../../containers/Database'
import Button from '../../components/Button'
import Form, { FormBody, FormField, FormButtons, FormButton }  from '../../components/Form'
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
     * @property {number} databaseName Selected database index
     */
    static propTypes = {
        closeModalCreateDatabase: PropTypes.func.isRequired,
        closeModalDeleteDatabase: PropTypes.func.isRequired,
        closeModalEditDatabase: PropTypes.func.isRequired,
        databaseName: PropTypes.string.isRequired,
        databaseName_: PropTypes.string.isRequired,
        fetching: PropTypes.bool.isRequired,
        saving: PropTypes.bool.isRequired,
        databases: PropTypes.array.isRequired,
        minimized: PropTypes.bool.isRequired,
        modalCreateDatabaseVisible: PropTypes.bool.isRequired,
        modalDeleteDatabaseVisible: PropTypes.bool.isRequired,
        modalEditDatabaseVisible: PropTypes.bool.isRequired,
        createDatabase: PropTypes.func.isRequired,
        deleteDatabase: PropTypes.func.isRequired,
        updateDatabase: PropTypes.func.isRequired,
        getDatabases: PropTypes.func.isRequired,
        setDatabaseName: PropTypes.func.isRequired,
        setFilter: PropTypes.func.isRequired,
        showModalCreateDatabase: PropTypes.func.isRequired,
        showModalDeleteDatabase: PropTypes.func.isRequired,
        showModalEditDatabase: PropTypes.func.isRequired,
        initWindow: PropTypes.func.isRequired,
        minimizeWindow: PropTypes.func.isRequired,
        restoreWindow: PropTypes.func.isRequired,
        filter: PropTypes.string.isRequired
    };

    /**
     * Create the container
     * @constructor
     * @param {object} props Props
     */
    constructor(props) {
        super(props);
    }

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
        const { closeModalCreateDatabase } = this.props;

        closeModalCreateDatabase();
    };

    /**
     * Close the Delete Database modal
     * @callback
     */
    onDeleteDatabaseModalClose = () => {
        const { closeModalDeleteDatabase } = this.props;

        closeModalDeleteDatabase();
    };

    /**
     * Close the Edit Database modal
     * @callback
     */
    onEditDatabaseModalClose = () => {
        const { closeModalEditDatabase } = this.props;

        closeModalEditDatabase();
    };

    /**
     * Open the Create Database modal
     * @callback
     */
    onToolBarButtonCreateDatabaseClick = () => {
        const { showModalCreateDatabase } = this.props;

        showModalCreateDatabase();
    };

    /**
     * Open the Edit Database modal
     * @callback
     * @param {string} database Database to be edited
     */
    onToolBarButtonEditDatabaseClick = (database) => {
        const { setDatabaseName, showModalEditDatabase } = this.props;

        setDatabaseName(database);
        showModalEditDatabase();
    };

    /**
     * Open the Delete Database modal
     * @callback
     * @param {string} database Database to be deleted
     */
    onToolBarButtonDeleteDatabaseClick = (database) => {
        const { setDatabaseName, showModalDeleteDatabase } = this.props;

        setDatabaseName(database);
        showModalDeleteDatabase();
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

    /**
     * Render the container
     * @returns {XML}
     */
    render() {
        const
            b = block('server'),
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
                                    <ListView
                                        icon="database"
                                        items={databases}
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
        fetching: state.server.fetching,
        databases: state.server.databases,
        minimized: state.server.minimized,
        modalCreateDatabaseVisible: state.server.modalCreateDatabaseVisible,
        modalDeleteDatabaseVisible: state.server.modalDeleteDatabaseVisible,
        modalEditDatabaseVisible: state.server.modalEditDatabaseVisible,
        saving: state.server.saving,
        databaseName: state.server.databaseName,
        databaseName_: state.server.databaseName_,
        filter: state.server.filter
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
        setDatabaseName,
        showModalCreateDatabase,
        showModalDeleteDatabase,
        showModalEditDatabase,
        setFilter,
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
        setDatabaseName,
        showModalCreateDatabase,
        showModalDeleteDatabase,
        showModalEditDatabase,
        setFilter,
        initWindow,
        minimizeWindow,
        restoreWindow
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Server)