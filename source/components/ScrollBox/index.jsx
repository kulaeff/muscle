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
        height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        scrollBarPosition: PropTypes.oneOf(['inner', 'outer']),
        scrollBarTimeout: PropTypes.number,
        speed: PropTypes.number
    };

    /**
     * Default properties
     * @static
     */
    static defaultProps = {
        height: '100%',
        scrollBarPosition: 'inner',
        scrollBarTimeout: 1200,
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

    componentWillUnmount() {
        clearTimeout(this.state.timeoutID);
    }

    /**
     * Gets current sizes
     * @returns {object}
     */
    invalidateSizes = () => {
        return {
            wrapperHeight: this.wrapper.offsetHeight,
            wrapperWidth: this.wrapper.offsetWidth,
            containerHeight: this.container.offsetHeight,
            containerWidth: this.container.offsetWidth
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
                }, this.props.scrollBarTimeout);

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
            { children, height, scrollBarPosition } = this.props;

        return (
            <div
                className={b()}
                ref={element => this.wrapper = element}
                style={{
                    height
                }}
                onWheel={this.handleWheel}
            >
                <div
                    className={b('container')}
                    ref={element => this.container = element}
                    style={{
                        top: `${this.state.containerTop}px`
                    }}
                >
                    {children}
                </div>
                {
                    <ScrollBar
                        wrapperHeight={this.state.wrapperHeight}
                        containerHeight={this.state.containerHeight}
                        containerPosition={-this.state.containerTop}
                        position={scrollBarPosition}
                        visible={this.state.scrolling}
                    />
                }
            </div>
        )
    }
}

export default ScrollBox