import React from 'react'
import block from 'bem-cn'
import '../style.less'

/**
 * FormButtons component
 * @class
 */
class FormButtons extends React.Component {
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
    render() {
        const
            b = block('form'),
            { children } = this.props

        return (
            <div className={b('buttons')}>{children}</div>
        )
    }
}

export default FormButtons