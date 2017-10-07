import React from 'react'
import PropTypes from 'prop-types'
import SplitContainerPanel from './SplitContainerPanel'
import cn from 'cn-decorator';
import './style.less'

/**
 * SplitContainer component
 * @class
 */
@cn('split-container')
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
    render(cn) {
        const { children, orientation } = this.props;

        return (
            <div className={cn({orientation})}>
                {children}
            </div>
        )
    }
}

export { SplitContainerPanel }
export default SplitContainer