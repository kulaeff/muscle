import React from 'react'
import PropTypes from 'prop-types'
import FlexItem from './FlexItem'
import FlexSeparator from './FlexSeparator'
import block from 'bem-cn'
import './style.less'

/**
 * Flex Component
 * @class
 * @extends Component
 */
class Flex extends React.Component {
    /**
     * Render component
     * @returns {XML} Component
     */
    render() {
        const
            b = block('flex'),
            { children, className, flow } = this.props;

        return (
            <div className={b({flow}).mix(className)}>{children}</div>
        )
    }
}

/**
 * Properties
 * @static
 * @property {object|array} children Children
 * @property {string} [className] User class name
 * @property {string} [flow] Direction
 */
Flex.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.shape({
            type: PropTypes.oneOf([FlexItem])
        }),

        PropTypes.arrayOf(
            PropTypes.shape({
                type: PropTypes.oneOf([FlexItem, FlexSeparator])
            })
        )
    ]).isRequired,
    className: PropTypes.string,
    flow: PropTypes.oneOf(['column', 'row'])
};

/**
 * Default properties
 * @static
 * @property {string} flow Default flow
 */
Flex.defaultProps = {
    flow: 'row',
};

export { FlexItem, FlexSeparator }
export default Flex