import React, { Component } from 'react'
import {connect} from 'react-redux'
import block from 'bem-cn'
import './style.less'

class App extends Component {
    render() {
        const b = block('app')

        return (
            <div className={b()}>
                <div className={b('nav')}></div>
                <div className={b('container')}>
                    {this.props.children}
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        browse: state.browse,
        summary: state.summary
    }
}

export default connect(mapStateToProps)(App)