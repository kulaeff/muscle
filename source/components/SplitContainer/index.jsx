import React from 'react'
import PropTypes from 'prop-types'
import SplitContainerPanel from './SplitContainerPanel'
import block from 'bem-cn'
import './style.less'

/**
 * SplitContainer component
 * @class
 */
class SplitContainer extends React.Component {
    /**
     * Properties
     * @static
     * @property {string} orientation Orientation
     */
    static propTypes = {
        orientation: PropTypes.oneOf(['horizontal', 'vertical'])
    };

    /**
     * Default properties
     * @static
     * @property {string} orientation Default orientation
     */
    static defaultProps = {
        orientation: 'vertical'
    };

    /**
     * Render the component
     * @returns {XML}
     */
    render() {
        const
            b = block('split-container'),
            { children, orientation } = this.props;

        return (
            <div className={b({orientation})}>
                {children}
            </div>
        )
    }
}

export { SplitContainerPanel }
export default SplitContainer