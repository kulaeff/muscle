import React from 'react'
import { Route, Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import block from 'bem-cn'

/**
 * NavigationBarItem Component
 * @class
 */
class NavigationBarItem extends React.Component {
    /**
     * Properties
     * @static
     * @property {number} id ID
     * @property {string} title Title
     * @property {string} url Url
     */
    static propTypes = {
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired
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
            b = block('navigation-bar'),
            { id, title, url } = this.props;

        return (
            <Route path={url} children={({match}) =>
                <Link
                    className={b('item', {icon: id, state: match ? 'selected' : null})}
                    title={title}
                    to={url}
                >
                    <svg>
                        <use xlinkHref={`#icon-${id}`} />
                    </svg>
                </Link>
            }/>
        )
    }
}

export default NavigationBarItem