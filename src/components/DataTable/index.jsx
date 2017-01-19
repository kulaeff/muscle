import React, { Component, PropTypes } from 'react'
import DataTableColumn from './DataTableColumn'
import DataTableRow from './DataTableRow'
import block from 'bem-cn'
import './style.less'

/**
 * DataTable Component
 * @class
 */
class DataTable extends Component {
    /**
     * DataTable properties
     * @static
     * @property {array} columns The array of columns
     * @property {array} items The array of items
     * @property {number} selectedIndex The index of selected item
     * @property {func} onChange Change event handler
     */
    static propTypes = {
        columns: PropTypes.array.isRequired,
        items: PropTypes.array,
        selectedIndex: PropTypes.number,
        onChange: PropTypes.func.isRequired,
        onValueTransform: PropTypes.func
    }

    /**
     * Default values of DataTable properties
     * @static
     * @property {number} selectedIndex The default index of selected item
     */
    static defaults = {
        selectedIndex: null
    }

    /**
     * Creates DataTable component
     * @constructor
     * @param {object} props Properties
     */
    constructor(props) {
        super(props)

        this.state = {
            sorting: {
                index: null,
                order: 1
            }
        }
    }

    /**
     * Sets the index of a sorting column
     */
    onColumnClick = (index) => {
        if (this.state.sorting.index === index) {
            this.setState({
                sorting: {
                    index,
                    order: 0 - this.state.sorting.order
                }
            })
        } else {
            this.setState({
                sorting: {
                    index,
                    order: 1
                }
            })
        }
    }

    /**
     * Handler for DataTableItem click event
     * @method
     * @param {string} id The ID of clicked item
     */
    onItemClick = (id) => {
        const { selectedIndex = DataTable.defaults.selectedIndex, onChange } = this.props

        if (onChange && selectedIndex !== id) {
            onChange(id)
        }
    }

    /**
     * Renders DataTable component
     * @method
     */
    render() {
        const
            b = block('data-table'),
            { columns, items, selectedIndex, onValueTransform } = this.props

        if (this.state.sorting.index !== null) {
            items.sort((a, b) => {
                if (a[this.state.sorting.index] > b[this.state.sorting.index]) {
                    return this.state.sorting.order
                } else if (a[this.state.sorting.index] < b[this.state.sorting.index]) {
                    return -this.state.sorting.order
                } else {
                    return 0
                }
            })
        }

        return (
            items.length ?
            <table className={b()}>
                <thead className={b('header')}>
                    <tr>
                        {
                            columns.map((column, index) =>
                                <DataTableColumn
                                    id={index}
                                    key={index}
                                    sorted={this.state.sorting.index === index}
                                    sortingOrder={this.state.sorting.order}
                                    style={column.style}
                                    title={column.title}
                                    onClick={this.onColumnClick} />
                            )
                        }
                    </tr>
                </thead>
                <tbody className={b('body')}>
                    {
                        items.map((item, index) =>
                            <DataTableRow
                                cells={item}
                                columns={columns}
                                id={index}
                                key={index}
                                selected={selectedIndex === index}
                                onClick={this.onItemClick}
                                onValueTransform={onValueTransform} />
                        )
                    }
                </tbody>
                <tfoot className={b('footer')}>
                    <tr>
                        <td colSpan={columns.length}></td>
                    </tr>
                </tfoot>
            </table>
            : null
        )
    }
}

export default DataTable