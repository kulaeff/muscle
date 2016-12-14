import React, { Component, PropTypes } from 'react'
import block from 'bem-cn'

/**
 * NavigationBarItem Component
 * @class
 */
class NavigationBarItem extends Component {
    /**
     * NavigationBarItem properties
     * @static
     * @property {number} id The ID of the item
     * @property {bool} selected Is the item selected
     * @property {string} title The title of the item
     * @property {func} onClick Click event handler
     */
    static propTypes = {
        id: PropTypes.string.isRequired,
        selected: PropTypes.bool.isRequired,
        title: PropTypes.string,
        onClick: PropTypes.func.isRequired
    }

    /**
     * Default values of NavigationBarItem properties
     * @static
     * @property {string} title The title of the item
     */
    static defaults = {
        title: 'undefined',
    }

    /**
     * Renders NavigationBarItem component
     */
    render() {
        const
            b = block('navigation-bar'),
            { id, selected, title = NavigationBarItem.defaultProps.title, onClick } = this.props

        return (
            <div
                className={b('item', {icon: id, state: selected ? 'selected' : null})}
                title={title}
                onClick={() => onClick(id)}>
                <svg>
                    <use xlinkHref={`#icon-${id}`} />
                </svg>
            </div>
        )
    }
}

export default NavigationBarItem