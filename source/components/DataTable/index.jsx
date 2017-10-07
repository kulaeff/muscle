import React from 'react'
import PropTypes from 'prop-types'
import DataTableColumn from './DataTableColumn'
import DataTableRow from './DataTableRow'
import cn from 'cn-decorator';
import './style.less'

/**
 * DataTable Component
 * @class DataTable
 * @extends {React.Component}
 */
@cn('data-table')
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
        columns: PropTypes.arrayOf(PropTypes.object).isRequired,
        rows: PropTypes.arrayOf(PropTypes.object),
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
                column: null,
                order: 1
            }
        }
    }

    /**
     * Sets the index of a sorting column
     * @param {(string|object)} column Column
     */
    onColumnClick = (column) => {
        if (this.state.sorting.column === column) {
            this.setState({
                sorting: {
                    column,
                    order: 0 - this.state.sorting.order
                }
            })
        } else {
            this.setState({
                sorting: {
                    column,
                    order: 1
                }
            })
        }
    };

    onChange = (cells) => {
        const { onChange } = this.props;

        if (onChange) {
            onChange(cells);
        }
    };

    /**
     * Render the component
     * @returns {XML}
     */
    render(cn) {
        const

            { children, columns, rows, onValueTransform } = this.props;

        return (
            <table className={cn()}>
                <thead className={cn('header')}>
                    <tr>
                        {
                            columns.map((column, index) =>
                                <DataTableColumn
                                    column={column}
                                    key={index}
                                    sorting={this.state.sorting}
                                    onClick={this.onColumnClick} />
                            )
                        }
                    </tr>
                </thead>
                <tbody className={cn('body')}>
                    {
                        rows ? (
                            rows.sort((a, b) =>
                                this.state.sorting.column &&
                                (
                                    this.state.sorting.order > 0 ? (
                                        a[this.state.sorting.column.name] > b[this.state.sorting.column.name]
                                    ) : (
                                        a[this.state.sorting.column.name] < b[this.state.sorting.column.name]
                                    )
                                )
                            ).map((row, index) =>
                                <DataTableRow
                                    cells={row}
                                    columns={columns}
                                    key={index}
                                    onClick={this.onChange}
                                    onValueTransform={onValueTransform}
                                />
                            )
                        ) : (
                            React.Children.toArray(children).sort((a, b) =>
                                this.state.sorting.column &&
                                (
                                    this.state.sorting.order > 0 ? (
                                        a.props.cells[this.state.sorting.column.name] > b.props.cells[this.state.sorting.column.name]
                                    ) : (
                                        a.props.cells[this.state.sorting.column.name] < b.props.cells[this.state.sorting.column.name]
                                    )
                                )
                            ).map(row => React.cloneElement(row, {
                                columns,
                                onClick: this.onChange,
                                onValueTransform
                            }))
                        )
                    }
                </tbody>
                {/*<tfoot className={cn('footer')}>
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