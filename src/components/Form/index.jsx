import React, { Component, PropTypes } from 'react'
import FormButton from './FormButton'
import FormButtons from './FormButtons'
import FormField from './FormField'
import FormRow from './FormRow'
import block from 'bem-cn'
import './style.less'

/**
 * Form component
 * @class
 */
class Form extends Component {
    /**
     * Form's properties
     * @static
     * @property {string} action Action
     * @property {string} placeholder Method
     * @property {function} onSubmit Submit handler
     * @property {function} onReset Reset handler
     */
    static propTypes = {
        action: PropTypes.string,
        method: PropTypes.oneOf(['GET', 'POST']),
        onSubmit: PropTypes.func,
        onReset: PropTypes.func,
    }

    /**
     * Form's default properties
     * @static
     * @property {string} action Default action
     * @property {string} action Default method
     */
    static defaults = {
        action: '',
        method: 'GET'
    }

    /**
     * Renders the Form component
     * @method
     */
    render() {
        const
            b = block('form'),
            { children, action, method, onReset, onSubmit } = this.props

        return (
            <form
                className={b()}
                action={action}
                method={method}
                onReset={onReset}
                onSubmit={onSubmit}>
                {children}
            </form>
        )
    }
}

export { FormButton, FormButtons, FormField, FormRow }
export default Form