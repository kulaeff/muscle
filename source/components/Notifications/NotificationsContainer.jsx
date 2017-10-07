import React from 'react'
import PropTypes from 'prop-types'
import NotificationsItem from './NotificationsItem'
import cn from 'cn-decorator';
import './style.less'

/**
 * NotificationsContainer component
 * @class
 */
@cn('notifications')
class NotificationsContainer extends React.Component {

    /**
     * Render the component
     * @returns {XML}
     */
    render(cn) {
        const { notifications, onRemove } = this.props;

        return (
            <div className={cn('container')}>
                {
                    notifications.map(notification =>
                        <NotificationsItem
                            key={notification.uid}
                            message={notification.message}
                            type={notification.type}
                            uid={notification.uid}
                            onRemove={onRemove}
                        />
                    )
                }
            </div>
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
NotificationsContainer.propTypes = {
    notifications: PropTypes.arrayOf(PropTypes.object).isRequired,
    enterTimeout: PropTypes.number,
    leaveTimeout: PropTypes.number,
    onRemove: PropTypes.func.isRequired
};

/**
 * Default properties
 * @property {bool} disabled Default mode
 * @property {string} size Default size
 * @property {string} type Default type
 */
NotificationsContainer.defaultProps = {
    enterTimeout: 500,
    leaveTimeout: 500
};

export default NotificationsContainer