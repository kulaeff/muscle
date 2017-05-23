import React from 'react'
import PropTypes from 'prop-types'
import block from 'bem-cn'

/**
 * NavigationBarItem Component
 * @class
 */
class NavigationBarItem extends React.Component {
    /**
     * Properties
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
     * Default properties
     * @static
     * @property {string} title The title of the item
     */
    static defaultProps = {
        title: 'undefined',
    }

    /**
     * Render component
     * @returns {XML} Component
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