import React from 'react'
import cn from 'cn-decorator';
import '../style.less'

/**
 * FormButton component
 * @class
 */
@cn('FormButton') class FormButton extends React.Component {
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
    render(cn) {
        const

            { children } = this.props

        return (
            <div className={cn('button')}>{children}</div>
        )
    }
}

export default FormButton