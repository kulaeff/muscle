import React, { Component } from 'react'
import block from 'bem-cn'
import './style.less';

export default class Summary extends Component {
    render() {
        const b = block('summary');
        //const { name } = this.props

        return <div className={b()}>Hello from Summary!</div>
    }
}

/*Summary.propTypes = {
    name: PropTypes.string.isRequired
}*/