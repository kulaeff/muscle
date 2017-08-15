import React from 'react'
import PropTypes from 'prop-types'
import block from 'bem-cn'

/**
 * GridItem Component
 * @class
 */
class GridItem extends React.Component {
    /**
     * Properties
     * @static
     */
    static propTypes = {
        size: PropTypes.oneOfType([
            PropTypes.oneOf(['auto', 'stretch']),
            PropTypes.oneOf([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12])
        ]),
    };

    static defaultProps = {
        size: 'stretch'
    };

    /**
     * Create the component
     * @param props
     */
    constructor(props) {
        super(props)
    }

    /**
     * Render component
     * @returns {XML} Component
     */
    render() {
        const
            b = block('grid'),
            {
                children,
                size
            } = this.props;

        return (
            <div className={b('item', {size})}>{children}</div>
        )
    }
}

export default GridItem