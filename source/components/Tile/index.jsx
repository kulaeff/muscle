import React from 'react'
import PropTypes from 'prop-types'
import cn from 'cn-decorator';
import './style.less'

/**
 * Tile component
 * @class
 */
@cn('tile')
class Tile extends React.Component {
    /**
     * Properties
     * @static
     * @property {string} title Title
     */
    static propTypes = {
        title: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired,
    };

    /**
     * Default properties
     * @static
     */
    static defaultProps = {};

    /**
     * Render component
     * @returns {XML} Component
     */
    render(cn) {
        const {
            title,
            value
        } = this.props;

        return (
            <div className={cn()}>
                <span className={cn('title')}>{title}</span>
                <div className={cn('container')}>
                    <h3 className={cn('value')}>{value}</h3>
                </div>
            </div>
        )
    }
}

export default Tile