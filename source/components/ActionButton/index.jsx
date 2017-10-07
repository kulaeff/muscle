import React from 'react'
import PropTypes from 'prop-types'
import cn from 'cn-decorator';
import './style.less'

/**
 * ActionButton component
 * @class
 */
@cn('action-button')
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
    render(cn) {
        const { disabled, _flow, icon, onClick } = this.props;

        return (
            <button
                className={cn({flow: _flow})}
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