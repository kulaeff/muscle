import React from 'react'
import PropTypes from 'prop-types'
import FormBody from './FormBody'
import FormButton from './FormButton'
import FormButtons from './FormButtons'
import FormField from './FormField'
import FormGroup from './FormGroup'
import cn from 'cn-decorator';
import './style.less'

/**
 * Form component
 * @class
 */
@cn('form')
class Form extends React.Component {
    /**
     * Properties
     * @static
     * @property {string} action Action
     * @property {string} method Method
     * @property {string} orientation Orientation
     * @property {function} onSubmit Submit handler
     * @property {function} onReset Reset handler
     */
    static propTypes = {
        action: PropTypes.string,
        method: PropTypes.oneOf(['GET', 'POST']),
        orientation: PropTypes.oneOf(['horizontal', 'vertical']),
        onSubmit: PropTypes.func,
        onReset: PropTypes.func,
    };

    /**
     * Default properties
     * @static
     * @property {string} action Default action
     * @property {string} action Default method
     */
    static defaultProps = {
        action: '',
        method: 'GET',
        orientation: 'vertical'
    };

    /**
     * Render component
     * @returns {XML} Rendered element
     */
    render(cn) {
        const {
            children,
            action,
            method,
            orientation,
            onReset,
            onSubmit
        } = this.props;

        return (
            <form
                className={cn({orientation})}
                action={action}
                method={method}
                onReset={onReset}
                onSubmit={onSubmit}>
                {children}
            </form>
        )
    }
}

export { FormBody, FormButton, FormButtons, FormField, FormGroup }
export default Form