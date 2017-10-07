import React from 'react'
import cn from 'cn-decorator';
import '../style.less'

/**
 * FormButtons component
 * @class
 */
@cn('FormButtons') class FormButtons extends React.Component {
    /**
     * Properties
     * @static
     */
    static propTypes = {}

    /**
     * Default properties
     * @static
     */
    static defaultProps = {}

    /**
     * Render component
     * @returns {XML} Component
     */
    render(cn) {
        const

            { children } = this.props

        return (
            <div className={cn('buttons')}>{children}</div>
        )
    }
}

export default FormButtons