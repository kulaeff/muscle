import React from 'react'
import PropTypes from 'prop-types'
import cn from 'cn-decorator';
import './style.less'

@cn('title')
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
        size: PropTypes.oneOf(['small', 'medium', 'large', 'tiny']),
    };

    /**
     * Default properties
     * @static
     * @prop {string} size Default size
     */
    static defaultProps = {
        size: 'medium'
    };

    /**
     * Render the component
     * @returns {XML} Component
     */
    render(cn) {
        const {
            primaryTitle,
            secondaryTitle,
            size
        } = this.props;

        return (
            <span className={cn({size})}>
                {
                    secondaryTitle ? (
                        <span className={cn('label', {context: 'secondary'})}>{secondaryTitle}</span>
                    ) : null
                }
                {
                    primaryTitle ? (
                        <span className={cn('label',  {context: 'primary'})}>{primaryTitle}</span>
                    ) : null
                }
            </span>
        )
    }
}

export default Title