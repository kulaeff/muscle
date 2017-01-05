import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Button from '../../components/Button'
import Form, { FormButton, FormButtons, FormField, FormRow } from '../../components/Form'
import Spinner from '../../components/Spinner'
import Textbox from '../../components/Textbox'
import * as columnActions from '../../actions/column'
import block from 'bem-cn'
import './style.less';

/**
 * Column container
 * @class
 */
class Column extends Component {
    /**
     * Column container properties
     * @static
     * @property {bool} fetching Is data fetching
     * @property {json} fields Fields
     */
    static propTypes = {
        fetching: PropTypes.bool,
        fields: PropTypes.object.isRequired,
    }

    /**
     * Creates Column container
     * @constructor
     */
    constructor(props) {
        super(props)

        this.state = {
            minimized: false
        }
    }

    close = () => {
        const { router, params } = this.props

        router.push(`/databases/${params.database}/${params.table}`)
    }

    /**
     * Fetches column for selected database
     */
    refresh() {
        const { getColumn } = this.props.columnActions

        getColumn()
    }

    /**
     * Fetches column when database was selected for the first time
     * @method
     */
    componentDidMount() {
        this.refresh()
    }

    /**
     * Fetches column when selected database was changed
     * @method
     */
    componentWillReceiveProps(nextProps) {
        const { params } = this.props

        if (params.column !== nextProps.params.column) {
            this.refresh()
        }
    }

    /**
     * Resets form and closes window
     */
    onFormReset = () => {
        this.close()
    }

    /**
     * Submits form and closes window
     */
    onFormSubmit = (e) => {
        this.close()

        e.preventDefault()
    }

    /**
     * Show modal when toolbar button Create clicked
     * @method
     */
    onToolBarButtonCreateDatabaseClick = () => {
        console.log('toolbar button Create cliked')
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
    onWindowButtonMinimizeClick = () => {
        this.setState({
            minimized: true
        })
    }

    /**
     * Closes the window and goes to previous route
     * @method
     */
    onWindowButtonCloseClick = () => {
        this.close()
    }

    /**
     * Restores the window
     * @method
     */
    onWindowClick = () => {
        if (this.state.minimized) {
            this.setState({
                minimized: false
            })
        }
    }

    /**
     * Renders Summary container
     * @method
     */
    render() {
        const
            b = block('column'),
            { fetching, fields, params } = this.props

        return (
            <div className={b({state: this.state.minimized ? 'minimized' : null})}>
                <div className={b('container')} onClick={this.onWindowClick}>
                    <div className={b('header')}>
                        <div className={b('title')}>
                            <span className={b('title-label')}>Column</span>
                            <span className={b('title-description')}>{params.column}</span>
                        </div>
                        <div className={b('spinner')}><Spinner active={fetching} type="rect" /></div>
                        <div className={b('buttons')}>
                            <button
                                className={b('button', {action: 'minimize'})}
                                onClick={this.onWindowButtonMinimizeClick}></button>
                            <button
                                className={b('button', {action: 'close'})}
                                onClick={this.onWindowButtonCloseClick}></button>
                        </div>
                    </div>
                    <div className={b('form')}>
                        <Form onReset={this.onFormReset} onSubmit={this.onFormSubmit}>
                            <FormRow>
                                <FormField id="name" label="Name">
                                    <Textbox id="name" name="name" value={fields.name}/>
                                </FormField>
                            </FormRow>
                            <FormRow>
                                <FormField id="type" label="Type">
                                    <Textbox id="type" name="type" value={fields.type} />
                                </FormField>
                            </FormRow>
                            <FormRow>
                                <FormField id="collation" label="Collation">
                                    <Textbox id="collation" name="collation" value={fields.collation} />
                                </FormField>
                            </FormRow>
                            <FormRow>
                                <FormField id="attributes" label="Attributes">
                                    <Textbox id="attributes" name="attributes" value={fields.attributes} />
                                </FormField>
                            </FormRow>
                            <FormRow>
                                <FormField id="null" label="Null">
                                    <Textbox id="null" name="null" value={fields.null} />
                                </FormField>
                            </FormRow>
                            <FormRow>
                                <FormField id="default" label="Default">
                                    <Textbox id="default" name="default" value={fields.default} />
                                </FormField>
                            </FormRow>
                            <FormRow>
                                <FormField id="extra" label="Extra">
                                    <Textbox id="extra" name="extra" value={fields.extra} />
                                </FormField>
                            </FormRow>
                            <FormButtons>
                                <FormButton>
                                    <Button label="Save" type="submit" />
                                </FormButton>
                                <FormButton>
                                    <Button label="Cancel" type="reset" />
                                </FormButton>
                            </FormButtons>
                        </Form>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps (state) {
    return {
        fetching: state.column.fetching,
        fields: state.column.fields
    }
}

function mapDispatchToProps(dispatch) {
    return {
        columnActions: bindActionCreators(columnActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Column)