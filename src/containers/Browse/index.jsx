import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Title from '../../components/Title'
import Spinner from '../../components/Spinner'
import ToolBar, { ToolBarButton } from '../../components/Toolbar'
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
                <div className={b('panel')}>
                    <div className={b('title')}>
                        <div className={b('title-label')}>
                            <Title size="large" title="Databases" theme="light" />
                        </div>
                        <div className={b('title-spinner')}>
                            <Spinner active={fetching}/>
                        </div>
                    </div>
                    <div className={b('toolbar')}>
                        <ToolBar>
                            <ToolBarButton icon="create" onClick={this.onToolBarButtonCreateDatabaseClick} />
                        </ToolBar>
                    </div>
                    <div className={b('tree')}>
                        <TreeView items={sortedItems} onChange={this.onTreeViewChange}/>
                    </div>
                </div>
                <div className={b('container')}>
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