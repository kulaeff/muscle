import React from 'react'
import PropTypes from 'prop-types'
import block from 'bem-cn'
import './style.less'

/**
 * NotificationsItem component
 * @class
 */
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
    render() {
        const
            b = block('notifications'),
            { message, type } = this.props;

        return (
            <div
                className={b('item', {state: this.state.active ? 'active' : null, type})}
                ref={element => this.self = element}
            >
                <div className={b('item-container')}>
                    <div className={b('item-icon')}>
                        <svg>
                            <use xlinkHref={`#icon-${type}-24`}/>
                        </svg>
                    </div>
                    <span  className={b('item-message')}>{message}</span>
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