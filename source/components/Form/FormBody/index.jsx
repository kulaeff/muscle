import React from 'react'
import PropTypes from 'prop-types'
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
     * @param {string} flow Flow
     */
    static propTypes = {
        flow: PropTypes.oneOf(['column', 'row']),
    };

    /**
     * Default properties
     * @static
     * @param {string} flow Default flow
     */
    static defaultProps = {
        flow: 'column'
    };

    /**
     * Render component
     * @returns {XML} Component
     */
    render() {
        const
            b = block('form'),
            { children, flow } = this.props;

        return (
            <div className={b('body', {flow})}>{children}</div>
        )
    }
}

export default FormBody