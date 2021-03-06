import React from 'react'
import PropTypes from 'prop-types'
import TreeViewItem from './TreeViewItem'
import cn from 'cn-decorator';
import './style.less'

/**
 * TreeView Component
 * @class
 */
@cn('tree-view')
class TreeView extends React.Component {
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
    };

    /**
     * Default properties
     * @static
     * @property {number} selectedIndex The default index of selected item
     */
    static defaultProps = {
        selectedIndex: null
    };

    /**
     * Create the component
     * @constructor
     */
    constructor (props) {
        super(props);

        this.state = {
            selectedIndex: TreeView.defaults.selectedIndex
        };

        this.onItemClick = this.onItemClick.bind(this)
    }

    /**
     * Handler for TreeViewItem click event
     * @method
     * @param {string} id The ID of clicked item
     */
    onItemClick(id, name) {
        const { onChange } = this.props;

        if (onChange && this.state.selectedIndex !== id) {
            this.setState({
                selectedIndex: id
            });

            onChange(id, name);
        }
    }

    /**
     * Render component
     * @returns {XML} Component
     */
    render(cn) {
        const { items, selectedIndex = this.state.selectedIndex} = this.props;

        return (
            <div className={cn()}>
                {
                    items.map((item, index) =>
                        <TreeViewItem
                            key={index}
                            id={index}
                            items={item.items}
                            label={item.name}
                            selected={selectedIndex === index}
                            onClick={this.onItemClick}/>
                    )
                }
            </div>
        )
    }
}

export default TreeView