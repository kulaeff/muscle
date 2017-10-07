import React from 'react'
import PropTypes from 'prop-types'
import block from 'bem-cn'

/**
 * DataTableCell Component
 * @class
 */
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
    render() {
        const
            b = block('data-table'),
            { cell, onValueTransform } = this.props;

        return (
            <td className={b('cell')} title={cell}>
                {onValueTransform ? onValueTransform(cell) : cell}
            </td>
        )
    }
}

export default DataTableCell