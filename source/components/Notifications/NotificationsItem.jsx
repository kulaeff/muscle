import React from 'react'
import PropTypes from 'prop-types'
import cn from 'cn-decorator';
import './style.less'

/**
 * NotificationsItem component
 * @class
 */
@cn('notifications')
class NotificationsItem extends React.Component {
    timeoutID = null;
    removed = false;

    constructor(props) {
        super(props);

        this.state = {
            active: false,
            removed: false
        };
    }

    componentDidMount() {
        const
            { timeout } = this.props,
            self = this;

        this.timeoutID = setTimeout(() => {
            this.show();

            self.timeoutID = setTimeout(() => {
                if (this.self) {
                    this.self.addEventListener('transitionend', self.handleTransitionEnd);
                }

                self.hide();
            }, timeout);
        }, 30);
    }

    hide = () => {
        this.setState({
            active: false
        });
    };

    remove = () => {
        const { uid, onRemove } = this.props;

        if (!this.removed) {
            this.removed = true;

            onRemove(uid);
        }
    };

    show = () => {
        this.setState({
            active: true
        });
    };

    handleTransitionEnd = () => {
        this.remove();
    };

    componentWillUnmount() {
        clearTimeout(this.timeoutID);

        this.self.removeEventListener('transitionend', self.handleTransitionEnd);
    }

    /**
     * Render the component
     * @returns {XML}
     */
    render(cn) {
        const { message, type } = this.props;

        return (
            <div
                className={cn('item', {state: this.state.active ? 'active' : null, type})}
                ref={element => this.self = element}
            >
                <div className={cn('item-container')}>
                    <div className={cn('item-icon')}>
                        <svg>
                            <use xlinkHref={`#icon-${type}-24`}/>
                        </svg>
                    </div>
                    <span  className={cn('item-message')}>{message}</span>
                </div>
            </div>
        )
    }
}

/**
 * Properties
 * @property {string} message Message
 */
NotificationsItem.propTypes = {
    message: PropTypes.string.isRequired,
    timeout: PropTypes.number,
    type: PropTypes.oneOf(['success', 'warning', 'error']),
    uid: PropTypes.string.isRequired,
    onRemove: PropTypes.func.isRequired
};

/**
 * Default properties
 */
NotificationsItem.defaultProps = {
    timeout: 5000,
    type: 'info'
};

export default NotificationsItem