import React from 'react'
import PropTypes from 'prop-types'
import block from 'bem-cn'
import '../style.less'

/**
 * FormField component
 * @class
 */
class FormField extends React.Component {
    /**
     * FormField's properties
     * @static
     * @property {string} id ID
     * @property {string} label Label
     * @property {bool} required Is required
     */
    static propTypes = {
        id: PropTypes.string,
        label: PropTypes.string,
        required: PropTypes.bool
    }

    /**
     * FormField's default properties
     * @static
     */
    static defaults = {
    }

    /**
     * Renders the FormField component
     * @method
     */
    render() {
        const
            b = block('form'),
            { children, id, label, required } = this.props

        return (
            <div className={b('field', {required})}>
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