import React from 'react'
import PropTypes from 'prop-types'
import block from 'bem-cn'

/**
 * TabsItem Component
 * @class
 */
class TabsItem extends React.Component {
    /**
     * TabsItem properties
     * @static
     * @property {string} label The label of the item
     * @property {string} name Name
     * @property {bool} selected Is the item selected
     * @property {func} onClick Click event handler
     */
    static propTypes = {
        label: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        selected: PropTypes.bool.isRequired,
        onClick: PropTypes.func.isRequired
    }

    /**
     * Default values of TabsItem properties
     * @static
     */
    static defaults = {
    }

    /**
     * Renders TabsItem component
     */
    render() {
        const
            b = block('tabs'),
            {
                label = TabsItem.defaultProps.label,
                name,
                selected,
                onClick
            } = this.props

        return (
            <a
                className={b('item', {state: selected ? 'selected' : null})}
                title={label}
                onClick={() => onClick(name)}>
                {label}
            </a>
        )
    }
}

export default TabsItem