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
     * @property {string} icon Icon's name
     * @property {array} items Array of items
     */
    static propTypes = {
        icon: PropTypes.string,
        items: PropTypes.array.isRequired,
    };

    /**
     * Default properties
     * @static
     */
    static defaultProps = {};

    /**
     * Render component
     * @returns {XML} Component
     */
    render() {
        const
            b = block('list-view'),
            { icon, items } = this.props;

        return (
            <div className={b()}>
                {
                    items.map((item, index) =>
                        <ListViewItem
                            key={index}
                            id={index}
                            url={item}
                        >
                            {
                                icon ?
                                    <svg>
                                        <use xlinkHref={`#icon-${icon}`}/>
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