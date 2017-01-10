import React, { Component, PropTypes } from 'react'
import block from 'bem-cn'
import './style.less'

class Title extends Component {
    static propTypes = {
        size: PropTypes.oneOf(['small', 'medium', 'large']),
        title: PropTypes.string.isRequired,
    }

    static defaults = {
        size: 'medium'
    }

    render() {
        const
            b = block('title'),
            {
                size = Title.defaults.size,
                title
            } = this.props

        return (
            <span className={b({size})}>{title}</span>
        )
    }
}

export default Title