import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Checkbox from '../../components/Checkbox'
import Title from '../../components/Title'
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
            { saveSettingsItem } = this.props.settingsActions

        saveSettingsItem('useSmartFolding', !useSmartFolding)
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
                    <Checkbox
                        checked={useSmartFolding}
                        id="useSmartFolding"
                        label="Use smart folding"
                        onChange={this.changeUseSmartFolding} />
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