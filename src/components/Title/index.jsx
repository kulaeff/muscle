import React from 'react'
import PropTypes from 'prop-types'
import block from 'bem-cn'
import './style.less'

class Title extends React.Component {
    /**
     * Properties
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
     * Default properties
     * @static
     * @prop {string} size Default size
     */
    static defaultProps = {
        size: 'medium'
    }

    /**
     * Render the component
     * @returns {XML} Component
     */
    render() {
        const
            b = block('title'),
            {
                primaryTitle,
                secondaryTitle,
                size
            } = this.props;

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