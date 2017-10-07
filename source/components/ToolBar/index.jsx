import React from 'react'
import ToolBarButton from './ToolBarButton'
import ToolBarSeparator from './ToolBarSeparator'
import cn from 'cn-decorator';
import './style.less'

/**
 * ToolBar Component
 * @class
 */
@cn('toolbar')
class ToolBar extends React.Component {
    /**
     * Properties
     * @static
     */
    static propTypes = {};

    /**
     * Default properties
     * @static
     */
    static defaultProps = {};

    /**
     * Render component
     * @returns {XML} Component
     */
    render(cn) {
        const { children } = this.props;

        return (
            <div className={cn()}>{children}</div>
        )
    }
}

export { ToolBarButton, ToolBarSeparator }
export default ToolBar