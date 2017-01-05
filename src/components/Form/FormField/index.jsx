import React, { Component, PropTypes } from 'react'
import block from 'bem-cn'
import '../style.less'

/**
 * FormField component
 * @class
 */
class FormField extends Component {
    /**
     * FormField's properties
     * @static
     * @property {string} id ID
     * @property {string} label Label
     */
    static propTypes = {
        id: PropTypes.string,
        label: PropTypes.string
    }

    /**
     * FormField's default properties
     * @static
     * @property {string} label Default label
     */
    static defaults = {
        id: '',
        label: ''
    }

    /**
     * Renders the FormField component
     * @method
     */
    render() {
        const
            b = block('form'),
            { children, id = FormField.defaults.id, label = FormField.defaults.label } = this.props

        return (
            <div className={b('field')}>
                {
                    label ?
                        <label className={b('field-label')} htmlFor={id}>{label}</label>
                    : null
                }
                <div className={b('field-container')}>{children}</div>
            </div>
        )
    }
}

export default FormField