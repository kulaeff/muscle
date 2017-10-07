import React from 'react'
import PropTypes from 'prop-types'
import cn from 'cn-decorator';
import '../style.less'

/**
 * FormGroup component
 * @class
 */
@cn('FormGroup') class FormGroup extends React.Component {
    /**
     * Properties
     * @static
     * @param {string} flow Flow
     */
    static propTypes = {
        flow: PropTypes.oneOf(['column', 'row']),
        width: PropTypes.number
    };

    /**
     * Default properties
     * @static
     * @param {string} flow Default flow
     */
    static defaultProps = {
        flow: 'column',
        width: 1
    };

    /**
     * Render component
     * @returns {XML} Component
     */
    render(cn) {
        const

            { children, flow, width } = this.props;

        return (
            <div className={cn('group', {flow, width: flow === 'column' ? width : null})}>
                {children}
            </div>
        )
    }
}

export default FormGroup