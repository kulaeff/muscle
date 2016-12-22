import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Spinner from '../../components/Spinner'
import Toolbar, { ToolBarButton } from '../../components/ToolBar'
import TreeView from '../../components/TreeView'
import * as browseActions from '../../actions/browse'
import block from 'bem-cn'
import './style.less';

/**
 * Databases container
 * @class
 */
class Browse extends Component {
    /**
     * Databases container properties
     * @static
     * @property {bool} fetching Is data fetching
     * @property {array} items Databases and tables
     */
    static propTypes = {
        fetching: PropTypes.bool,
        items: PropTypes.array.isRequired,
    }

    /**
     * Creates Browse container
     * @constructor
     */
    constructor(props) {
        super(props)

        this.onToolBarButtonCreateDatabaseClick = this.onToolBarButtonCreateDatabaseClick.bind(this)
        this.onTreeViewChange = this.onTreeViewChange.bind(this)
    }

    /**
     * Fetch data after the component was mounted
     * @method
     */
    componentDidMount() {
        const { getBrowse } = this.props.browseActions

        getBrowse()
    }

    /**
     * Show modal when toolbar button Create Database clicked
     * @method
     */
    onToolBarButtonCreateDatabaseClick() {
        console.log('toolbar button Create Database cliked')
    }

    /**
     * Invoked when selected tree view item was changed
     * @method
     */
    onTreeViewChange(index, name) {
        console.log('changed', index, name)
    }

    /**
     * Renders Summary container
     * @method
     */
    render() {
        const
            b = block('browse'),
            { children, fetching, items } = this.props,
            sortedItems = items.sort((a, b) => a.name > b.name)

        return (
            <div className={b()}>
                <div className={b('container')}>
                    <div className={b('header')}>
                        <div className={b('title')}>
                            <span className={b('title', {role: 'title'})}>Databases</span>
                            <span className={b('title', {role: 'caption'})}>Local databases</span>
                        </div>
                        <div className={b('spinner')}><Spinner active={fetching} type="rect" /></div>
                        <div className={b('buttons')}>
                            <button className={b('button', {action: 'minimize'})}></button>
                            <button className={b('button', {action: 'close'})}></button>
                        </div>
                    </div>
                    <div className={b('toolbar')}>
                        <Toolbar>
                            <ToolBarButton icon="create" />
                        </Toolbar>
                    </div>
                    <div className={b('filters')}>
                        <input type="text" name="filter" />
                    </div>
                    <div className={b('table')}>
                        <TreeView items={sortedItems} onChange={this.onTreeViewChange}/>
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
        fetching: state.browse.fetching,
        items: state.browse.items
    }
}

function mapDispatchToProps(dispatch) {
    return {
        browseActions: bindActionCreators(browseActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Browse)