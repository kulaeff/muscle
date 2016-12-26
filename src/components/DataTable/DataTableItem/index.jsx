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
     * @property {number} id The id of the item
     * @property {string} label The label of the item
     * @property {bool} selected Is the item selected
     * @property {func} onClick Click event handler
     */
    static propTypes = {
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
                children,
                id,
                label,
                selected = DataTableItem.defaults.selected,
                onClick
            } = this.props

        return (
            <div
                className={b('item', {state: selected ? 'selected' : null})}
                title={label}
                onClick={() => onClick(id)}>
                {children}
            </div>
        )
    }
}

export default DataTableItem