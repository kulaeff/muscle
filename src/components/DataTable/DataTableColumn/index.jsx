import React from 'react'
import PropTypes from 'prop-types'
import block from 'bem-cn'

/**
 * DataTableColumn Component
 * @class
 */
class DataTableColumn extends React.Component {
    /**
     * Properties
     * @static
     * @property {number} id The id of the column
     * @property {string} name The name of the column
     * @property {bool} sorted Is sorting enabled
     * @property {number} sortingOrder Sorting order
     * @property {string} title The title of the column
     * @property {func} onClick Click event handler
     */
    static propTypes = {
        id: PropTypes.number.isRequired,
        sorted: PropTypes.bool,
        sortingOrder: PropTypes.oneOf([1, -1]),
        title: PropTypes.string.isRequired,
        onClick: PropTypes.func.isRequired
    }

    /**
     * Default properties
     * @static
     * @property {bool} Is sorted
     * @property {number} Sorting order
     */
    static defaultProps = {
        sorted: false,
        sortingOrder: 1
    }

    /**
     * Render component
     * @returns {XML} Rendered element
     */
    render() {
        const
            b = block('data-table'),
            {
                id,
                sorted = DataTableColumn.defaults.sorted,
                sortingOrder = DataTableColumn.defaults.sortingOrder,
                title,
                onClick
            } = this.props

        let order = ''

        if (sorted) {
            order = sortingOrder > 0 ? 'asc' : 'desc'
        }

        return (
            <th
                className={b('column', {
                    order,
                    state: sorted ? 'sorted' : null
                })}
                title={title}
                onClick={() => onClick(id)}>
                <span className={b('column-title')}>{title}</span>
                <span className={b('column-arrow')}>
                    <svg>
                        <use xlinkHref="#icon-data-table-column-arrow" />
                    </svg>
                </span>
            </th>
        )
    }
}

export default DataTableColumn