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
     * Properties
     * @static
     * @property {string} id ID
     * @property {string} label Label
     * @property {bool} required Is required
     */
    static propTypes = {
        id: PropTypes.string,
        label: PropTypes.string,
        required: PropTypes.bool,
    };

    /**
     * Default properties
     * @static
     */
    static defaultProps = {};

    /**
     * Render component
     * @returns {XML} Component
     */
    render() {
        const
            b = block('form'),
            { children, id, label, required } = this.props;

        return (
            <div className={b('field', {required})}>
                {
                    label ? (
                        <label className={b('field-label')} htmlFor={id}>{label}</label>
                    ) : null
                }
                <div className={b('field-container')}>{children}</div>
            </div>
        )
    }
}

export default FormField