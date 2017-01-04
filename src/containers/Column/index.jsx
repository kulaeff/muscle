import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Spinner from '../../components/Spinner'
import * as columnActions from '../../actions/column'
import block from 'bem-cn'
import './style.less';

/**
 * Column container
 * @class
 */
class Column extends Component {
    /**
     * Column container properties
     * @static
     * @property {bool} fetching Is data fetching
     * @property {array} items Column and column
     */
    static propTypes = {
        fetching: PropTypes.bool,
        items: PropTypes.array.isRequired,
    }

    /**
     * Creates Column container
     * @constructor
     */
    constructor(props) {
        super(props)

        this.state = {
            minimized: false
        }
    }

    /**
     * Fetches column for selected database
     */
    refreshColumn() {
        const { getColumn } = this.props.columnActions

        getColumn()
    }

    /**
     * Fetches column when database was selected for the first time
     * @method
     */
    componentDidMount() {
        this.refreshColumn()
    }

    /**
     * Fetches column when selected database was changed
     * @method
     */
    componentWillReceiveProps(nextProps) {
        const { params } = this.props

        if (params.table !== nextProps.params.table) {
            this.refreshColumn()
        }
    }

    /**
     * Show modal when toolbar button Create clicked
     * @method
     */
    onToolBarButtonCreateDatabaseClick = () => {
        console.log('toolbar button Create cliked')
    }

    /**
     * Show modal when toolbar button Edit clicked
     * @method
     */
    onToolBarButtonEditDatabaseClick = () => {
        console.log('toolbar button Edit cliked')
    }

    /**
     * Show confirm modal when toolbar button Delete clicked
     * @method
     */
    onToolBarButtonDeleteDatabaseClick = () => {
        console.log('toolbar button Delete cliked')
    }

    /**
     * Minimizes the window
     * @method
     */
    onWindowButtonMinimizeClick = () => {
        this.setState({
            minimized: true
        })
    }

    /**
     * Closes the window and goes to previous route
     * @method
     */
    onWindowButtonCloseClick = () => {
        const { router } = this.props

        router.push('/databases')
    }

    /**
     * Restores the window
     * @method
     */
    onWindowClick = () => {
        if (this.state.minimized) {
            this.setState({
                minimized: false
            })
        }
    }

    /**
     * Renders Summary container
     * @method
     */
    render() {
        const
            b = block('column'),
            { children, fetching, params } = this.props

        return (
            <div className={b({state: this.state.minimized ? 'minimized' : null})}>
                <div className={b('container')} onClick={this.onWindowClick}>
                    <div className={b('header')}>
                        <div className={b('title')}>
                            <span className={b('title', {role: 'title'})}>Column</span>
                            <span className={b('title', {role: 'caption'})}>{params.column}</span>
                        </div>
                        <div className={b('spinner')}><Spinner active={fetching} type="rect" /></div>
                        <div className={b('buttons')}>
                            <button
                                className={b('button', {action: 'minimize'})}
                                onClick={this.onWindowButtonMinimizeClick}></button>
                            <button
                                className={b('button', {action: 'close'})}
                                onClick={this.onWindowButtonCloseClick}></button>
                        </div>
                    </div>
                    <div className={b('table')}>
                    </div>
                </div>
                <div className={b('view')}>
                    {children}
                </div>
            </div>
        )
    }
}

function mapStateToProps (state) {
    return {
        fetching: state.column.fetching,
        items: state.column.items
    }
}

function mapDispatchToProps(dispatch) {
    return {
        columnActions: bindActionCreators(columnActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Column)