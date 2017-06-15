import React from 'react'
import block from 'bem-cn'

/**
 * GridSeparator Component
 * @class
 */
class GridSeparator extends React.Component {
    /**
     * Render component
     * @returns {XML}
     */
    render() {
        const b = block('grid');

        return (
            <div className={b('separator')} />
        )
    }
}

export default GridSeparator