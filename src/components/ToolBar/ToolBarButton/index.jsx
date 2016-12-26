import React, { Component, PropTypes } from 'react'
import block from 'bem-cn'

/**
 * ToolBarButton Component
 * @class
 */
class ToolBarButton extends Component {
    /**
     * ToolBarButton properties
     * @static
     * @property {bool} disabled Is button disabled?
     * @property {string} icon The icon of the button
     * @property {string} title The title of the button
     * @property {func} onClick Click event handler
     */
    static propTypes = {
        disabled: PropTypes.bool,
        icon: PropTypes.string.isRequired,
        title: PropTypes.string,
        onClick: PropTypes.func
    }

    /**
     * Default values of ToolBarButton properties
     * @static
     */
    static defaults = {
        title: 'undefined'
    }

    /**
     * Renders ToolBarButton component
     */
    render() {
        const
            b = block('toolbar'),
            { disabled, icon, title, onClick } = this.props

        return (
            <button
                className={b('button', {state: disabled ? 'disabled' : null})}
                disabled={disabled}
                title={title}
                onClick={onClick}>
                <svg>
                    <use xlinkHref={`#icon-${icon}`} />
                </svg>
            </button>
        )
    }
}

export default ToolBarButton