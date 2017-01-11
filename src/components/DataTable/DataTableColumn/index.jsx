import React, { Component, PropTypes } from 'react'
import block from 'bem-cn'

/**
 * DataTableColumn Component
 * @class
 */
class DataTableColumn extends Component {
    /**
     * DataTableColumn properties
     * @static
     * @property {string} id The id of the column
     * @property {string} title The title of the column
     * @property {func} onClick Click event handler
     */
    static propTypes = {
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        onClick: PropTypes.func.isRequired
    }

    /**
     * Renders DataTableColumn component
     */
    render() {
        const
            b = block('data-table'),
            {
                id,
                title,
                onClick
            } = this.props

        return (
            <th
                className={b('column')}
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