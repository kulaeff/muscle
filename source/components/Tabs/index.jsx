import React from 'react'
import PropTypes from 'prop-types'
import TabsItem from './TabsItem'
import Title from '../Title'
import cn from 'cn-decorator';
import './style.less'

/**
 * Tabs Component
 * @class
 */
@cn('tabs')
class Tabs extends React.Component {
    /**
     * Properties
     * @static
     * @property {bool} collpased Is collapsed
     * @property {array} items The array of items
     * @property {number} selectedIndex The index of selected item
     * @property {any} title Title
     * @property {func} onChange Change event handler
     */
    static propTypes = {
        collapsed: PropTypes.bool,
        items: PropTypes.array,
        title: PropTypes.shape({
            type: PropTypes.oneOf([Title])
        })
    };

    /**
     * Default properties
     * @static
     * @property {bool} collapsed Is collapsed by default
     * @property {string} titl The default index of selected item
     * @property {any} title Default title
     */
    static defaultProps = {
        collapsed: false,
        selected: null,
        title: null,
    };

    /**
     * Render component
     * @returns {XML} Component
     */
    render(cn) {
        const {
            children,
            collapsed,
            items,
            title,
        } = this.props;

        return (
            <div className={cn({state: collapsed ? 'collapsed' : null})}>
                <div className={cn('title')}>{title}</div>
                <div className={cn('items')}>
                    {
                        children ? (
                            children
                        ) : (
                            items && items.map((item, index) =>
                                <TabsItem
                                    key={index}
                                    label={item.label}
                                    url={item.url}
                                />
                            )
                        )
                    }
                </div>
            </div>
        )
    }
}

export { TabsItem }
export default Tabs