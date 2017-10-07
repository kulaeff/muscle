import React from 'react'
import PropTypes from 'prop-types'
import GridItem from './GridItem'
import cn from 'cn-decorator';
import './style.less'

/**
 * Grid Component
 * @class
 */
@cn('grid')
class Grid extends React.Component {
    /**
     * Render component
     * @returns {XML} Component
     */
    render(cn) {
        const { children, columns, gap, rows } = this.props;

        return (
            <div
                className={cn({})}
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