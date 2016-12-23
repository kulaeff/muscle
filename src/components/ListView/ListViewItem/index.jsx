import React, { Component, PropTypes } from 'react'
import block from 'bem-cn'

/**
 * ListViewItem Component
 * @class
 */
class ListViewItem extends Component {
    /**
     * ListViewItem properties
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
     * Renders ListViewItem component
     */
    render() {
        const
            b = block('list-view'),
            {
                children,
                id,
                label,
                selected = ListViewItem.defaults.selected,
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

export default ListViewItem