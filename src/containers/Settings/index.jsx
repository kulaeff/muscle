import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Title from '../../components/Title'
import Toggle from '../../components/Toggle'
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
     * @property {bool} useSmartFolding Use smart folding
     */
    static propTypes = {
        useSmartFolding: PropTypes.bool.isRequired
    }

    /**
     * Invoked after the component was mounted
     * @method
     */
    componentDidMount() {
        const { getSettings } = this.props.settingsActions

        getSettings()
    }

    changeUseSmartFolding = () => {
        const
            { useSmartFolding } = this.props,
            { saveSettings } = this.props.settingsActions

        saveSettings('useSmartFolding', !useSmartFolding)
    }

    /**
     * Renders Settings container
     * @method
     */
    render() {
        const
            b = block('settings'),
            { useSmartFolding } = this.props

        return (
            <div className={b()}>
                <div className={b('title')}>
                    <Title size="medium" title="Settings" />
                </div>
                <div className={b('container')}>
                    <div className={b('panel')}>
                        <Toggle
                            checked={useSmartFolding}
                            id="useSmartFolding"
                            label="Use auto folding of windows"
                            onChange={this.changeUseSmartFolding} />
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps (state) {
    return {
        useSmartFolding: state.settings.useSmartFolding
    }
}

function mapDispatchToProps(dispatch) {
    return {
        settingsActions: bindActionCreators(settingsActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings)