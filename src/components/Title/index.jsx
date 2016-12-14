import React, { Component, PropTypes } from 'react'
import block from 'bem-cn'
import './style.less'

class Title extends Component {
    render() {
        const
            b = block('title'),
            { size = 'small', title, theme } = this.props

        return (
            <div className={b({size, theme})}>{title}</div>
        )
    }
}

Title.propTypes = {
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    title: PropTypes.string.isRequired,
    theme: PropTypes.string,
}

export default Title