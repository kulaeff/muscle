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
        align: PropTypes.oneOf(['center', 'left', 'right']),
        value: PropTypes.any,
        width: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
    };

    /**
     * Default properties
     * @static
     */
    static defaultProps = {
        width: '*'
    };

    /**
     * Render component
     */
    render(cn) {
        const
            { align, value, width } = this.props,
            $width = width === '*' ? 1 : width === 'auto' ? 0 : width;

        return (
            <span
                className={cn('cell')}
                style={{
                    flex: $width,
                    textAlign: align
                }}
                title={value}
            >
                {value}
            </span>
        )
    }
}

export default DataTableCell