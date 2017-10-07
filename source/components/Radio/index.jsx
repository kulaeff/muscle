import React from 'react'
import PropTypes from 'prop-types'
import cn from 'cn-decorator';
import './style.less'

/**
 * Radio component
 * @class
 */
@cn('radio')
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
    render(cn) {
        const { checked, disabled, grouped, label, value } = this.props;

        return (
            <div
                className={cn({
                    grouping: grouped ? 'grouped' : null,
                    state: checked ? 'checked' : null,
                    mode: disabled ? 'disabled' : null
                })}
                onClick={() => this.onClick(value)}
            >
                <div className={cn('control')}>
                    <div className={cn('control-circle')} />
                </div>
                {
                    label.length > 0 && <div className={cn('label')}>{label}</div>
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