import React, { Component, PropTypes } from 'react'
import block from 'bem-cn'
import './style.less'

class Title extends Component {
    static propTypes = {
        size: PropTypes.oneOf(['small', 'medium', 'large']),
        title: PropTypes.string.isRequired,
    }

    static defaults = {
        size: 'medium',
        title: 'undefined (use title attr)'
    }

    render() {
        const
            b = block('title'),
            {
                size = Title.defaults.size,
                title = Title.defaults.title
            } = this.props

        return (
            <span className={b({size})}>{title}</span>
        )
    }
}

export default Title