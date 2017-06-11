import React from 'react'
import { Route, Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import block from 'bem-cn'

/**
 * ListViewItem Component
 * @class
 */
class ListViewItem extends React.Component {
    /**
     * Properties
     * @static
     * @property {number} id ID
     * @property {string} url URL
     */
    static propTypes = {
        url: PropTypes.string.isRequired
    };

    /**
     * Create the component
     * @param props
     */
    constructor(props) {
        super(props)
    }

    /**
     * Render component
     * @returns {XML} Component
     */
    render() {
        const
            b = block('list-view'),
            { children, url } = this.props;

        return (
            <Route
                path={`/server/${url}`}
                children={({match}) => (
                    <Link
                        className={b('item', {state: match ? 'selected' : null})}
                        to={`/server/${url}`}
                    >
                        {children}
                    </Link>
                )}
            />
        )
    }
}

export default ListViewItem