import React from 'react'
import { Route, Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import cn from 'cn-decorator';

/**
 * TabsItem Component
 * @class
 */
@cn('tabs')
class TabsItem extends React.Component {
    /**
     * TabsItem properties
     * @static
     * @property {string} label The label of the item
     * @property {string} name Name
     * @property {func} onClick Click event handler
     */
    static propTypes = {
        label: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
    };

    /**
     * Default values of TabsItem properties
     * @static
     */
    static defaultProps = {};

    /**
     * Renders TabsItem component
     */
    render(cn) {
        const { label, url } = this.props;

        return (
            <Route path={url} children={({ match }) => (
                <Link
                    className={cn('item', {state: match ? 'selected' : null})}
                    title={match}
                    to={url}>
                    {label}
                </Link>
            )}/>
        )
    }
}

export default TabsItem