import React from 'react'
import cn from 'cn-decorator';

/**
 * ToolBarSeparator Component
 * @class
 */
@cn('toolbar')
class ToolBarSeparator extends React.Component {
    /**
     * Render the component
     */
    render(cn) {
        return (
            <span className={cn('separator')} />
        )
    }
}

export default ToolBarSeparator