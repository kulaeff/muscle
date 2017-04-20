import React, { Component, PropTypes } from 'react'
import block from 'bem-cn'
import './style.less'

/**
 * Indicator component
 * @class
 */
class Indicator extends Component {
    /**
     * Indicator's properties
     * @static
     * @property {string} title Title
     */
    static propTypes = {
        title: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired,
    }

    /**
     * Indicator's default properties
     * @static
     */
    static defaults = {
    }

    /**
     * Renders the Indicator component
     * @method
     */
    render() {
        const
            b = block('indicator'),
            {
                title,
                value
            } = this.props

        return (
            <div className={b()}>
                <span className={b('title')}>{title}</span>
                <div className={b('container')}>
                    <h3 className={b('value')}>{value}</h3>
                </div>
            </div>
        )
    }
}

export default Indicator