import React from 'react'
import PropTypes from 'prop-types'
import NavigationBarItem from './NavigationBarItem'
import cn from 'cn-decorator';
import './style.less'

/**
 * NavigationBar Component
 * @class
 */
@cn('navigation-bar')
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
     * Render component
     * @returns {XML} Component
     */
    render(cn) {
        const { children, items } = this.props;

        return (
            <div className={cn()}>
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