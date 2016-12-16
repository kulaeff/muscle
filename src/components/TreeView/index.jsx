import React, { Component, PropTypes } from 'react'
import TreeViewItem from './TreeViewItem'
import block from 'bem-cn'
import './style.less'

/**
 * TreeView Component
 * @class
 */
class TreeView extends Component {
    /**
     * TreeView properties
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
     * Default values of TreeView properties
     * @static
     * @property {number} selectedIndex The default index of selected item
     */
    static defaults = {
        selectedIndex: null
    }

    /**
     * Creates TreeView
     * @constructor
     */
    constructor (props) {
        super(props);

        this.state = {
            selectedIndex: TreeView.defaults.selectedIndex
        }

        this.onItemClick = this.onItemClick.bind(this)
    }

    /**
     * Handler for TreeViewItem click event
     * @method
     * @param {string} id The ID of clicked item
     */
    onItemClick(id, name) {
        const { onChange } = this.props

        if (onChange) {
            this.setState({
                selectedIndex: id
            })

            onChange(id, name)
        }
    }

    /**
     * Renders TreeView component
     * @method
     */
    render() {
        const
            b = block('tree-view'),
            { items, selectedIndex = this.state.selectedIndex} = this.props

        return (
            <div className={b()}>
            {
                items.map((item, index) =>
                    <TreeViewItem
                        key={index}
                        id={index}
                        items={item.items}
                        label={item.name}
                        selected={selectedIndex === index}
                        onClick={this.onItemClick} />
                )
            }
            </div>
        )
    }
}

export default TreeView