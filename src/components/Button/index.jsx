import React, { Component, PropTypes } from 'react'
import block from 'bem-cn'
import './style.less'

/**
 * Button component
 * @class
 */
class Button extends Component {
    /**
     * Button's properties
     * @static
     * @property {bool} autoSize Full width of parent
     * @property {bool} disabled Is disabled
     * @property {string} label Label
     * @property {string} type Type
     */
    static propTypes = {
        autoSize: PropTypes.bool,
        disabled: PropTypes.bool,
        label: PropTypes.string.isRequired,
        type: PropTypes.string
    }

    /**
     * Button's default properties
     * @static
     * @property {bool} disabled Default state
     * @property {string} type Default type
     */
    static defaults = {
        autoSize: false,
        disabled: false,
        type: 'button'
    }

    /**
     * Renders the Button component
     * @method
     */
    render() {
        const
            b = block('button'),
            {
                autoSize = Button.defaults.autoSize,
                disabled = Button.defaults.disabled,
                label,
                type = Button.defaults.type
            } = this.props

        return (
            <button
                className={b({type, size: autoSize ? 'auto' : null})}
                disabled={disabled}
                type={type}
            >
                {label}
            </button>
        )
    }
}

export default Button