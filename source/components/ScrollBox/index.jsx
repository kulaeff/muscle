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
        speed: 0.6
    };

    constructor(props) {
        super(props);

        this.state = {
            wrapperHeight: 0,
            containerHeight: 0,
            containerTop: 0
        };
    }

    componentDidMount() {
        this.updateState();
    }

    componentDidUpdate() {
        this.updateState();
    }

    invalidateSizes = () => {
        return {
            wrapperHeight: this.wrapper.clientHeight,
            containerHeight: this.container.clientHeight
        }
    };

    updateState = () => {
        const sizes = this.invalidateSizes();

        if (sizes.wrapperHeight !== this.state.wrapperHeight || sizes.containerHeight !== this.state.containerHeight) {
            this.invalidateState(sizes);
        }
    };

    invalidateState = (state) => {
        this.setState({...state});
    };

    handleWheel = (event) => {
        const
            sizes = this.invalidateSizes(),
            deltaY = event.deltaY * this.props.speed;

        if (sizes.containerHeight > sizes.wrapperHeight) {
            sizes.containerTop = this.computeTopPosition(sizes, deltaY);

            this.invalidateState(sizes);
        }
    };

    computeTopPosition = (sizes, deltaY) => {
        let position = this.state.containerTop - deltaY;

        if (position < sizes.wrapperHeight - sizes.containerHeight) {
            position = sizes.wrapperHeight - sizes.containerHeight;
        }

        if (position > 0) {
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
                        visible={this.state.wrapperHeight < this.state.containerHeight}
                    />
                }
            </div>
        )
    }
}

export default ScrollBox