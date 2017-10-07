import React from 'react'
import PropTypes from 'prop-types'
import cn from 'cn-decorator';
import './style.less'

/**
 * Checkbox component
 * @class
 */
@cn('checkbox')
class Checkbox extends React.Component {
    /**
     * Invokes onChange callback
     * @method
     */
    handleClick = () => {
        const { onChange } = this.props;

        if (onChange) {
            onChange()
        }
    };

    /**
     * Render the component
     * @returns {XML} Rendered element
     */
    render(cn) {
        const { _grouped, checked, disabled, label } = this.props;

        return (
            <div
                className={cn({
                    grouping: _grouped ? 'grouped' : null,
                    mode: disabled ? 'disabled' : null,
                    state: checked ? 'checked' : null
                })}
                onClick={this.handleClick}
            >
                <div className={cn('control')}>
                    <div className={cn('control-rectangle')} />
                </div>
                {
                    label.length > 0 && <span className={cn('label')}>{label}</span>
                }
            </div>
        )
    }
}

/**
 * Properties
 * @static
 * @property {bool} _grouped Is in a CheckboxGroup
 * @property {bool} checked Is checked
 * @property {bool} disabled Is disabled
 * @property {string} label Label
 * @property {function} onChange Change handler
 */
Checkbox.propTypes = {
    _grouped: PropTypes.bool,
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
Checkbox.defaultProps = {
    _grouped: false,
    checked: false,
    disabled: false,
    label: ''
};

export default Checkbox