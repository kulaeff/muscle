import React from 'react'
import PropTypes from 'prop-types'
import block from 'bem-cn'
import './style.less'

/**
 * Tile component
 * @class
 */
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
    render() {
        const
            b = block('tile'),
            {
                title,
                value
            } = this.props;

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

export default Tile