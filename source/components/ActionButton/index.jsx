import React from 'react'
import PropTypes from 'prop-types'
import block from 'bem-cn'
import './style.less'

/**
 * ActionButton component
 * @class
 */
class ActionButton extends React.Component {
    /**
     * Properties
     * @static
     * @property {bool} disabled Disabled
     * @property {string} icon Icon
     */
    static propTypes = {
        disabled: PropTypes.bool,
        _flow: PropTypes.oneOf(['column', 'row']),
        icon: PropTypes.string.isRequired,
        onClick: PropTypes.func.isRequired
    };

    /**
     * Default properties
     * @static
     */
    static defaultProps = {
        disabled: false
    };

    /**
     * Render the component
     * @returns {XML}
     */
    render() {
        const
            b = block('action-button'),
            { disabled, _flow, icon, onClick } = this.props;

        return (
            <button
                className={b({flow: _flow})}
                disabled={disabled}
                type="button"
                onClick={onClick}
            >
                <svg>
                    <use xlinkHref={`#icon-${icon}`} />
                </svg>
            </button>
        )
    }
}

export default ActionButton