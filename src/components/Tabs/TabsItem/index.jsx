import React from 'react'
import { Route, Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import block from 'bem-cn'

/**
 * TabsItem Component
 * @class
 */
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
        name: PropTypes.string.isRequired,
        onClick: PropTypes.func.isRequired
    }

    /**
     * Default values of TabsItem properties
     * @static
     */
    static defaultProps = {
    }

    /**
     * Renders TabsItem component
     */
    render() {
        const
            b = block('tabs'),
            {
                label = TabsItem.defaultProps.label,
                name,
                onClick
            } = this.props

        return (
            <Route to={name} children={({ match }) => (
                <Link
                    className={b('item', {state: match ? 'selected' : null})}
                    title={match}
                    to={name}>
                    {label}
                </Link>
            )}/>
        )
    }
}

export default TabsItem