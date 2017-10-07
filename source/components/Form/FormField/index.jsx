import React from 'react'
import PropTypes from 'prop-types'
import cn from 'cn-decorator';
import '../style.less'

/**
 * FormField component
 * @class
 */
@cn('form')
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
    render(cn) {
        const { children, id, label, required } = this.props;

        return (
            <div className={cn('field', {required})}>
                {
                    label ? (
                        <label className={cn('field-label')} htmlFor={id}>{label}</label>
                    ) : null
                }
                <div className={cn('field-container')}>{children}</div>
            </div>
        )
    }
}

export default FormField