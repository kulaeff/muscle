import React from 'react'
import block from 'bem-cn'
import '../style.less'

/**
 * FormBody component
 * @class
 */
class FormBody extends React.Component {
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
            <div className={b('body')}>{children}</div>
        )
    }
}

export default FormBody