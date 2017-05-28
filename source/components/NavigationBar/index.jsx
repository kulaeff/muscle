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
     */
    static propTypes = {
        items: PropTypes.array,
    };

    /**
     * Default properties
     * @static
     */
    static defaultProps = {
        items: []
    };

    /**
     * Create the components
     * @constructor
     * @param {object} props
     */
    constructor (props) {
        super(props);
    }

    /**
     * Render component
     * @returns {XML} Component
     */
    render() {
        const
            b = block('navigation-bar'),
            { children, items } = this.props;

        return (
            <div className={b()}>
            {
                children ? (
                    children
                ) : (
                    items.map((item, index) =>
                        <NavigationBarItem
                            key={index}
                            id={item.id}
                            title={item.title}
                            url={item.url}
                        />
                    )
                )
            }
            </div>
        )
    }
}

export { NavigationBarItem }
export default NavigationBar