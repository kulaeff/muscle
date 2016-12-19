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
     * @property {string} icon The icon of the button
     * @property {func} onClick Click event handler
     */
    static propTypes = {
        icon: PropTypes.string.isRequired,
        onClick: PropTypes.func
    }

    /**
     * Default values of ToolBarButton properties
     * @static
     */
    static defaults = {
        //
    }

    /**
     * Renders ToolBarButton component
     */
    render() {
        const
            b = block('toolbar'),
            { icon, onClick } = this.props

        return (
            <button
                className={b('button')}
                onClick={onClick}>
                <svg>
                    <use xlinkHref={`#icon-${icon}`} />
                </svg>
            </button>
        )
    }
}

export default ToolBarButton