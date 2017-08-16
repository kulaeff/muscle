import React from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Tabs, { TabsItem } from '../../components/Tabs'
import Title from '../../components/Title'
import * as actions from '../../actions/table'
import block from 'bem-cn'
import './style.less';

/**
 * Table container
 * @class
 */
class Table extends React.Component {
    /**
     * Table container properties
     * @static
     * @property {bool} minimized Is window minimized
     */
    static propTypes = {
        minimized: PropTypes.bool.isRequired
    };

    /**
     * Minimizes the window
     * @method
     */
    onWindowButtonMinimizeClick = (e) => {
        const { minimizeWindow } = this.props.tableActions;

        minimizeWindow();

        e.stopPropagation();
    };

    /**
     * Closes the window and goes to previous route
     * @method
     */
    onWindowButtonCloseClick = () => {
        const { history, match } = this.props;

        history.push(`/server/${match.params.database}`);
    };

    /**
     * Restores the window
     * @method
     */
    onWindowClick = () => {
        const { restoreWindow } = this.props.tableActions;

        restoreWindow()
    };

    /**
     * Render the container
     * @method
     */
    render() {
        const
            b = block('table'),
            { match, minimized } = this.props;

        return (
            <div className={b({state: minimized ? 'minimized' : null})}>
                <div className={b('container')} onClick={this.onWindowClick}>
                    <div className={b('header')}>
                        <div className={b('title')}>
                            <Tabs
                                collapsed={minimized}
                                title={
                                    <Title secondaryTitle={match.params.table} />
                                }
                            >
                                <TabsItem label="Browse" url={`${match.url}/browse`} />
                                <TabsItem label="Schema" url={`${match.url}/schema`} />
                            </Tabs>
                        </div>
                        <div className={b('buttons')}>
                            <button
                                className={b('button', {action: 'minimize'})}
                                onClick={this.onWindowButtonMinimizeClick} />
                            <button
                                className={b('button', {action: 'close'})}
                                onClick={this.onWindowButtonCloseClick} />
                        </div>
                    </div>
                    <div className={b('content')}>
                        {/*<Switch>
                            <Route path={`${match.path}/browse`} component={Browse}/>
                            <Route path={`${match.path}/schema`} component={Schema}/>
                            <Redirect to={`${match.url}/browse`} />
                        </Switch>*/}
                    </div>
                </div>
                {/*<div className={b('view')}></div>*/}
            </div>
        )
    }
}

function mapStateToProps (state) {
    return {
        minimized: state.table.minimized
    }
}

function mapDispatchToProps(dispatch) {
    const { closeWindow, minimizeWindow, restoreWindow } = actions;

    return bindActionCreators({
        closeWindow,
        minimizeWindow,
        restoreWindow
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Table)