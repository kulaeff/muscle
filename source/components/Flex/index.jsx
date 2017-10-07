import React from 'react'
import PropTypes from 'prop-types'
import FlexItem from './FlexItem'
import FlexSeparator from './FlexSeparator'
import cn from 'cn-decorator';
import './style.less'

/**
 * Flex Component
 * @class
 * @extends Component
 */
@cn('flex')
class Flex extends React.Component {
    /**
     * Render component
     * @returns {XML} Component
     */
    render(cn) {
        const { children, flow } = this.props;

        return (
            <div className={cn({flow})}>{children}</div>
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