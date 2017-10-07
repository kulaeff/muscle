import React from 'react'
import PropTypes from 'prop-types'
import cn from 'cn-decorator';
import './style.less'

/**
 * Spinner components
 * @class
 */
@cn('spinner')
class Spinner extends React.Component {
    /**
     * Properties
     * @static
     * @property {bool} active Is spinner active
     * @property {string} size The size of the spinner
     */
    static propTypes = {
        active: PropTypes.bool,
        position: PropTypes.oneOf(['auto', 'static']),
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
        position: 'auto',
        size: 'medium'
    };

    /**
     * Render component
     * @returns {XML} Component
     */
    render(cn) {
        const { active, position, size } = this.props;

        return (
            <div className={cn({
                position,
                state: active ? 'active' : null,
                size
            })}>
                <div className={cn('container')}>
                    <div className={cn('ellipse')} />
                </div>
            </div>
        )
    }
}

export default Spinner