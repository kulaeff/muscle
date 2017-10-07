import React from 'react'
import PropTypes from 'prop-types'
import cn from 'cn-decorator';

/**
 * SplitContainerPanel component
 * @class
 */
@cn('split-container')
class SplitContainerPanel extends React.Component {
    /**
     * Properties
     * @static
     * @property {string} size Size
     */
    static propTypes = {
        size: PropTypes.oneOf(['auto', 'stretch']),
    };

    /**
     * Default properties
     * @static
     * @property {string} size Default size
     */
    static defaultProps = {
        size: 'stretch'
    };

    /**
     * Render the component
     * @returns {XML}
     */
    render(cn) {
        const { children, size } = this.props;

        return (
            <div className={cn('panel', {size})}>{children}</div>
        )
    }
}

export default SplitContainerPanel