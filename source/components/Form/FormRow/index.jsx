import React from 'react'
import block from 'bem-cn'
import '../style.less'

/**
 * FormRow component
 * @class
 */
class FormRow extends React.Component {
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
    render() {
        const
            b = block('form'),
            { children } = this.props;

        return (
            <div className={b('row')}>{children}</div>
        )
    }
}

export default FormRow