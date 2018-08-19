import React from 'react'
import PropTypes from 'prop-types'
import DataTableCell from './DataTableCell'
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
        rows: PropTypes.arrayOf(PropTypes.object).isRequired,
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
                key: null,
                direction: 0
            }
        }
    }

    /**
     * Sets the index of a sorting column
     * @param {object} e MouseEvent
     * @param {object} column Column
     */
    onColumnClick = (e, column) => {
        if (this.state.sorting.key === column.id) {
            this.setState({
                sorting: {
                    key: column.id,
                    direction: 0 - this.state.sorting.direction
                }
            })
        } else {
            this.setState({
                sorting: {
                    key: column.id,
                    direction: 1
                }
            })
        }
    };

    onChange = (row) => {
        const { onChange } = this.props;

        if (onChange) {
            onChange(row);
        }
    };

    sort = (rows, key, direction) => {
        return rows.sort((a, b) => a[key] > b[key] ? direction : -direction);
    };

    /**
     * Render the component
     * @returns {xml}
     */
    render(cn) {
        const
            {
                columns,
                rows
            } = this.props,
            $rows = this.state.sorting.key ? this.sort(rows, this.state.sorting.key, this.state.sorting.direction) : rows;

        return (
            <div className={cn()}>
                <div className={cn('header')}>
                    {
                        columns.map(column =>
                            <DataTableColumn
                                align={column.align}
                                direction={this.state.sorting.key === column.id ? this.state.sorting.direction : null}
                                key={column.id}
                                label={column.label}
                                sortable={column.sortable}
                                width={column.width}
                                onClick={e => this.onColumnClick(e, column)}
                            />
                        )
                    }
                </div>
                <div className={cn('body')}>
                    {
                        $rows.map((row, index) =>
                            <DataTableRow
                                key={index}
                                onClick={e => this.onChange({
                                    originalEvent: e,
                                    value: row
                                })}
                            >
                                {
                                    Object.entries(row).map(entry => {
                                        const
                                            key = entry[0],
                                            value = entry[1],
                                            column = columns.find(column => column.id === key);

                                        return (
                                            <DataTableCell
                                                align={column.align}
                                                key={key}
                                                value={value}
                                                width={column.width}
                                            />
                                        )
                                    })
                                }
                            </DataTableRow>
                        )
                    }
                </div>
                {/*<div className={cn('footer')}>
                    <tr>
                        <td colSpan={columns.length}></td>
                    </tr>
                </div>*/}
            </div>
        )
    }
}

export { DataTableColumn, DataTableRow }
export default DataTable