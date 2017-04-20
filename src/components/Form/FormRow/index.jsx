import React from 'react'
import block from 'bem-cn'
import '../style.less'

/**
 * FormRow component
 * @class
 */
class FormRow extends React.Component {
    /**
     * FormRow's properties
     * @static
     */
    static propTypes = {
    }

    /**
     * FormRow's default properties
     * @static
     */
    static defaults = {
    }

    /**
     * Renders the FormRow component
     * @method
     */
    render() {
        const
            b = block('form'),
            { children } = this.props

        return (
            <div className={b('row')}>{children}</div>
        )
    }
}

export default FormRow