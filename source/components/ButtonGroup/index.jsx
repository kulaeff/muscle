import React from 'react'
import PropTypes from 'prop-types'
import block from 'bem-cn'
import './style.less'

/**
 * ButtonGroup component
 * @class
 */
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
        align: 'center',
        flow: 'row'
    };

    /**
     * Render the component
     * @method
     */
    render() {
        const
            b = block('button-group'),
            { children, align, flow } = this.props;

        return (
            <div className={b({align, flow})}>
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