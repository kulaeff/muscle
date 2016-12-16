import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Title from '../../components/Title'
import Spinner from '../../components/Spinner'
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
            { children, fetching, items } = this.props

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
                    <div className={b('tree')}>
                        <TreeView items={items} onChange={this.onTreeViewChange}/>
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