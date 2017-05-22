import React from 'react'
import PropTypes from 'prop-types'
import { Redirect, Route, Switch } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actions from '../../actions/database'
import DatabaseTables from './DatabaseTables'
//import Table from '../Table'
import Tabs, { TabsItem } from '../../components/Tabs'
import Title from '../../components/Title'
import block from 'bem-cn'
import './style.less';

/**
 * Database container
 * @class
 */
class Database extends React.Component {
    /**
     * Properties
     * @static
     * @property {bool} minimized Is window minimized
     */
    static propTypes = {
        minimized: PropTypes.bool
    };

    /**
     * Restores the window
     */
    onWindowClick = () => {
        const { restoreWindow } = this.props;

        restoreWindow();
    };

    /**
     * Minimizes the window
     */
    onWindowButtonMinimizeClick = (e) => {
        const { minimizeWindow } = this.props;

        minimizeWindow();

        e.stopPropagation();
    };

    /**
     * Closes the window
     */
    onWindowButtonCloseClick = () => {
        const { history, closeWindow } = this.props;

        closeWindow();

        history.push('/server');
    };

    /**
     * Renders the container
     * @returns {XML} Database
     */
    render() {
        const
            b = block('database'),
            { match, minimized } = this.props;

        return (
            <div className={b({state: minimized ? 'minimized' : null})}>
                <div className={b('container')} onClick={this.onWindowClick}>
                    <div className={b('header')}>
                        <div className={b('title')}>
                            <Tabs
                                collapsed={minimized}
                                title={
                                    <Title secondaryTitle={match.params.database} />
                                }
                            >
                                <TabsItem label="Tables" url={`${match.url}/tables`} />
                                <TabsItem label="Query" url={`${match.url}/query`} />
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
                        <Switch>
                            <Route path={`${match.path}/tables`} component={DatabaseTables}/>
                            <Route path={`${match.path}/query`} component={DatabaseTables}/>
                            <Redirect to={`${match.url}/tables`} />
                        </Switch>
                    </div>
                </div>
                <div className={b('view')}>
                </div>
            </div>
        )
    }
}

function mapStateToProps (state) {
    return {
        minimized: state.database.minimized
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

export default connect(mapStateToProps, mapDispatchToProps)(Database)