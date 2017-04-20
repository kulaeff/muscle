import React from 'react'
import PropTypes from 'prop-types'
import block from 'bem-cn'
import './style.less'

class Title extends React.Component {
    /**
     * Title properties
     * @static
     * @prop {string} primaryTitle Primary title
     * @prop {string} secondaryTitle Secondary title
     * @prop {string} size Size
     */
    static propTypes = {
        primaryTitle: PropTypes.string,
        secondaryTitle: PropTypes.string,
        size: PropTypes.oneOf(['small', 'medium', 'large']),
    }

    /**
     * Default Title properties
     * @static
     * @prop {string} size Default size
     */
    static defaults = {
        size: 'medium'
    }

    /**
     * Renders Title
     */
    render() {
        const
            b = block('title'),
            {
                primaryTitle = Title.defaults.primaryTitle,
                secondaryTitle = Title.defaults.secondaryTitle,
                size = Title.defaults.size
            } = this.props

        return (
            <span className={b({size})}>
                {
                    secondaryTitle ?
                        <span className={b('label', {context: 'secondary'})}>{secondaryTitle}</span>
                    : null
                }
                {
                    primaryTitle ?
                        <span className={b('label',  {context: 'primary'})}>{primaryTitle}</span>
                    : null
                }
            </span>
        )
    }
}

export default Title