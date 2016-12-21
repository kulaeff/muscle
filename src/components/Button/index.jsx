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
     * @property {string} label The button's label
     * @property {string} size The button's size
     * @property {string} theme The button's theme
     * @property {string} type The button's type
     */
    static propTypes = {
        icon: PropTypes.string,
        label: PropTypes.string,
        size: PropTypes.oneOf(['small', 'medium', 'large']),
        theme: PropTypes.oneOf(['dark', 'light']),
        type: PropTypes.oneOf(['default', 'icon', 'composite'])
    }

    /**
     * Button's default properties
     * @static
     * @property {string} theme The button's default theme
     * @property {string} type The button's default type
     */
    static defaults = {
        size: 'medium',
        theme: 'dark',
        type: 'default'
    }

    /**
     * Renders the Button component
     * @method
     */
    render() {
        const
            b = block('button'),
            {
                icon,
                label,
                size = 'small',
                theme = Button.defaults.theme,
                type = Button.defaults.type
            } = this.props

        return (
            <button className={b({size, theme, type})}>
                {
                    type !== 'icon' ?
                        (label ? label : null)
                    : <svg><use xlinkHref={`#icon-${icon}`}></use></svg>
                }
            </button>
        )
    }
}

export default Button