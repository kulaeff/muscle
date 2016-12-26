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
        id: PropTypes.number.isRequired,
        selected: PropTypes.bool.isRequired,
        onClick: PropTypes.func.isRequired
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
                id,
                cells,
                selected = DataTableItem.defaults.selected,
                onClick
            } = this.props

        return (
            <tr
                className={b('item', {state: selected ? 'selected' : null})}
                onClick={() => onClick(id)}>
                {
                    cells.map((cell, index) =>
                        <td className={b('item-cell')} key={index}>
                            {cell}
                        </td>
                    )
                }
            </tr>
        )
    }
}

export default DataTableItem