import React from 'react'
import PropTypes from 'prop-types'
import block from 'bem-cn'

/**
 * ScrollBar component
 * @class
 */
class ScrollBar extends React.Component {
    /**
     * Properties
     * @static
     */
    static propTypes = {
        containerHeight: PropTypes.number.isRequired,
        containerPosition: PropTypes.number.isRequired,
        wrapperHeight: PropTypes.number.isRequired,
        visible: PropTypes.bool.isRequired
    };

    /**
     * Default properties
     * @static
     */
    static defaultProps = {};

    /**
     * Create the component
     * @constructor
     * @param {object} props Properties
     */
    constructor(props) {
        super(props);

        this.state = this.composeState(props);
    }

    /**
     * Updates the local state
     * @param nextProps
     */
    componentWillReceiveProps(nextProps) {
        this.setState(this.composeState(nextProps));
    }

    /**
     * Composes a new state with handle height and top position
     * @param props
     * @returns {{handleHeight: number, handlePosition: number}}
     */
    composeState = (props) => {
        const
            handleHeight = this.calculateHandleHeight(props.containerHeight, props.wrapperHeight),
            handlePosition = this.calculateHandlePosition(props.containerHeight, props.containerPosition, props.wrapperHeight);

        return {
            handleHeight,
            handlePosition
        };
    };

    /**
     * Calculates a height of the handle
     * @param {number} containerHeight Container height
     * @param {number} wrapperHeight Wrapper height
     * @returns {number} Handle height
     */
    calculateHandleHeight = (containerHeight, wrapperHeight) => {
        return wrapperHeight * 100 / containerHeight;
    };

    /**
     * Calculates a top position of the handle
     * @param {number} containerHeight Container height
     * @param {number} containerPosition Container top position
     * @returns {number} Handle position
     */
    calculateHandlePosition = (containerHeight, containerPosition) => {
        return containerPosition * 100 / containerHeight;
    };

    /**
     * Render the component
     * @returns {XML}
     */
    render() {
        const
            b = block('scroll-bar'),
            { visible } = this.props;

        return (
            <div className={b({state: visible ? 'visible' : null})}>
                <div
                    className={b('handle')}
                    style={{
                        height: `${this.state.handleHeight}%`,
                        top: `${this.state.handlePosition}%`
                    }}
                />
            </div>
        )
    }
}

export default ScrollBar