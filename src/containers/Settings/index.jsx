import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Title from '../../components/Title'
import Spinner from '../../components/Spinner'
import * as settingsActions from '../../actions/settings'
import block from 'bem-cn'
import './style.less';

/**
 * Settings container
 * @class
 */
class Settings extends Component {
    /**
     * Settings properties
     * @static
     * @property {bool} fetching Is data fetching
     * @property {object} server The server's settings
     */
    static propTypes = {
        fetching: PropTypes.bool,
        server: PropTypes.object.isRequired,
    }

    /**
     * Invoked after the component was mounted
     * @method
     */
    componentDidMount() {
        const { getSettings } = this.props.settingsActions

        getSettings()
    }

    /**
     * Renders Settings container
     * @method
     */
    render() {
        const
            b = block('settings'),
            { fetching } = this.props

        return (
            <div className={b()}>
                <div className={b('title')}>
                    <div className={b('title-label')}>
                        <Title size="large" title="Server settings" theme="light" />
                    </div>
                    <div className={b('title-spinner')}>
                        <Spinner active={fetching}/>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps (state) {
    return {
        fetching: state.settings.fetching,
        server: state.settings.server
    }
}

function mapDispatchToProps(dispatch) {
    return {
        settingsActions: bindActionCreators(settingsActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings)