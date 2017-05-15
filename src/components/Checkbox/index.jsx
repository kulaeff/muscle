import React from 'react'
import PropTypes from 'prop-types'
import block from 'bem-cn'
import './style.less'

/**
 * Checkbox component
 * @class
 */
class Checkbox extends React.Component {
    /**
     * Properties
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
     * Default properties
     * @static
     * @property {bool} checked Default is checked
     */
    static defaultProps = {
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
     * Render the component
     * @returns {XML} Rendered element
     */
    render() {
        const
            b = block('checkbox'),
            {
                checked = Checkbox.defaults.checked,
                label = Checkbox.defaults.label
            } = this.props

        return (
            <div
                className={b({state: checked ? 'checked' : null})}
                onClick={this.onClick}
            >
                <div className={b('control')}>
                    <div className={b('control-rectangle')}></div>
                </div>
                <div className={b('label')}>{label}</div>
            </div>
        )
    }
}

export default Checkbox