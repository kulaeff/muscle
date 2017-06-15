import React from 'react'
import PropTypes from 'prop-types'
import block from 'bem-cn'
import './style.less'

/**
 * PropertyEditor component
 * @class
 */
class PropertyEditor extends React.Component {
    /**
     * Properties
     * @static
     */
    static propTypes = {
        properties: PropTypes.array.isRequired
    };

    /**
     * Default properties
     * @static
     */
    static defaultProps = {};

    /**
     * Render the component
     * @returns {XML}
     */
    render() {
        const
            b = block('property-editor');

        return (
            <div className={b()}>

            </div>
        )
    }
}

export default PropertyEditor