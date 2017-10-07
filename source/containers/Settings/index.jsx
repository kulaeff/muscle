import React from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Title from '../../components/Title'
import Toggle from '../../components/Toggle'
import * as settingsActions from '../../actions/settings'
import cn from 'cn-decorator';
import './style.less';

/**
 * Settings container
 * @class
 */
@cn('settings')
class Settings extends React.Component {
    /**
     * Settings properties
     * @static
     * @property {bool} useSmartFolding Use smart folding
     */
    static propTypes = {
        useSmartFolding: PropTypes.bool.isRequired
    };

    /**
     * Invoked after the component was mounted
     * @method
     */
    componentDidMount() {
        const { getSettings } = this.props.settingsActions;

        getSettings()
    }

    onChangeUseSmartFolding = () => {
        const
            { useSmartFolding } = this.props,
            { saveSettings } = this.props.settingsActions;

        saveSettings('useSmartFolding', !useSmartFolding)
    };

    /**
     * Renders Settings container
     * @method
     */
    render(cn) {
        const { useSmartFolding } = this.props;

        return (
            <div className={cn()}>
                <div className={cn('title')}>
                    <Title primaryTitle="Settings" />
                </div>
                <div className={cn('container')}>
                    <div className={cn('panel')}>
                        <Toggle
                            checked={useSmartFolding}
                            id="useSmartFolding"
                            label="Use auto folding of windows"
                            onChange={this.onChangeUseSmartFolding} />
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Settings))