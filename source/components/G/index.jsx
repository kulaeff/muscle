import React from 'react'
import PropTypes from 'prop-types'
//import GridItem from './GridItem'
import block from 'bem-cn'
import './style.less'

/**
 * Grid Component
 * @class
 */
class G extends React.Component {
    /**
     * Properties
     * @static
     */
    static propTypes = {
        className: PropTypes.string,
        columns: PropTypes.array,
        rows: PropTypes.array
    };

    /**
     * Default properties
     * @static
     */
    static defaultProps = {};

    /**
     * Render component
     * @returns {XML} Component
     */
    render() {
        const
            b = block('grid'),
            { children, className, columns, rows } = this.props;

        return (
            <div
                className={b({}).mix(className)}
                style={{
                    gridTemplateColumns: columns && columns.join(' '),
                    gridTemplateRows: rows && rows.join(' ')
                }}
            >{children}</div>
        )
    }
}

//export { GridItem }
export default G