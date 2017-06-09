import React from 'react'
import PropTypes from 'prop-types'
import block from 'bem-cn'
import '../style.less'

/**
 * FormColumn component
 * @class
 */
class FormColumn extends React.Component {
    /**
     * Properties
     * @static
     */
    static propTypes = {
        size: PropTypes.oneOf([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16])
    };

    /**
     * Default properties
     * @static
     */
    static defaultProps = {
        size: 1
    };

    /**
     * Render component
     * @returns {XML} Component
     */
    render() {
        const
            b = block('form'),
            { children, size } = this.props;

        return (
            <div className={b('column', {size})}>{children}</div>
        )
    }
}

export default FormColumn