import React from 'react'
import PropTypes from 'prop-types'
import NavigationBarItem from './NavigationBarItem'
import block from 'bem-cn'
import './style.less'

/**
 * NavigationBar Component
 * @class
 */
class NavigationBar extends React.Component {
    /**
     * Properties
     * @static
     * @property {array} items The array of items
     * @property {number} selectedIndex The index of selected item
     * @property {func} onChange Change event handler
     */
    static propTypes = {
        items: PropTypes.array.isRequired,
        selectedIndex: PropTypes.number,
        onChange: PropTypes.func.isRequired
    }

    /**
     * Default properties
     * @static
     * @property {number} selectedIndex The default index of selected item
     */
    static defaultProps = {
        selectedIndex: 0
    }

    /**
     * Create the components
     * @constructor
     * @param {object} props
     */
    constructor (props) {
        super(props);

        this.onItemClick = this.onItemClick.bind(this)
    }

    /**
     * Handler for NavigationBarItem click event
     * @method
     * @param {string} id The ID of clicked item
     */
    onItemClick(id) {
        const { onChange } = this.props

        if (onChange) {
            onChange(id)
        }
    }

    /**
     * Render component
     * @returns {XML} Component
     */
    render() {
        const
            b = block('navigation-bar'),
            { items, selectedIndex = NavigationBar.defaults.selectedIndex} = this.props

        return (
            <div className={b()}>
            {
                items.map((item, index) =>
                    <NavigationBarItem
                        key={index}
                        id={item.id}
                        selected={selectedIndex === index}
                        title={item.title} onClick={this.onItemClick} />
                )
            }
            </div>
        )
    }
}

export { NavigationBarItem }
export default NavigationBar