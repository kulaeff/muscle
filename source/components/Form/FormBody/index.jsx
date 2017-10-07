import React from 'react'
import PropTypes from 'prop-types'
import cn from 'cn-decorator';
import '../style.less'

/**
 * FormBody component
 * @class
 */
@cn('FormBody') class FormBody extends React.Component {
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
    render(cn) {
        const

            { children, flow } = this.props;

        return (
            <div className={cn('body', {flow})}>{children}</div>
        )
    }
}

export default FormBody