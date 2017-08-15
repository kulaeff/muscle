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
     * @property {string} icon The icon's name to use in DataTableItem
     * @property {func} onClick Click event handler
     */
    static propTypes = {
        column: PropTypes.object.isRequired,
        onValueTransform: PropTypes.func
    };

    constructor(props) {
        super(props)
    }

    /**
     * Render component
     */
    render() {
        const
            b = block('data-table'),
            {
                children,
                column,
                onValueTransform
            } = this.props;

        return (
            <td className={b('cell')}>
                {
                    onValueTransform ? onValueTransform(column.name, children) : children
                }
            </td>
        )
    }
}

export default DataTableCell