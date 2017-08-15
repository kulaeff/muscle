import React from 'react'
import PropTypes from 'prop-types'
import block from 'bem-cn'

/**
 * FlexItem Component
 * @class
 * @extends Component
 */
class FlexItem extends React.Component {
    /**
     * Render component
     * @returns {XML} Component
     */
    render() {
        const
            b = block('flex'),
            { align, children, size } = this.props;

        return (
            <div className={b('item', {align, size})}>{children}</div>
        )
    }
}

/**
 * Properties
 * @static
 * @property {string} [align] Align
 * @property {any} [children] Children
 * @property {number|string} [size] Size
 */
FlexItem.propTypes = {
    align: PropTypes.oneOf(['left', 'center', 'right']),
    children: PropTypes.any.isRequired,
    size: PropTypes.oneOfType([
        PropTypes.oneOf(['auto', 'stretch']),
        PropTypes.oneOf([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12])
    ])
};

/**
 * Default properties
 * @static
 * @property {string} align Default alignment
 * @property {string} size Default size
 */
FlexItem.defaultProps = {
    align: 'left',
    size: 'stretch'
};

export default FlexItem