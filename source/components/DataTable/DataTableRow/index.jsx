import React from 'react'
import PropTypes from 'prop-types'
import DataTableCell from '../DataTableCell'
import cn from 'cn-decorator';

/**
 * DataTableRow Component
 * @class
 */
@cn('data-table')
class DataTableRow extends React.Component {
    /**
     * Properties
     * @static
     * @property {object} cells Cells (data) of the item
     * @property {array} column Columns
     * @property {bool} selected Is the item selected
     * @property {func} onClick Click event handler
     * @property {func} onValueTransform A callback used to transform values
     */
    static propTypes = {
        cells: PropTypes.object.isRequired,
        columns: PropTypes.array,
        selected: PropTypes.bool,
        onClick: PropTypes.func,
        onValueTransform: PropTypes.func
    };

    static defaultProps = {
        selected: false
    };

    onClick = (e, cells) => {
        const { onClick } = this.props;

        e.stopPropagation();

        if (onClick) {
            onClick(cells);
        }
    };

    /**
     * Render component
     * @returns {XML} Rendered element
     */
    render(cn) {
        const {
            cells,
            columns,
            selected,
            onValueTransform
        } = this.props;

        return (
            <tr
                className={cn('row', {state: selected ? 'selected' : null})}
                onClick={(e) => this.onClick(e, cells)}>
                {
                    columns.map((column, index) =>
                        cells.hasOwnProperty(column.name) && (
                            <DataTableCell
                                cell={cells[column.name]}
                                key={index}
                                onValueTransform={(cell) => onValueTransform(cells, column, cell)}
                            />
                        )
                    )
                }
            </tr>
        )
    }
}

export default DataTableRow