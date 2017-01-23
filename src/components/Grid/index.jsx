import React, { Component, PropTypes } from 'react'
import GridItem from './GridItem'
import block from 'bem-cn'
import './style.less'

/**
 * Grid Component
 * @class
 */
class Grid extends Component {
    /**
     * Grid properties
     * @static
     * @property {string} orientation Direction
     */
    static propTypes = {
        orientation: PropTypes.string,
    }

    /**
     * Default Grid properties
     * @static
     * @property {string} orientation Default orientation
     */
    static defaults = {
        orientation: 'horizontal'
    }

    /**
     * Renders Grid component
     * @method
     */
    render() {
        const
            b = block('grid'),
            {
                children,
                orientation = Grid.defaults.orientation
            } = this.props

        return (
            <div className={b({orientation, count: children.length})}>{children}</div>
        )
    }
}

export { GridItem }
export default Grid