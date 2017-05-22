import React from 'react'
import PropTypes from 'prop-types'
import block from 'bem-cn'
import './style.less'

/**
 * Spinner components
 * @class
 */
class Spinner extends React.Component {
    /**
     * Properties
     * @static
     * @property {bool} active Is spinner active
     * @property {string} theme The theme of the spinner
     * @property {string} type The type of the spinner
     */
    static propTypes = {
        active: PropTypes.bool,
        theme: PropTypes.oneOf(['dark', 'light']),
        type: PropTypes.oneOf(['ellipse', 'rect'])
    }

    /**
     * Default properties
     * @static
     * @property {bool} active Is spinner active by default
     * @property {string} size The default size of the spinner
     * @property {string} theme The default theme of the spinner
     */
    static defaultProps = {
        active: false,
        theme: 'dark',
        type: 'ellipse'
    }

    /**
     * Render component
     * @returns {XML} Component
     */
    render() {
        const
            b = block('spinner'),
            { active, theme, type } = this.props

        return (
            <div className={b({state: active ? 'active' : null, theme, type})}>
            {
                type === 'rect' ?
                    <div className={b('container')}>
                        <div className={b('rect', {position: 'lt'})} />
                        <div className={b('rect', {position: 'rt'})} />
                        <div className={b('rect', {position: 'rb'})} />
                        <div className={b('rect', {position: 'lb'})} />
                    </div>
                :
                    <div className={b('container')}>
                        <div className={b('ellipse', {position: 'top'})} />
                        <div className={b('ellipse', {position: 'right'})} />
                        <div className={b('ellipse', {position: 'bottom'})} />
                        <div className={b('ellipse', {position: 'left'})} />
                    </div>

            }
            </div>
        )
    }
}

export default Spinner