import React from 'react'
import PropTypes from 'prop-types'
import block from 'bem-cn'
import './style.less'

/**
 * Spinner components
 * @class
 */
class Spinner extends React.Component {
    /**
     * Properties
     * @static
     * @property {bool} active Is spinner active
     * @property {string} size The size of the spinner
     */
    static propTypes = {
        active: PropTypes.bool,
        size: PropTypes.oneOf(['big', 'medium', 'small'])
    };

    /**
     * Default properties
     * @static
     * @property {bool} active Is spinner active by default
     * @property {string} size The default size of the spinner
     */
    static defaultProps = {
        active: false,
        size: 'medium'
    };

    /**
     * Render component
     * @returns {XML} Component
     */
    render() {
        const
            b = block('spinner'),
            { active, size } = this.props;

        return (
            <div className={b({state: active ? 'active' : null, size})}>
                <div className={b('container')}>
                    <div className={b('ellipse')} />
                </div>
            </div>
        )
    }
}

export default Spinner