import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Button from '../../components/Button'
import Checkbox from '../../components/Checkbox'
import Form, { FormButton, FormButtons, FormField, FormRow } from '../../components/Form'
import Spinner from '../../components/Spinner'
import Textbox from '../../components/Textbox'
import Title from '../../components/Title'
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
     * @property {any} error Error object (if presented)
     * @property {bool} fetching Is data fetching
     * @property {json} fields Fields
     */
    static propTypes = {
        error: PropTypes.any,
        fetching: PropTypes.bool,
        fields: PropTypes.object
    }

    /**
     * Creates Column container
     * @constructor
     */
    constructor(props) {
        super(props)

        this.state = {
            minimized: false,
            fields: {}
        }
    }

    close = () => {
        const { router, params } = this.props

        router.push(`/server/${params.database}/${params.table}`)
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

        if (Object.keys(nextProps.fields).length > 0) {
            this.setState({
                fields: {
                    ...nextProps.fields
                }
            })
        }
    }

    /**
     * Resets form and closes window
     */
    onFormReset = () => {
        this.setState({
            fields: {}
        })

        this.close()
    }

    /**
     * Submits form and closes window
     */
    onFormSubmit = (e) => {
        const { saveColumn } = this.props.columnActions

        saveColumn(this.state.fields).then(() => {
            this.close()
        })

        e.preventDefault()
    }

    /**
     * Updates state on field change
     * @method
     * @param {string} field The name of a field that has to be changed
     * @param {any} value Changed value of a field
     */
    onFieldChange = (field, value) => {
        const fields = this.state.fields

        fields[field] = value

        this.setState({
            fields
        })
    }

    /**
     * Updates name field
     * @method
     * @param {object} e Event
     */
    onTextboxNameChange = (e) => {
        this.onFieldChange('name', e.target.value)
    }

    /**
     * Updates type field
     * @method
     * @param {object} e Event
     */
    onTextboxTypeChange = (e) => {
        this.onFieldChange('type', e.target.value)
    }

    /**
     * Updates length field
     * @method
     * @param {object} e Event
     */
    onTextboxLengthChange = (e) => {
        this.onFieldChange('length', e.target.value)
    }

    /**
     * Updates collation field
     * @method
     * @param {object} e Event
     */
    onTextboxCollationChange = (e) => {
        this.onFieldChange('collation', e.target.value)
    }

    /**
     * Updates attributes field
     * @method
     * @param {object} e Event
     */
    onTextboxAttributesChange = (e) => {
        this.onFieldChange('attributes', e.target.value)
    }

    /**
     * Updates null field
     * @method
     * @param {object} e Event
     */
    onTextboxNullChange = () => {
        this.onFieldChange('null', !this.state.fields.null)
    }

    /**
     * Updates default field
     * @method
     * @param {object} e Event
     */
    onTextboxDefaultChange = (e) => {
        this.onFieldChange('default', e.target.value)
    }

    /**
     * Updates extra field
     * @method
     * @param {object} e Event
     */
    onTextboxExtraChange = () => {
        this.onFieldChange('extra', !this.state.fields.extra)
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
            { fetching, params } = this.props

        return (
            <div className={b({state: this.state.minimized ? 'minimized' : null})}>
                <div className={b('container')} onClick={this.onWindowClick}>
                    <div className={b('header')}>
                        <div className={b('title')}>
                            <Title primaryTitle={params.column} />
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
                                <FormField id="name" label="Name" required={true}>
                                    <Textbox
                                        id="name"
                                        name="name"
                                       required={true}
                                        value={this.state.fields.name}
                                        onChange={this.onTextboxNameChange} />
                                </FormField>
                            </FormRow>
                            <FormRow>
                                <FormField id="type" label="Type" required={true}>
                                    <Textbox
                                        id="type"
                                        name="type"
                                        required={true}
                                        value={this.state.fields.type}
                                        onChange={this.onTextboxTypeChange} />
                                </FormField>
                            </FormRow>
                            <FormRow>
                                <FormField id="length" label="length" required={true}>
                                    <Textbox
                                        id="length"
                                        name="length"
                                        required={true}
                                        value={this.state.fields.length}
                                        onChange={this.onTextboxLengthChange} />
                                </FormField>
                            </FormRow>
                            <FormRow>
                                <FormField id="collation" label="Collation">
                                    <Textbox
                                        id="collation"
                                        name="collation"
                                        value={this.state.fields.collation}
                                        onChange={this.onTextboxCollationChange} />
                                </FormField>
                            </FormRow>
                            <FormRow>
                                <FormField id="attributes" label="Attributes">
                                    <Textbox
                                        id="attributes"
                                        name="attributes"
                                        value={this.state.fields.attributes}
                                        onChange={this.onTextboxAttributesChange} />
                                </FormField>
                            </FormRow>
                            <FormRow>
                                <FormField id="default" label="Default" required={true}>
                                    <Textbox
                                        id="default"
                                        name="default"
                                        required={true}
                                        value={this.state.fields.default}
                                        onChange={this.onTextboxDefaultChange} />
                                </FormField>
                            </FormRow>
                            <FormRow>
                                <FormField>
                                    <Checkbox
                                        checked={this.state.fields.null}
                                        label="Allow null"
                                        onChange={this.onTextboxNullChange} />
                                </FormField>
                            </FormRow>
                            <FormRow>
                                <FormField>
                                    <Checkbox
                                        checked={this.state.fields.extra}
                                        label="Auto increment"
                                        onChange={this.onTextboxExtraChange} />
                                </FormField>
                            </FormRow>
                            <FormButtons>
                                <FormButton>
                                    <Button disabled={fetching} label="Save" type="submit" />
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
        error: state.column.error,
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