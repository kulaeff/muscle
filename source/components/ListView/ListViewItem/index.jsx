import React from 'react'
import PropTypes from 'prop-types'
import block from 'bem-cn'

/**
 * ListViewItem Component
 * @class
 */
class ListViewItem extends React.Component {
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
        selected: PropTypes.bool.isRequired,
        onClick: PropTypes.func.isRequired
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
     * @returns {XML} Component
     */
    render() {
        const
            b = block('list-view'),
            {
                children,
                id,
                selected,
                onClick
            } = this.props;

        return (
            <div
                className={b('item', {state: selected ? 'selected' : null})}
                onClick={(event) => onClick(event, id)}>
                {children}
            </div>
        )
    }
}

export default ListViewItem