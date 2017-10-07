import React from 'react'
import PropTypes from 'prop-types'
import cn from 'cn-decorator';

/**
 * DataTableColumn Component
 * @class
 */
@cn('data-table')
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
    render(cn) {
        const { column, sorting, onClick } = this.props;

        return (
            <th
                className={cn('column', {
                    order: sorting.column === column && sorting.order > 0 ? 'asc' : 'desc',
                    state: sorting.column === column ? 'sorted' : null
                })}
                onClick={() => onClick(column)}>
                <span className={cn('column-title')}>{column.label}</span>
                <span className={cn('column-arrow')}>
                    <svg>
                        <use xlinkHref="#icon-data-table-column-arrow" />
                    </svg>
                </span>
            </th>
        )
    }
}

export default DataTableColumn