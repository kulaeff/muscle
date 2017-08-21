import React from 'react'
import PropTypes from 'prop-types'
import NotificationsContainer from './NotificationsContainer'
import guid from '../../helpers/guid'
import './style.less'

/**
 * Notifications component
 * @class
 */
class Notifications extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            notifications: []
        };
    }

    error = (options) => {
        this.create({
            message: options.message,
            type: 'error'
        });
    };

    success = (options) => {
        this.create({
            message: options.message,
            type: 'success'
        });
    };

    warning = (options) => {
        this.create({
            message: options.message,
            type: 'warning'
        });
    };

    create = (options) => {
        const notifications = [...this.state.notifications];

        notifications.push({
            message: options.message,
            type: options.type,
            uid: guid()
        });

        this.setState({
            notifications
        });
    };

    remove = (uid) => {
        this.setState({
            notifications: this.state.notifications.filter(notification => notification.uid !== uid)
        });
    };

    /**
     * Render the component
     * @returns {XML}
     */
    render() {
        return (
            <NotificationsContainer notifications={this.state.notifications} onRemove={this.remove}/>
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
Notifications.propTypes = {
    enterTimeout: PropTypes.number,
    leaveTimeout: PropTypes.number
};

/**
 * Default properties
 * @property {bool} disabled Default mode
 * @property {string} size Default size
 * @property {string} type Default type
 */
Notifications.defaultProps = {
    enterTimeout: 500,
    leaveTimeout: 500
};

export default Notifications