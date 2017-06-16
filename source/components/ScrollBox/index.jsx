import React from 'react'
import PropTypes from 'prop-types'
import ScrollBar from './ScrollBar'
import block from 'bem-cn'
import './style.less'

/**
 * ScrollBox component
 * @class
 */
class ScrollBox extends React.Component {
    /**
     * Properties
     * @static
     */
    static propTypes = {
        speed: PropTypes.number
    };

    /**
     * Default properties
     * @static
     */
    static defaultProps = {
        speed: 0.7
    };

    constructor(props) {
        super(props);

        this.state = {
            canScroll: false,
            containerHeight: 0,
            containerWidth: 0,
            containerTop: 0,
            wrapperHeight: 0,
            wrapperWidth: 0,
            scrolling: false,
            timeoutID: null
        };
    }

    componentDidMount() {
        this.updateState();
    }

    componentDidUpdate() {
        this.updateState();
    }

    /**
     * Gets current sizes
     * @returns {object}
     */
    invalidateSizes = () => {
        return {
            wrapperHeight: this.wrapper.clientHeight,
            wrapperWidth: this.wrapper.clientWidth,
            containerHeight: this.container.clientHeight,
            containerWidth: this.container.clientWidth
        }
    };

    /**
     * Updates the local state if sizes were changed
     */
    updateState = () => {
        const sizes = this.invalidateSizes();

        if (
            sizes.wrapperHeight !== this.state.wrapperHeight ||
            sizes.wrapperWidth !== this.state.wrapperWidth ||
            sizes.containerHeight !== this.state.containerHeight ||
            sizes.containerWidth !== this.state.containerWidth
        ) {
            this.invalidateState({
                ...sizes,
                canScroll: sizes.containerHeight > sizes.wrapperHeight
            });
        }
    };

    /**
     * Sets the local state
     * @param {object} state State
     */
    invalidateState = (state) => {
        this.setState({...state});
    };

    /**
     * Handler for the wheel event
     * @param {Event} event Event
     */
    handleWheel = (event) => {
        if (this.state.timeoutID) {
            clearTimeout(this.state.timeoutID);
        }

        if (this.state.canScroll) {
            const
                deltaY = this.normalizeDelta(event.deltaY),
                containerTop = this.computeTopPosition(deltaY),
                timeoutID = setTimeout(() => {
                    this.invalidateState({
                        scrolling: false
                    })
                }, 1000);

            this.invalidateState({
                containerTop,
                scrolling: true,
                timeoutID
            });

            if (this.state.containerTop !== containerTop) {
                event.stopPropagation();
            }
        }
    };

    /**
     * Normalizes a delta
     * @param {number} delta Delta
     * @returns {number} Normalized delta
     */
    normalizeDelta = (delta) => {
        return delta * this.props.speed;
    };

    /**
     * Computes a top position for the container
     * @param {number} delta Delta
     * @returns {number} Top position
     */
    computeTopPosition = (delta) => {
        let position = this.state.containerTop - delta;

        if (position < this.state.wrapperHeight - this.state.containerHeight) {
            position = this.state.wrapperHeight - this.state.containerHeight;
        } else if (position > 0) {
            position = 0;
        }

        return position;
    };

    /**
     * Render the component
     * @returns {XML}
     */
    render() {
        const
            b = block('scroll-box'),
            { children } = this.props;

        return (
            <div
                className={b()}
                ref={element => this.wrapper = element}
                onWheel={this.handleWheel}
            >
                <div
                    className={b('container')}
                    ref={element => this.container = element}
                    style={
                        {transform: `translate(0, ${this.state.containerTop}px)`}
                    }
                >
                    {children}
                </div>
                {
                    <ScrollBar
                        height={this.state.wrapperHeight * 100 / this.state.containerHeight}
                        position={-this.state.containerTop}
                        visible={this.state.scrolling}
                    />
                }
            </div>
        )
    }
}

export default ScrollBox