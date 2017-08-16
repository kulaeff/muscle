import React from 'react'
import PropTypes from 'prop-types'
import GridItem from './GridItem'
import block from 'bem-cn'
import './style.less'

/**
 * Grid Component
 * @class
 */
class Grid extends React.Component {
    static ColumnDefinitions = []

    /**
     * Render component
     * @returns {XML} Component
     */
    render() {
        const
            b = block('grid'),
            { children, className, columns, gap, rows } = this.props;

        return (
            <div
                className={b({}).mix(className)}
                style={{
                    gridTemplateColumns: columns && (typeof columns === 'string' ? columns : columns.join(' ')),
                    gridTemplateRows: rows && (typeof rows === 'string' ? rows : rows.join(' ')),
                    gridGap: gap && (typeof gap === 'string' ? gap : gap.join(' '))
                }}
            >{children}</div>
        )
    }
}

/**
 * Properties
 * @static
 */
Grid.propTypes = {
    className: PropTypes.string,
    children: PropTypes.oneOfType([
        PropTypes.shape({
            type: PropTypes.oneOf([GridItem])
        }),

        PropTypes.arrayOf(
            PropTypes.shape({
                type: PropTypes.oneOf([GridItem])
            })
        )
    ]).isRequired,
    columns: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.arrayOf(PropTypes.string)
    ]),
    gap: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.arrayOf(PropTypes.string)
    ]),
    rows: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.arrayOf(PropTypes.string)
    ])
};

/**
 * Default properties
 * @static
 */
Grid.defaultProps = {};

export { GridItem }
export default Grid