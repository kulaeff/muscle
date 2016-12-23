import React, { Component } from 'react'
import block from 'bem-cn'

/**
 * ToolBarSeparator Component
 * @class
 */
class ToolBarSeparator extends Component {
    /**
     * Renders ToolBarSeparator component
     */
    render() {
        const b = block('toolbar')

        return (
            <span className={b('separator')}></span>
        )
    }
}

export default ToolBarSeparator