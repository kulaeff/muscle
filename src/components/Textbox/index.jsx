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
     * @property {string} id The Textbox's id
     * @property {string} name The Textbox's name
     * @property {string} pattern Validation pattern
     * @property {string} placeholder The Textbox's placeholder
     * @property {bool} required Is required (value matches the pattern)
     * @property {string} theme The Textbox's theme
     * @property {string} title Title or pattern description
     * @property {string} value The Textbox's value
     * @property {function} onChange The Textbox's change handler
     */
    static propTypes = {
        id: PropTypes.string.isRequired,
        name: PropTypes.string,
        pattern: PropTypes.string,
        placeholder: PropTypes.string,
        required: PropTypes.bool,
        theme: PropTypes.oneOf(['dark', 'light']),
        title: PropTypes.string,
        value: PropTypes.string,
        onChange: PropTypes.func
    }

    /**
     * Textbox's default properties
     * @static
     * @property {bool} required Default is required
     * @property {string} theme Default theme
     */
    static defaults = {
        required: false,
        theme: 'dark',
        value: ''
    }

    /**
     * Renders the Textbox component
     * @method
     */
    render() {
        const
            b = block('textbox'),
            {
                id,
                name,
                pattern,
                placeholder,
                required = Textbox.defaults.required,
                theme = Textbox.defaults.theme,
                title,
                value = Textbox.defaults.value,
                onChange
            } = this.props

        return (
            <input
                className={b({theme})}
                id={id}
                pattern={pattern}
                name={name}
                placeholder={placeholder}
                required={required}
                title={title}
                type="text"
                value={value}
                onChange={onChange} />
        )
    }
}

export default Textbox