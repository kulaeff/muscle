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
            PropTypes.oneOf(['auto', 'default']),
            PropTypes.number
        ]),
    };

    static defaultProps = {
        size: 'default'
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