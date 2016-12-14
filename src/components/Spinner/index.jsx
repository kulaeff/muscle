import React, { Component, PropTypes } from 'react'
import block from 'bem-cn'
import './style.less'

class Spinner extends Component {
    render() {
        const
            b = block('spinner'),
            { active, size = 'small', theme = 'light' } = this.props

        return (
            <div className={b({size, state: active ? 'active' : null, theme})}>
            </div>
        )
    }
}

Spinner.propTypes = {
    active: PropTypes.bool,
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    theme: PropTypes.oneOf(['dark', 'light'])
}

export default Spinner