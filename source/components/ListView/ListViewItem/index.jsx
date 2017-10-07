import React from 'react'
import { Route, Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import cn from 'cn-decorator';

/**
 * ListViewItem Component
 * @class
 */
@cn('list-view')
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
    render(cn) {
        const { children, url } = this.props;

        return (
            <Route
                path={`/server/${url}`}
                children={({match}) => (
                    <Link
                        className={cn('item', {state: match ? 'selected' : null})}
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