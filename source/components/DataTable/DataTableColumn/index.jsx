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
     * @property {object} column Column
     * @property {object} sorting Sorting info
     * @property {func} onClick Click event handler
     */
    static propTypes = {
        column: PropTypes.object.isRequired,
        sorting: PropTypes.object.isRequired,
        onClick: PropTypes.func.isRequired
    };

    /**
     * Default properties
     * @static
     */
    static defaultProps = {};

    /**
     * Render component
     * @returns {XML} Rendered element
     */
    render() {
        const
            b = block('data-table'),
            { column, sorting, onClick } = this.props;

        return (
            <th
                className={b('column', {
                    order: sorting.column === column && sorting.order > 0 ? 'asc' : 'desc',
                    state: sorting.column === column ? 'sorted' : null
                })}
                onClick={() => onClick(column)}>
                <span className={b('column-title')}>{column.label}</span>
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