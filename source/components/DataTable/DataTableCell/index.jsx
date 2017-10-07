import React from 'react'
import PropTypes from 'prop-types'
import cn from 'cn-decorator';

/**
 * DataTableCell Component
 * @class
 */
@cn('data-table')
class DataTableCell extends React.Component {
    /**
     * Properties
     * @static
     * @property {*} cell A value of a cell
     * @property {func} onValueTransform A callback used to transform a value
     */
    static propTypes = {
        cell: PropTypes.any,
        onValueTransform: PropTypes.func
    };

    /**
     * Render component
     */
    render(cn) {
        const { cell, onValueTransform } = this.props;

        return (
            <td className={cn('cell')} title={cell}>
                {onValueTransform ? onValueTransform(cell) : cell}
            </td>
        )
    }
}

export default DataTableCell