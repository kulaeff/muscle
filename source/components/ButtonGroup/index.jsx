import React from 'react'
import PropTypes from 'prop-types'
import cn from 'cn-decorator';
import './style.less'

/**
 * ButtonGroup component
 * @class
 */
@cn('button-group')
class ButtonGroup extends React.Component {
    /**
     * Properties
     * @static
     * @property {string} align An alignment of buttons
     * @property {string} flow A flow of buttons
     */
    static propTypes = {
        align: PropTypes.oneOf(['center', 'left', 'right', 'opposite']),
        flow: PropTypes.oneOf(['column', 'row'])
    };

    /**
     * Default properties
     * @static
     * @property {string} flow Default flow
     */
    static defaultProps = {
        align: 'right',
        flow: 'row'
    };

    /**
     * Render the component
     * @method
     */
    render(cn) {
        const { children, align, flow } = this.props;

        return (
            <div className={cn({align, flow})}>
                {
                    React.Children.map(children, button => React.cloneElement(button, {
                        _flow: flow
                    }))
                }
            </div>
        )
    }
}

export default ButtonGroup