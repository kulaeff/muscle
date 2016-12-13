import React, { Component, PropTypes } from 'react'
import NavigationBarItem from './NavigationBarItem'
import block from 'bem-cn'
import './style.less'

class NavigationBar extends Component {
    constructor (props) {
        super(props);

        this.onItemClick = this.onItemClick.bind(this)
    }

    onItemClick(id) {
        const { onChange } = this.props

        if (onChange) {
            onChange(id)
        }
    }

    render() {
        const
            b = block('navigation-bar'),
            { items, selectedIndex = 0} = this.props

        return (
            <div className={b()}>
            {
                items.map((item, index) => <NavigationBarItem key={index} id={item.id} selected={selectedIndex === index} title={item.title} onClick={this.onItemClick}/>)
            }
            </div>
        )
    }
}

NavigationBar.propTypes = {
    items: PropTypes.array.isRequired,
    selectedIndex: PropTypes.number,
    onChange: PropTypes.func
}

export default NavigationBar