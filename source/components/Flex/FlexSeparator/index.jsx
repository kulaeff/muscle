import React from 'react'
import PropTypes from 'prop-types'
import cn from 'cn-decorator';

/**
 * FlexSeparator Component
 * @class
 * @extends Component
 */
@cn('flex')
class FlexSeparator extends React.Component {
    /**
     * Render component
     * @returns {XML}
     */
    render(cn) {
        const { size } = this.props;

        return (
            <div className={cn('separator', {size})} />
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