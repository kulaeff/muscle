import React from 'react'
import PropTypes from 'prop-types'
import GridItem from './GridItem'
import GridSeparator from './GridSeparator'
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
        orientation: PropTypes.oneOf(['horizontal', 'vertical'])
    };

    /**
     * Default properties
     * @static
     * @property {string} orientation Default orientation
     */
    static defaultProps = {
        orientation: 'horizontal',
    };

    /**
     * Render component
     * @returns {XML} Component
     */
    render() {
        const
            b = block('grid'),
            { children, orientation } = this.props;

        return (
            <div className={b({orientation})}>{children}</div>
        )
    }
}

export { GridItem, GridSeparator }
export default Grid