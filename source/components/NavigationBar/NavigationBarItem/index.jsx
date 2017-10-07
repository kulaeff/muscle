import React from 'react'
import { Route, Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import cn from 'cn-decorator';

/**
 * NavigationBarItem Component
 * @class
 */
@cn('navigation-bar')
class NavigationBarItem extends React.Component {
    /**
     * Properties
     * @static
     * @property {number} id ID
     * @property {string} title Title
     * @property {string} url Url
     */
    static propTypes = {
        exact: PropTypes.bool,
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
        onClick: PropTypes.func
    };

    /**
     * Default properties
     * @static
     */
    static defaultProps = {
        exact: false
    };

    /**
     * Render component
     * @returns {XML} Component
     */
    render(cn) {
        const { exact, id, title, url, onClick } = this.props;

        return (
            <Route exact={exact} path={url} children={({match}) =>
                <Link
                    className={cn('item', {icon: id, state: match ? 'selected' : null})}
                    title={title}
                    to={url}
                    onClick={onClick}
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