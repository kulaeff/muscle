import React from 'react'
import PropTypes from 'prop-types'
import block from 'bem-cn'

/**
 * TreeViewItem Component
 * @class
 */
class TreeViewItem extends React.Component {
    /**
     * Properties
     * @static
     * @property {number} id The id of the item
     * @property {string} label The label of the item
     * @property {bool} selected Is the item selected
     * @property {func} onClick Click event handler
     */
    static propTypes = {
        id: PropTypes.number.isRequired,
        label: PropTypes.string.isRequired,
        selected: PropTypes.bool.isRequired,
        onClick: PropTypes.func.isRequired
    }

    /**
     * Create the components
     * @param {object} props
     */
    constructor(props) {
        super(props)
    }

    /**
     * Render component
     */
    render() {
        const
            b = block('tree-view'),
            {
                children,
                id,
                label,
                selected = TreeViewItem.defaults.selected,
                onClick
            } = this.props

        return (
            <div
                className={b('item', {state: selected ? 'selected' : null})}
                title={label}
                onClick={() => onClick(id, label)}>
                <div className={b('item-label')}>{label}</div>
                <div className={b('item-container')}>
                    {selected ? children : null}
                </div>
            </div>
        )
    }
}

export default TreeViewItem