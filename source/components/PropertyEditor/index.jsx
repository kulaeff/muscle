import React from 'react'
import PropTypes from 'prop-types'
import cn from 'cn-decorator';
import './style.less'

/**
 * PropertyEditor component
 * @class
 */
@cn('property-editor')
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
    render(cn) {
        return (
            <div className={cn()}>

            </div>
        )
    }
}

export default PropertyEditor