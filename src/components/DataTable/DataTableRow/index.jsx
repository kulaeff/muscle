import React, { Component, PropTypes } from 'react'
import DataTableCell from '../DataTableCell'
import block from 'bem-cn'

/**
 * DataTableRow Component
 * @class
 */
class DataTableRow extends Component {
    /**
     * DataTableRow properties
     * @static
     * @property {array} cells Cells (data) of the item
     * @property {number} column The index of the column
     * @property {string} icon The icon's name to use in DataTableItem
     * @property {number} row The index of the row
     * @property {bool} selected Is the item selected
     * @property {func} onClick Click event handler
     */
    static propTypes = {
        cells: PropTypes.array.isRequired,
        columns: PropTypes.array.isRequired,
        icon: PropTypes.string,
        row: PropTypes.number.isRequired,
        selected: PropTypes.bool.isRequired,
        onClick: PropTypes.func.isRequired,
        onValueTransform: PropTypes.func
    }

    constructor(props) {
        super(props)
    }

    /**
     * Renders DataTableRow component
     */
    render() {
        const
            b = block('data-table'),
            {
                cells,
                columns,
                icon,
                row,
                selected = DataTableRow.defaults.selected,
                onClick,
                onValueTransform
            } = this.props

        return (
            <tr
                className={b('row', { state: selected ? 'selected' : null })}
                onClick={() => onClick(row)}>
                {
                    cells.map((cell, index) => {
                        return <DataTableCell
                            key={index}
                            column={columns[index]}
                            icon={icon}
                            //row={row}
                            onValueTransform={onValueTransform}
                        >{cell}</DataTableCell>
                    })
                }
            </tr>
        )
    }
}

export default DataTableRow