import React from 'react'
import PropTypes from 'prop-types'
import GridItem from './GridItem'
import block from 'bem-cn'
import './style.less'

/**
 * Grid Component
 * @class
 */
class Grid extends React.Component {
    /**
     * Properties
     * @static
     * @property {string} orientation Direction
     * @property {string} type Type
     */
    static propTypes = {
        orientation: PropTypes.oneOf(['horizontal', 'vertical']),
        type: PropTypes.oneOf(['default', 'tiled'])
    };

    /**
     * Default properties
     * @static
     * @property {string} orientation Default orientation
     */
    static defaultProps = {
        orientation: 'horizontal',
        type: 'default'
    };

    /**
     * Render component
     * @returns {XML} Component
     */
    render() {
        const
            b = block('grid'),
            {
                children,
                orientation,
                type
            } = this.props;

        return (
            <div className={b({orientation, type})}>{children}</div>
        )
    }
}

export { GridItem }
export default Grid