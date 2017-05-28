import React from 'react'
import { Route } from 'react-router-dom'
import PropTypes from 'prop-types'
import block from 'bem-cn'

/**
 * ToolBarButton Component
 * @class
 */
class ToolBarButton extends React.Component {
    /**
     * Properties
     * @static
     * @property {string} icon The icon of the button
     * @property {string} title The title of the button
     * @property {string} url URL
     * @property {func} onClick Click event handler
     */
    static propTypes = {
        icon: PropTypes.string.isRequired,
        title: PropTypes.string,
        url: PropTypes.string.isRequired,
        onClick: PropTypes.func
    };

    /**
     * Default properties
     * @static
     */
    static defaultProps = {
        title: 'undefined'
    };

    /**
     * Render component
     * @returns {XML} Component
     */
    render() {
        const
            b = block('toolbar'),
            { icon, title, url, onClick } = this.props;

        return (
            <Route path={url} children={({match}) => (
                <button
                    className={b('button', {state: !match ? 'disabled' : null})}
                    disabled={!match}
                    title={title}
                    onClick={() => onClick(match.params.database)}>
                    <svg>
                        <use xlinkHref={`#icon-${icon}`} />
                    </svg>
                </button>
            )}/>
        )
    }
}

export default ToolBarButton