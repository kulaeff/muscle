import React, { Component, PropTypes } from 'react'
import TabsItem from './TabsItem'
import Title from '../Title'
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
     * @property {bool} collpased Is collapsed
     * @property {array} items The array of items
     * @property {number} selectedIndex The index of selected item
     * @property {any} title Title
     * @property {func} onChange Change event handler
     */
    static propTypes = {
        collapsed: PropTypes.bool,
        items: PropTypes.array.isRequired,
        selected: PropTypes.string,
        title: PropTypes.shape({
            type: PropTypes.oneOf([Title])
        }),
        onChange: PropTypes.func.isRequired
    }

    /**
     * Default values of Tabs properties
     * @static
     * @property {bool} collapsed Is collapsed by default
     * @property {string} titl The default index of selected item
     * @property {any} title Default title
     */
    static defaultProps = {
        collapsed: false,
        selected: null,
        title: null,
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
                collapsed,
                items,
                selected,
                title,
            } = this.props

        return (
            /// Refactor: if items is defined use items.map, else use children
            <div className={b({state: collapsed ? 'collapsed' : null})}>
                <div className={b('title')}>{title}</div>
                <div className={b('items')}>
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
            </div>
        )
    }
}

export { TabsItem }
export default Tabs