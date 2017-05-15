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

    /**
     * Create the component
     * @param props
     */
    constructor(props) {
        super(props)
    }

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