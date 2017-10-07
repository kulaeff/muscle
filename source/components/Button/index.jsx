import React from 'react'
import PropTypes from 'prop-types'
import cn from 'cn-decorator';
import './style.less'

/**
 * Button component
 * @class
 */
@cn('button')
class Button extends React.Component {
    /**
     * Handles the click event
     * @callback clickCallback
     */
    handleClick = (event) => {
        const { onClick } = this.props;

        if (onClick) {
            onClick();

            event.preventDefault();
            event.stopPropagation();
        }
    };

    /**
     * Render the component
     * @returns {XML}
     */
    render(cn) {
        const

            { _flow, disabled, label, size, type } = this.props;

        return (
            <button
                className={cn({flow: _flow, size, type})}
                disabled={disabled}
                type={type}
                onClick={this.handleClick}
            >
                {label}
            </button>
        )
    }
}

/**
 * Properties
 * @property {bool} [_flow] Is in a ButtonGroup
 * @property {bool} [disabled=false] Is disabled
 * @property {string} label Label
 * @property {string} [size=auto] Size
 * @property {string} [type=button] Type (HTML-type)
 * @property {clickCallback} onClick The callback that handles the click event
 */
Button.propTypes = {
    _flow: PropTypes.string,
    disabled: PropTypes.bool,
    label: PropTypes.string.isRequired,
    size: PropTypes.oneOf(['auto', 'stretch']),
    type: PropTypes.string,
    onClick: PropTypes.func
};

/**
 * Default properties
 * @property {bool} disabled Default mode
 * @property {string} size Default size
 * @property {string} type Default type
 */
Button.defaultProps = {
    disabled: false,
    size: 'auto',
    type: 'button'
};

export default Button