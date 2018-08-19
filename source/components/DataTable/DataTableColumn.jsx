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
        align: PropTypes.oneOf(['center', 'left', 'right']),
        label: PropTypes.string.isRequired,
        sortable: PropTypes.bool,
        direction: PropTypes.oneOf([-1, 0, 1]),
        width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        onClick: PropTypes.func.isRequired
    };

    /**
     * Default properties
     * @static
     */
    static defaultProps = {
        align: 'left',
        direction: 0,
        sortable: true,
        width: '*'
    };

    /**
     * Render component
     * @returns {xml}
     */
    render(cn) {
        const
            { align, direction, label, onClick, width } = this.props,
            $width = width === '*' ? 1 : width === 'auto' ? 0 : width;

        return (
            <span
                className={cn('column', {
                    align,
                    direction: direction > 0 ? 'down' : direction < 0 ? 'up' : null
                })}
                style={{
                    flex: $width,
                    textAlign: align
                }}
                onClick={onClick}
            >
                <span className={cn('column-title')}>{label}</span>
                <span className={cn('column-arrow')}>
                    <svg>
                        <use xlinkHref="#icon-data-table-column-arrow" />
                    </svg>
                </span>
            </span>
        )
    }
}

export default DataTableColumn