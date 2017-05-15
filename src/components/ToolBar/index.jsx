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
     * Properties
     * @static
     */
    static propTypes = {
    }

    /**
     * Default properties
     * @static
     */
    static defaultProps = {
    }

    /**
     * Render component
     * @returns {XML} Component
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