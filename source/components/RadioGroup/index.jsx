import React from 'react'
import PropTypes from 'prop-types'
import block from 'bem-cn'
import './style.less'

/**
 * RadioGroup component
 * @class
 */
class RadioGroup extends React.Component {
    /**
     * Properties
     * @static
     * @property {string} flow Flow
     */
    static propTypes = {
        flow: PropTypes.oneOf(['column', 'row'])
    };

    /**
     * Default properties
     * @static
     * @property {string} flow Default flow
     */
    static defaultProps = {
        flow: 'row'
    };

    /**
     * Render the component
     * @method
     */
    render() {
        const
            b = block('radio-group'),
            { children, flow } = this.props;

        return (
            <div className={b({flow})}>
                {
                    React.Children.map(children, button => React.cloneElement(button, {
                        grouped: true
                    }))
                }
            </div>
        )
    }
}

export default RadioGroup