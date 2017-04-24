import React from 'react'
import PropTypes from 'prop-types'
import block from 'bem-cn'
import './style.less'

class Placeholder extends React.Component {
    /**
     * Placeholder properties
     * @static
     * @prop {string} text Text
     */
    static propTypes = {
        text: PropTypes.string.isRequired
    }

    /**
     * Renders Placeholder
     * @function
     */
    render() {
        const
            b = block('placeholder'),
            { text } = this.props

        return (
            <span className={b()}>{text}</span>
        )
    }
}

export default Placeholder