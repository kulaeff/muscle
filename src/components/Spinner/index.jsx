import React, { Component, PropTypes } from 'react'
import block from 'bem-cn'
import './style.less'

/**
 * Spinner components
 * @class
 */
class Spinner extends Component {
    /**
     * Spinner properties
     * @static
     * @property {bool} active Is spinner active
     * @property {string} size The size of the spinner
     * @property {string} theme The theme of the spinner
     */
    static propTypes = {
        active: PropTypes.bool,
        size: PropTypes.oneOf(['small', 'medium', 'large']),
        theme: PropTypes.oneOf(['dark', 'light'])
    }

    /**
     * Default values of Spinner properties
     * @static
     * @property {bool} active Is spinner active by default
     * @property {string} size The default size of the spinner
     * @property {string} theme The default theme of the spinner
     */
    static defaults = {
        active: false,
        size: 'small',
        theme: 'dark'
    }

    /**
     * Renders Spinner component
     * @method
     */
    render() {
        const
            b = block('spinner'),
            { active, size = Spinner.defaults.size, theme = Spinner.defaults.theme } = this.props

        return (
            <div className={b({size, state: active ? 'active' : null, theme})}>
                <div className={b('ellipse', {position: 'top'})}></div>
                <div className={b('ellipse', {position: 'right'})}></div>
                <div className={b('ellipse', {position: 'bottom'})}></div>
                <div className={b('ellipse', {position: 'left'})}></div>
            </div>
        )
    }
}

export default Spinner