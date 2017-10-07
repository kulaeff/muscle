import React from 'react'
import PropTypes from 'prop-types'
import cn from 'cn-decorator';
import './style.less'

/**
 * RadioGroup component
 * @class
 */
@cn('radio-group')
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
    render(cn) {
        const { children, flow } = this.props;

        return (
            <div className={cn({flow})}>
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