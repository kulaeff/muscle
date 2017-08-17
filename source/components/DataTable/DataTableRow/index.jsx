import React from 'react'
import PropTypes from 'prop-types'
import DataTableCell from '../DataTableCell'
import block from 'bem-cn'

/**
 * DataTableRow Component
 * @class
 */
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

    /**
     * Render component
     * @returns {XML} Rendered element
     */
    render() {
        const
            b = block('data-table'),
            {
                cells,
                columns,
                selected,
                onClick,
                onValueTransform
            } = this.props;

        return (
            <tr
                className={b('row', {state: selected ? 'selected' : null})}
                onClick={() => onClick(cells)}>
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