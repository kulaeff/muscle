import React, { Component } from 'react'
import { browserHistory } from 'react-router';
import NavigationBar from '../../components/NavigationBar'
import block from 'bem-cn'
import './style.less'

const navigationBarItems = [
    {
        id: 'summary',
        title: 'Summary',
    },
    {
        id: 'browse',
        title: 'Browse',
    },
]

class App extends Component {
    constructor(props) {
        super(props)

        this.state = {
            selectedIndex: 1
        }

        this.onNavigationBarChange = this.onNavigationBarChange.bind(this)
    }

    onNavigationBarChange(id) {
        browserHistory.push(`/${id}`)

        this.setState({
            selectedIndex: navigationBarItems.findIndex(item => item.id === id)
        })
    }

    render() {
        const
            b = block('app')

        return (
            <div className={b()}>
                <div className={b('panel', {position: 'left'})}>
                    <div className={b('logo')}>
                        <svg>
                            <use xlinkHref="#icon-logo" />
                        </svg>
                    </div>
                    <div className={b('nav')}>
                        <NavigationBar
                            items={navigationBarItems}
                            selectedIndex={this.state.selectedIndex}
                            onChange={this.onNavigationBarChange} />
                    </div>
                </div>
                <div className={b('panel', {position: 'middle'})}>
                    {this.props.children}
                </div>
            </div>
        )
    }
}

export default App