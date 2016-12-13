import React, { Component, PropTypes } from 'react'
import block from 'bem-cn'

class NavigationBarItem extends Component {
    render() {
        const
            b = block('navigation-bar'),
            { id, selected = false, title, onClick } = this.props

        return (
            <div className={b('item', {icon: id, state: selected ? 'selected' : null})} onClick={() => onClick(id)} title={title}>
                <svg>
                    <use xlinkHref={`#icon-${id}`} />
                </svg>
            </div>
        )
    }
}

NavigationBarItem.propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string,
    onClick: PropTypes.func
}

export default NavigationBarItem