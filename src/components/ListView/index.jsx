import React from 'react'
import PropTypes from 'prop-types'
import ListViewItem from './ListViewItem'
import block from 'bem-cn'
import './style.less'

/**
 * ListView Component
 * @class
 */
class ListView extends React.Component {
    /**
     * Properties
     * @static
     * @property {string} icon The icon's name to use in ListViewItem
     * @property {array} items The array of items
     * @property {number} selectedIndex The index of selected item
     * @property {func} onChange Change event handler
     */
    static propTypes = {
        icon: PropTypes.string,
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
        selectedIndex: null
    }

    /**
     * Handler for ListViewItem click event
     * @method
     * @param {string} id The ID of clicked item
     */
    onItemClick = (id) => {
        const { selectedIndex, onChange } = this.props

        if (onChange && selectedIndex !== id) {
            onChange(id)
        }
    }

    /**
     * Render component
     * @returns {XML} Component
     */
    render() {
        const
            b = block('list-view'),
            { icon, items, selectedIndex } = this.props

        return (
            <div className={b()}>
            {
                items.map((item, index) =>
                    <ListViewItem
                        key={index}
                        id={index}
                        selected={selectedIndex === index}
                        onClick={this.onItemClick}>
                        {
                            icon ?
                                <svg>
                                    <use xlinkHref={`#icon-${icon}`} />
                                </svg>
                            : null
                        }
                        {item}
                    </ListViewItem>
                )
            }
            </div>
        )
    }
}

export default ListView