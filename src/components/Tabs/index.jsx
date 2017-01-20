import React, { Component, PropTypes } from 'react'
import TabsItem from './TabsItem'
import block from 'bem-cn'
import './style.less'

/**
 * Tabs Component
 * @class
 */
class Tabs extends Component {
    /**
     * Tabs properties
     * @static
     * @property {array} items The array of items
     * @property {number} selectedIndex The index of selected item
     * @property {func} onChange Change event handler
     */
    static propTypes = {
        items: PropTypes.array.isRequired,
        selected: PropTypes.string,
        onChange: PropTypes.func.isRequired
    }

    /**
     * Default values of Tabs properties
     * @static
     * @property {number} selectedIndex The default index of selected item
     */
    static defaults = {
        selected: null
    }

    /**
     * Creates Tabs
     * @constructor
     */
    constructor (props) {
        super(props);

        this.onItemClick = this.onItemClick.bind(this)
    }

    /**
     * Handler for TabsItem click event
     * @method
     * @param {string} id The ID of clicked item
     */
    onItemClick(name) {
        const { onChange } = this.props

        if (onChange) {
            onChange(name)
        }
    }

    /**
     * Renders Tabs component
     * @method
     */
    render() {
        const
            b = block('tabs'),
            {
                items,
                selected = Tabs.defaults.selected
            } = this.props

        return (
            /// Refactor: if items is defined use items.map, else use children
            <div className={b()}>
            {
                items.map((item, index) =>
                    <TabsItem
                        key={index}
                        label={item.label}
                        name={item.name}
                        selected={selected === item.name}
                        onClick={this.onItemClick} />

                )
            }
            </div>
        )
    }
}

export { TabsItem }
export default Tabs