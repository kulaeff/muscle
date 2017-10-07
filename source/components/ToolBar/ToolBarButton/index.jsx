import React from 'react'
import PropTypes from 'prop-types'
import cn from 'cn-decorator';

/**
 * ToolBarButton Component
 * @class
 */
@cn('toolbar')
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
        disabled: PropTypes.bool,
        icon: PropTypes.string.isRequired,
        title: PropTypes.string,
        onClick: PropTypes.func
    };

    /**
     * Default properties
     * @static
     */
    static defaultProps = {
        disabled: false,
        title: 'undefined'
    };

    /**
     * Render component
     * @returns {XML} Component
     */
    render(cn) {
        const { disabled, icon, title, onClick } = this.props;

        return (
            <button
                className={cn('button', {state: disabled ? 'disabled' : null})}
                disabled={disabled}
                title={title}
                onClick={onClick}>
                <svg>
                    <use xlinkHref={`#icon-${icon}`} />
                </svg>
            </button>
        )
    }
}

export default ToolBarButton