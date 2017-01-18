import React, { Component, PropTypes } from 'react'
import block from 'bem-cn'

/**
 * DataTableItem Component
 * @class
 */
class DataTableItem extends Component {
    /**
     * DataTableItem properties
     * @static
     * @property {array} cells Cells (data) of the item
     * @property {number} id The id of the item
     * @property {bool} selected Is the item selected
     * @property {func} onClick Click event handler
     */
    static propTypes = {
        cells: PropTypes.array.isRequired,
        columns: PropTypes.array.isRequired,
        id: PropTypes.number.isRequired,
        selected: PropTypes.bool.isRequired,
        onClick: PropTypes.func.isRequired,
        onValueTransform: PropTypes.func
    }

    constructor(props) {
        super(props)
    }

    /**
     * Renders DataTableItem component
     */
    render() {
        const
            b = block('data-table'),
            {
                cells,
                columns,
                id,
                selected = DataTableItem.defaults.selected,
                onClick,
                onValueTransform
            } = this.props

        return (
            <tr
                className={b('item', { state: selected ? 'selected' : null })}
                onClick={() => onClick(id)}>
                {
                    cells.map((cell, index) => {
                        const column = columns[index]

                        return <td className={b('item-cell', {
                            alignment: column.style ? column.style.alignment : null
                        })} key={index}>
                            {
                                onValueTransform ? onValueTransform(column.name, cell) : cell
                            }
                        </td>
                    })
                }
            </tr>
        )
    }
}

export default DataTableItem