import React, { Component, PropTypes } from 'react'
import block from 'bem-cn'
import './style.less'

/**
 * Switch component
 * @class
 */
class Switch extends Component {
    /**
     * Switch's properties
     * @static
     * @property {bool} checked Is checked
     * @property {string} label Label
     * @property {function} onChange Change handler
     */
    static propTypes = {
        checked: PropTypes.bool,
        label: PropTypes.string,
        onChange: PropTypes.func
    }

    /**
     * Switch's default properties
     * @static
     * @property {bool} checked Default is checked
     */
    static defaults = {
        checked: false,
        label: ''
    }

    /**
     * Toggles checked state and invokes onChange handler
     * @method
     */
    onClick = () => {
        const { onChange } = this.props

        if (onChange) {
            onChange()
        }
    }

    /**
     * Renders the Switch component
     * @method
     */
    render() {
        const
            b = block('switch'),
            {
                checked = Switch.defaults.checked,
                label = Switch.defaults.label
            } = this.props

        return (
            <div
                className={b({state: checked ? 'checked' : null})}
                onClick={this.onClick}
            >
                <div className={b('label')}>{label}</div>
                <div className={b('control')}>
                    <div className={b('control-rectangle')}>
                        <div className={b('control-knob')}></div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Switch