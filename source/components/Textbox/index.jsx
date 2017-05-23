import React from 'react'
import PropTypes from 'prop-types'
import block from 'bem-cn'
import './style.less'

/**
 * Textbox component
 * @class
 */
class Textbox extends React.Component {
    /**
     * Properties
     * @static
     * @property {string} id The Textbox's id
     * @property {string} name The Textbox's name
     * @property {string} pattern Validation pattern
     * @property {string} placeholder The Textbox's placeholder
     * @property {bool} required Is required (value matches the pattern)
     * @property {string} title Title or pattern description
     * @property {string} type Type of the input (text or password)
     * @property {string} value The Textbox's value
     * @property {function} onChange The Textbox's change handler
     */
    static propTypes = {
        id: PropTypes.string.isRequired,
        name: PropTypes.string,
        pattern: PropTypes.string,
        placeholder: PropTypes.string,
        required: PropTypes.bool,
        title: PropTypes.string,
        type: PropTypes.oneOf(['text', 'password']),
        value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        onChange: PropTypes.func
    }

    /**
     * Default properties
     * @static
     * @property {bool} required Default is required
     * @property {string} theme Default theme
     */
    static defaultProps = {
        required: false,
        type: 'text',
        value: ''
    }

    /**
     * Render component
     * @returns {XML} Component
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
                title,
                type = Textbox.defaults.type,
                value = Textbox.defaults.value,
                onChange
            } = this.props

        return (
            <input
                className={b()}
                id={id}
                pattern={pattern}
                name={name}
                placeholder={placeholder}
                required={required}
                title={title}
                type={type}
                value={value}
                onChange={onChange} />
        )
    }
}

export default Textbox