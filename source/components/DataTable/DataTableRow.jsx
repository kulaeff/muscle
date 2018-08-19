import React from 'react'
import PropTypes from 'prop-types'
import cn from 'cn-decorator';

/**
 * DataTableRow Component
 * @class
 */
@cn('data-table')
class DataTableRow extends React.Component {
    /**
     * Properties
     * @static
     * @property {object} cells Cells (data) of the item
     * @property {array} column Columns
     * @property {bool} selected Is the item selected
     * @property {func} onClick Click event handler
     * @property {func} onValueTransform A callback used to transform values
     */
    static propTypes = {
        selected: PropTypes.bool,
        onClick: PropTypes.func
    };

    static defaultProps = {
        selected: false
    };

    /**
     * Render component
     * @returns {xml}
     */
    render(cn) {
        const {
            children,
            selected,
            onClick
        } = this.props;

        return (
            <div
                className={cn('row', {
                    state: selected ? 'selected' : null
                })}
                onClick={onClick}
            >
                {children}
            </div>
        )
    }
}

export default DataTableRow