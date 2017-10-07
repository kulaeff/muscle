import React from 'react'
import PropTypes from 'prop-types'
import cn from 'cn-decorator';
import './style.less'

/**
 * Toggle component
 * @class
 */
@cn('toggle')
class Toggle extends React.Component {
    /**
     * Properties
     * @static
     * @property {bool} checked Is checked
     * @property {string} label Label
     * @property {function} onChange Change handler
     */
    static propTypes = {
        checked: PropTypes.bool,
        disabled: PropTypes.bool,
        label: PropTypes.string,
        onChange: PropTypes.func
    };

    /**
     * Default properties
     * @static
     * @property {bool} checked Default is checked
     */
    static defaultProps = {
        checked: false,
        disabled: false,
        label: ''
    };

    /**
     * Toggles checked state and invokes onChange handler
     * @method
     */
    onClick = () => {
        const { disabled, onChange } = this.props;

        if (!disabled && onChange) {
            onChange()
        }
    };

    /**
     * Render the component
     * @returns {XML} Component
     */
    render(cn) {
        const { checked, disabled, label } = this.props;

        return (
            <div
                className={cn({
                    mode: disabled ? 'disabled' : null,
                    state: checked ? 'checked' : null
                })}
                onClick={this.onClick}
            >
                <div className={cn('label')}>{label}</div>
                <div className={cn('control')}>
                    <div className={cn('rectangle')}>
                        <div className={cn('knob')} />
                    </div>
                </div>
            </div>
        )
    }
}

export default Toggle