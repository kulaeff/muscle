import React from 'react'
import PropTypes from 'prop-types'
import ReactModal from 'react-modal'
import { Route } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Database from '../../containers/Database'
import Button from '../../components/Button'
import Form, { FormRow, FormField, FormButtons, FormButton }  from '../../components/Form'
import Spinner from '../../components/Spinner'
import Textbox from '../../components/Textbox'
import Title from '../../components/Title'
import Toolbar, { ToolBarButton, ToolBarSeparator } from '../../components/ToolBar'
import ListView from '../../components/ListView'
import * as actions from '../../actions/server'
import { debounce } from 'lodash'
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
        createDatabaseModalVisible: PropTypes.bool.isRequired,
        createDatabaseTextboxNameValue: PropTypes.string.isRequired,
        fetching: PropTypes.bool.isRequired,
        databases: PropTypes.array.isRequired,
        minimized: PropTypes.bool.isRequired,
        selectedDatabase: PropTypes.number,
        closeCreateDatabaseModal: PropTypes.func.isRequired,
        getDatabases: PropTypes.func.isRequired,
        selectDatabase: PropTypes.func.isRequired,
        showCreateDatabaseModal: PropTypes.func.isRequired,
        updateCreateDatabaseTextboxName: PropTypes.func.isRequired,
        initWindow: PropTypes.func.isRequired,
        minimizeWindow: PropTypes.func.isRequired,
        restoreWindow: PropTypes.func.isRequired
    };

    /**
     * Create the container
     * @constructor
     */
    constructor(props) {
        const textboxFilterChangeDelay = 700;

        super(props);

        this.state = {
            textboxDatabaseNameDisabled: '',
            textboxDatabaseNameValue: '',
            textboxFilterValue: '',
            showCreateDatabaseModal: false
        };

        this.debouncedTextboxFilterChange = debounce(this.debouncedTextboxFilterChange, textboxFilterChangeDelay);
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
        const { closeCreateDatabaseModal } = this.props;

        closeCreateDatabaseModal();
    };

    /**
     * Show modal when toolbar button Create clicked
     * @method
     */
    onToolBarButtonCreateDatabaseClick = () => {
        const { showCreateDatabaseModal } = this.props;

        showCreateDatabaseModal();
    };

    /**
     * Show modal when toolbar button Edit clicked
     * @method
     */
    onToolBarButtonEditDatabaseClick = () => {
        console.log('toolbar button Edit cliked');
    };

    /**
     * Show confirm modal when toolbar button Delete clicked
     * @method
     */
    onToolBarButtonDeleteDatabaseClick = () => {
        console.log('toolbar button Delete cliked');
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
     * @function
     * @param {string} token String used as filter
     */
    debouncedTextboxFilterChange = (token) => {
        const { getDatabases } = this.props;

        getDatabases(token);
    };

    /**
     * Stores the filter and invokes debounced handler
     * @param {Event} e
     */
    onTextboxFilterChange = (e) => {
        this.setState({
            textboxFilterValue: e.target.value
        });

        this.debouncedTextboxFilterChange(e.target.value)
    };

    /**
     * Stores the database name in the local state
     * @param {Event} e
     */
    onCreateDatabaseTextboxNameChange = (e) => {
        const { updateCreateDatabaseTextboxName } = this.props;

        updateCreateDatabaseTextboxName(e.target.value);
    };

    onCreateDatabaseFormSubmit = (e) => {
        const { createDatabase } = this.props.actions;

        createDatabase(this.state.textboxDatabaseNameValue)
            .then(() => {
                this.onCreateDatabaseModalClose()
            });

        e.preventDefault()
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
                createDatabaseModalVisible,
                createDatabaseTextboxNameValue,
                fetching,
                databases,
                minimized,
                selectedDatabase
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
                                        value={this.state.textboxFilterValue}
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
                    isOpen={createDatabaseModalVisible}
                    overlayClassName="ReactModal__Overlay"
                    onRequestClose={this.onCreateDatabaseModalClose}
                    parentSelector={() => document.body}
                    shouldCloseOnOverlayClick={true}
                >
                    <Title primaryTitle="New database" size="large" />
                    <Form onReset={this.onCreateDatabaseModalClose} onSubmit={this.onCreateDatabaseFormSubmit}>
                        <FormRow>
                            <FormField id="textboxDatabaseName" label="Database name">
                                <Textbox
                                    id="textboxDatabaseName"
                                    name="name"
                                    required={true}
                                    value={createDatabaseTextboxNameValue}
                                    onChange={this.onCreateDatabaseTextboxNameChange}
                                />
                            </FormField>
                            <FormButtons>
                                <FormButton>
                                    <Button
                                        disabled={createDatabaseTextboxNameValue.length === 0}
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
            </div>
        )
    }
}

function mapStateToProps (state) {
    return {
        createDatabaseModalVisible: state.server.createDatabaseModalVisible,
        createDatabaseTextboxNameValue: state.server.createDatabaseTextboxNameValue,
        fetching: state.server.fetching,
        databases: state.server.databases,
        minimized: state.server.minimized,
        selectedDatabase: state.server.selectedDatabase
    }
}

function mapDispatchToProps(dispatch) {
    const {
        closeCreateDatabaseModal,
        getDatabases,
        selectDatabase,
        showCreateDatabaseModal,
        updateCreateDatabaseTextboxName,
        initWindow,
        minimizeWindow,
        restoreWindow
    } = actions;

    return bindActionCreators({
        closeCreateDatabaseModal,
        getDatabases,
        selectDatabase,
        showCreateDatabaseModal,
        updateCreateDatabaseTextboxName,
        initWindow,
        minimizeWindow,
        restoreWindow
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Server)