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
        column: PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.string
        ]),
        columnSpan: PropTypes.number,
        row: PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.string
        ]),
        rowSpan: PropTypes.number,
    };

    static defaultProps = {
        column: 1,
        columnSpan: 1,
        row: 1,
        rowSpan: 1
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
                column,
                columnSpan,
                row,
                rowSpan
            } = this.props;

        return (
            <div
                className={b('item')}
                style={{
                    gridColumn: `${column} / span ${columnSpan}`,
                    gridRow: `${row} / span ${rowSpan}`
                }}
            >{children}</div>
        )
    }
}

export default GridItem