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
import * as serverActions from '../../actions/server'
import { debounce } from 'lodash'
import block from 'bem-cn'
import './style.less';

/**
 * Server container
 * @class
 */
class Server extends React.Component {
    /**
     * Server container properties
     * @static
     * @property {bool} fetching Is data fetching
     * @property {bool} minimized Is window minimized
     * @property {array} items Server and tables
     */
    static propTypes = {
        fetching: PropTypes.bool,
        minimized: PropTypes.bool,
        items: PropTypes.array.isRequired,
    }

    /**
     * Creates Server container
     * @constructor
     */
    constructor(props) {
        const textboxFilterChangeDelay = 700

        super(props)

        this.state = {
            showCreateDatabaseModal: false,
            filter: '',
            selectedIndex: null
        }

        this.debouncedTextboxFilterChange = debounce(this.debouncedTextboxFilterChange, textboxFilterChangeDelay)
    }

    onCloseCreateDatabaseModal = () => {
        this.setState({
            showCreateDatabaseModal: false
        })
    }

    /**
     * Fetches data after the component was mounted
     * @method
     */
    componentDidMount() {
        const
            { getServer, restoreWindow } = this.props.serverActions

        restoreWindow()
        getServer()
    }

    /**
     * Refreshes server view
     * @method
     * @param {object} nextProps New properties
     */
    componentWillReceiveProps(nextProps) {
        const { items, location, match } = nextProps

        // If we came from direct url (/server/<name>)
        if (items.length > 0) {
            const sortedItems = items.sort((a, b) => a > b)

            this.setState({
                selectedIndex: sortedItems.findIndex(item => location.pathname.includes(item))
            })
        // If database window was closed
        } else if (match.isExact) {
            this.setState({
                selectedIndex: null
            })
        }
    }

    /**
     * Show modal when toolbar button Create clicked
     * @method
     */
    onToolBarButtonCreateDatabaseClick = () => {
        this.setState({
            showCreateDatabaseModal: true
        })
    }

    /**
     * Show modal when toolbar button Edit clicked
     * @method
     */
    onToolBarButtonEditDatabaseClick = () => {
        console.log('toolbar button Edit cliked')
    }

    /**
     * Show confirm modal when toolbar button Delete clicked
     * @method
     */
    onToolBarButtonDeleteDatabaseClick = () => {
        console.log('toolbar button Delete cliked')
    }

    /**
     * Minimizes the window
     * @method
     */
    onWindowButtonMinimizeClick = (e) => {
        const { minimizeWindow } = this.props.serverActions

        minimizeWindow()

        e.stopPropagation()
    }

    /**
     * Closes the window and goes to previous route
     * @method
     */
    onWindowButtonCloseClick = () => {
        const { history } = this.props

        history.push('/')
    }

    /**
     * Restores the window
     * @method
     */
    onWindowClick = () => {
        const { restoreWindow } = this.props.serverActions

        restoreWindow()
    }

    /**
     * Redirects to selected database details
     * @method
     * @param {number} index The index of selected item
     */
    onListViewChange = (index) => {
        const
            { items, history } = this.props,
            sortedItems = items.sort((a, b) => a > b)

        this.setState({
            selectedIndex: index
        })

        history.push(`/server/${sortedItems[index]}`)
    }

    /**
     * Gets the list of server filtered by string (debounced)
     * @function
     * @param {string} filter String used as filter
     */
    debouncedTextboxFilterChange = (token) => {
        const { getServer } = this.props.serverActions

        getServer(token)
    }

    /**
     * Stores the filter and invokes debounced handler
     */
    onTextboxFilterChange = (e) => {
        e.persist()

        this.setState({
            filter: e.target.value
        })

        this.debouncedTextboxFilterChange(e.target.value)
    }

    /**
     * Renders Summary container
     * @method
     */
    render() {
        const
            b = block('server'),
            { fetching, match, minimized, items } = this.props,
            sortedItems = items.sort((a, b) => a.name > b.name)

        return (
            <div className={b({state: minimized ? 'minimized' : null})}>
                <div className={b('container')} onClick={this.onWindowClick}>
                    <div className={b('header')}>
                        <div className={b('title')}>
                            <Title primaryTitle="Local databases" />
                        </div>
                        <div className={b('spinner')}>
                            <Spinner active={fetching} type="rect" />
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
                    <div className={b('toolbar')}>
                        <Toolbar>
                            <ToolBarButton
                                icon="create"
                                label="New"
                                title="Create new database"
                                onClick={this.onToolBarButtonCreateDatabaseClick} />
                            <ToolBarButton
                                disabled={this.state.selectedIndex === null}
                                icon="edit"
                                label="Edit"
                                title="Edit database"
                                onClick={this.onToolBarButtonEditDatabaseClick} />
                            <ToolBarButton
                                disabled={this.state.selectedIndex === null}
                                icon="delete"
                                label="Delete"
                                title="Delete database"
                                onClick={this.onToolBarButtonDeleteDatabaseClick} />
                            <ToolBarSeparator />
                            <ToolBarButton
                                disabled={this.state.selectedIndex === null}
                                icon="import"
                                label="Import"
                                title="Import database"
                                onClick={this.onToolBarButtonEditDatabaseClick} />
                            <ToolBarButton
                                disabled={this.state.selectedIndex === null}
                                icon="export"
                                label="Export"
                                title="Export database"
                                onClick={this.onToolBarButtonEditDatabaseClick} />
                        </Toolbar>
                    </div>
                    <div className={b('filters')}>
                        <Textbox
                            id="filter"
                            placeholder="Filter by name..."
                            value={this.state.filter}
                            onChange={this.onTextboxFilterChange}/>
                    </div>
                    <div className={b('table')}>
                        <ListView
                            icon="database"
                            items={sortedItems}
                            selectedIndex={this.state.selectedIndex}
                            onChange={this.onListViewChange} />
                    </div>
                </div>
                <div className={b('view')}>
                    <Route path={`${match.url}/:database`} component={Database} />
                </div>
                <ReactModal
                    ariaHideApp={true}
                    className="ReactModal__Content-Small"
                    contentLabel="Create new database modal"
                    isOpen={this.state.showCreateDatabaseModal}
                    overlayClassName="ReactModal__Overlay"
                    onRequestClose={this.onCloseCreateDatabaseModal}
                    parentSelector={() => document.body}
                    shouldCloseOnOverlayClick={true}
                >
                    <Title primaryTitle="New database" />
                    <Form onReset={this.onCloseCreateDatabaseModal}>
                        <FormRow>
                            <FormField id="databaseName" label="Database name">
                                <Textbox id="databaseName" name="name" required={true} />
                            </FormField>
                            <FormButtons>
                                <FormButton>
                                    <Button label="Create" />
                                </FormButton>
                                <FormButton>
                                    <Button label="Cancel" type="reset"/>
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
        minimized: state.server.minimized,
        items: state.server.items
    }
}

function mapDispatchToProps(dispatch) {
    return {
        serverActions: bindActionCreators(serverActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Server)