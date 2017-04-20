import React from 'react'
import block from 'bem-cn'
import '../style.less'

/**
 * FormButton component
 * @class
 */
class FormButton extends React.Component {
    /**
     * FormButton's properties
     * @static
     */
    static propTypes = {
    }

    /**
     * FormButton's default properties
     * @static
     */
    static defaults = {
    }

    /**
     * Renders the FormButton component
     * @method
     */
    render() {
        const
            b = block('form'),
            { children } = this.props

        return (
            <div className={b('button')}>{children}</div>
        )
    }
}

export default FormButton