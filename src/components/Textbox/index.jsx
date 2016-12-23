import React, { Component, PropTypes } from 'react'
import block from 'bem-cn'
import './style.less'

/**
 * Textbox component
 * @class
 */
class Textbox extends Component {
    /**
     * Textbox's properties
     * @static
     * @property {string} name The Textbox's name
     * @property {string} placeholder The Textbox's placeholder
     * @property {string} theme The Textbox's theme
     * @property {string} value The Textbox's value
     * @property {function} onChange The Textbox's change handler
     */
    static propTypes = {
        name: PropTypes.string,
        placeholder: PropTypes.string,
        theme: PropTypes.oneOf(['dark', 'light']),
        value: PropTypes.string,
        onChange: PropTypes.func
    }

    /**
     * Textbox's default properties
     * @static
     * @property {string} theme The Textbox's default theme
     */
    static defaults = {
        theme: 'dark',
    }

    /**
     * Renders the Textbox component
     * @method
     */
    render() {
        const
            b = block('textbox'),
            {
                name,
                placeholder,
                theme = Textbox.defaults.theme,
                value,
                onChange
            } = this.props

        return (
            <input
                className={b({theme})}
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange} />
        )
    }
}

export default Textbox