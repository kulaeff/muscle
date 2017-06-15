import React from 'react'
import PropTypes from 'prop-types'
import block from 'bem-cn'
import './style.less'

/**
 * Radio component
 * @class
 */
class Radio extends React.Component {
    /**
     * Toggles checked state and invokes onChange handler
     * @method
     */
    onClick = (value) => {
        const { onChange } = this.props;

        if (onChange) {
            onChange(value)
        }
    };

    /**
     * Render the component
     * @returns {XML} Rendered element
     */
    render() {
        const
            b = block('radio'),
            { checked, disabled, grouped, label, value } = this.props;

        return (
            <div
                className={b({
                    grouping: grouped ? 'grouped' : null,
                    state: checked ? 'checked' : null,
                    mode: disabled ? 'disabled' : null
                })}
                onClick={() => this.onClick(value)}
            >
                <div className={b('control')}>
                    <div className={b('control-circle')} />
                </div>
                {
                    label.length > 0 && <div className={b('label')}>{label}</div>
                }
            </div>
        )
    }
}

/**
 * Properties
 * @property {bool} checked Checked
 * @property {bool} disabled Disabled
 * @property {string} label Label
 * @property {bool} grouped Is radio in a group
 * @property {callback} onChange
 */
Radio.propTypes = {
    checked: PropTypes.bool,
    disabled: PropTypes.bool,
    grouped: PropTypes.bool,
    label: PropTypes.string,
    value: PropTypes.any.isRequired,
    onChange: PropTypes.func
};

Radio.defaultProps = {
    checked: false,
    disabled: false,
    grouped: false,
    label: ''
};

export default Radio