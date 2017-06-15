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
        height: PropTypes.number.isRequired,
        position: PropTypes.number.isRequired,
        visible: PropTypes.bool.isRequired
    };

    /**
     * Default properties
     * @static
     */
    static defaultProps = {};

    constructor(props) {
        super(props);
    }

    /**
     * Render the component
     * @returns {XML}
     */
    render() {
        const
            b = block('scroll-bar'),
            { height, position, visible } = this.props;

        return (
            <div
                className={b({state: visible ? 'visible' : null})}
                ref={element => this.wrapper = element}
            >
                <div
                    className={b('handle')}
                    ref={element => this.handle = element}
                    style={{
                        height: `${height}%`,
                        transform: `translate(0, ${position}px)`
                    }}
                />
            </div>
        )
    }
}

export default ScrollBar