import React from 'react'
import PropTypes from 'prop-types'
import block from 'bem-cn'

/**
 * FlexSeparator Component
 * @class
 * @extends Component
 */
class FlexSeparator extends React.Component {
    /**
     * Render component
     * @returns {XML}
     */
    render() {
        const
            b = block('flex'),
            { size } = this.props;

        return (
            <div className={b('separator', {size})} />
        )
    }
}

/**
 * Properties
 * @static
 * @property {string} size Size
 */
FlexSeparator.propTypes = {
    size: PropTypes.oneOf(['full', 'half', 'quarter']),
};

/**
 * Default properties
 * @static
 * @property {string} size Default size
 */
FlexSeparator.defaultProps = {
    size: 'full'
};

export default FlexSeparator