import React from 'react'
import ToolBarButton from './ToolBarButton'
import ToolBarSeparator from './ToolBarSeparator'
import block from 'bem-cn'
import './style.less'

/**
 * ToolBar Component
 * @class
 */
class ToolBar extends React.Component {
    /**
     * ToolBar properties
     * @static
     */
    static propTypes = {
    }

    /**
     * Default values of ToolBar properties
     * @static
     */
    static defaults = {
    }

    /**
     * Renders ToolBar component
     * @method
     */
    render() {
        const
            b = block('toolbar'),
            { children } = this.props

        return (
            <div className={b()}>{children}</div>
        )
    }
}

export { ToolBarButton, ToolBarSeparator }
export default ToolBar