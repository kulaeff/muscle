import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Title from '../../components/Title'
import Spinner from '../../components/Spinner'
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
     * Invoked after the component was mounted
     * @method
     */
    componentDidMount() {
        const { getBrowse } = this.props.browseActions

        getBrowse()
    }

    /**
     * Renders Summary container
     * @method
     */
    render() {
        const
            b = block('browse'),
            { fetching, items } = this.props

        return (
            <div className={b()}>
                <div className={b('tree')}>
                    <div className={b('title')}>
                        <div className={b('title-label')}>
                            <Title size="large" title="Databases" theme="light" />
                        </div>
                        <div className={b('title-spinner')}>
                            <Spinner active={fetching}/>
                        </div>
                    </div>
                </div>
                <div className={b('container')}></div>
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