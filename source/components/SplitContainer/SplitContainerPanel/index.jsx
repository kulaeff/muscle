import React from 'react'
import PropTypes from 'prop-types'
import block from 'bem-cn'

/**
 * SplitContainerPanel component
 * @class
 */
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
    render() {
        const
            b = block('split-container'),
            { children, size } = this.props;

        return (
            <div className={b('panel', {size})}>{children}</div>
        )
    }
}

export default SplitContainerPanel