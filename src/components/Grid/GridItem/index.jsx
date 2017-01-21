import React, { Component, PropTypes } from 'react'
import block from 'bem-cn'

/**
 * GridItem Component
 * @class
 */
class GridItem extends Component {
    /**
     * GridItem properties
     * @static
     */
    static propTypes = {
        size: PropTypes.number,
    }

    constructor(props) {
        super(props)
    }

    /**
     * Renders GridItem component
     */
    render() {
        const
            b = block('grid'),
            {
                children,
            } = this.props

        return (
            <div className={b('item')}>{children}</div>
        )
    }
}

export default GridItem