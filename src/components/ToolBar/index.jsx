import React, { Component, PropTypes } from 'react'
import ToolBarButton from './ToolBarButton'
import ToolBarSeparator from './ToolBarSeparator'
import block from 'bem-cn'
import './style.less'

/**
 * ToolBar Component
 * @class
 */
class ToolBar extends Component {
    /**
     * ToolBar properties
     * @static
     * @property {string} size The size of the toolbar
     * @property {string} theme The theme of the toolbar
     */
    static propTypes = {
        size: PropTypes.oneOf(['small', 'large']),
        theme: PropTypes.oneOf(['dark', 'light'])
    }

    /**
     * Default values of ToolBar properties
     * @static
     */
    static defaults = {
        size: 'small',
        theme: 'dark'
    }

    /**
     * Renders ToolBar component
     * @method
     */
    render() {
        const
            b = block('toolbar'),
            { children, size = ToolBar.defaults.size, theme = ToolBar.defaults.theme } = this.props

        return (
            <div className={b({size, theme})}>{children}</div>
        )
    }
}

export { ToolBarButton, ToolBarSeparator }
export default ToolBar