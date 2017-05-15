import React from 'react'
import block from 'bem-cn'

/**
 * ToolBarSeparator Component
 * @class
 */
class ToolBarSeparator extends React.Component {
    /**
     * Render the component
     */
    render() {
        const b = block('toolbar')

        return (
            <span className={b('separator')}></span>
        )
    }
}

export default ToolBarSeparator