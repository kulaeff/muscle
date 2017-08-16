import React from 'react'
import PropTypes from 'prop-types'
import DataTableColumn from './DataTableColumn'
import DataTableRow from './DataTableRow'
import block from 'bem-cn'
import './style.less'

/**
 * DataTable Component
 * @class DataTable
 * @extends {React.Component}
 */
class DataTable extends React.Component {
    /**
     * Properties
     * @memberof DataTable
     * @static
     * @prop {array} columns The array of columns
     * @prop {array} rows The array of rows
     * @prop {func} [onChange] Change event handler
     * @prop {func} [onValueTransform] Transform value callback
     */
    static propTypes = {
        columns: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.object), PropTypes.arrayOf(PropTypes.string)]).isRequired,
        rows: PropTypes.array,
        value: PropTypes.oneOfType([ PropTypes.string, PropTypes.object ]),
        onChange: PropTypes.func,
        onValueTransform: PropTypes.func
    };

    /**
     * Default properties
     * @static
     */
    static defaultProps = {};

    /**
     * Create DataTable component
     * @constructor
     * @param {object} props Properties
     */
    constructor(props) {
        super(props);

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
    };

    onChange = (e, cells) => {
        const { onChange } = this.props;

        if (onChange) {
            e.stopPropagation();

            onChange(cells);
        }
    };

    /**
     * Render the component
     * @returns {XML}
     */
    render() {
        const
            b = block('data-table'),
            { children, columns, rows, onValueTransform } = this.props;

        if (this.state.sorting.index !== null) {
            rows.sort((a, b) => {
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
            <table className={b()}>
                <thead className={b('header')}>
                    <tr>
                        {
                            columns.map((column, index) =>
                                <DataTableColumn
                                    id={index}
                                    key={index}
                                    label={typeof column === 'string' ? column : column.label}
                                    sorted={this.state.sorting.index === index}
                                    sortingOrder={this.state.sorting.order}
                                    style={typeof column === 'object' && column.style}
                                    onClick={this.onColumnClick} />
                            )
                        }
                    </tr>
                </thead>
                <tbody className={b('body')}>
                    {
                        rows ? (
                            rows.map((row, index) =>
                                <DataTableRow
                                    cells={row}
                                    columns={columns}
                                    key={index}
                                    onClick={this.onChange}
                                    onValueTransform={onValueTransform}
                                />
                            )
                        ) : (
                            React.Children.map(children, row => React.cloneElement(row, {
                                columns,
                                onClick: this.onChange,
                                onValueTransform
                            }))
                        )
                    }
                </tbody>
                {/*<tfoot className={b('footer')}>
                    <tr>
                        <td colSpan={columns.length}></td>
                    </tr>
                </tfoot>*/}
            </table>
        )
    }
}

export { DataTableColumn, DataTableRow }
export default DataTable