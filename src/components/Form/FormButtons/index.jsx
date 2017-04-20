import React from 'react'
import block from 'bem-cn'
import '../style.less'

/**
 * FormButtons component
 * @class
 */
class FormButtons extends React.Component {
    /**
     * FormButtons's properties
     * @static
     */
    static propTypes = {
    }

    /**
     * FormButtons's default properties
     * @static
     */
    static defaults = {
    }

    /**
     * Renders the FormButtons component
     * @method
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