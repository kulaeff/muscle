import React from 'react'
import PropTypes from 'prop-types'
import { Redirect, Route, Switch } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Columns from '../Columns'
import Rows from '../Rows'
import Tabs, { TabsItem } from '../../components/Tabs'
import Title from '../../components/Title'
import * as actions from '../../actions/table'
import cn from 'cn-decorator';
import './style.less';

/**
 * Table container
 * @class
 */
@cn('table')
class Table extends React.Component {
    /**
     * Table container properties
     * @static
     * @property {bool} minimized Is window minimized
     */
    static propTypes = {
        minimized: PropTypes.bool.isRequired,
        closeWindow: PropTypes.func.isRequired,
        minimizeWindow: PropTypes.func.isRequired,
        restoreWindow: PropTypes.func.isRequired
    };

    /**
     * Minimizes the window
     * @method
     */
    onWindowButtonMinimizeClick = (e) => {
        const { minimizeWindow } = this.props;

        minimizeWindow();

        e.stopPropagation();
    };

    /**
     * Closes the window and goes to previous route
     * @method
     */
    onWindowButtonCloseClick = () => {
        const { closeWindow } = this.props;

        closeWindow();
    };

    /**
     * Restores the window
     * @method
     */
    onWindowClick = () => {
        const { restoreWindow } = this.props;

        restoreWindow()
    };

    /**
     * Render the container
     * @method
     */
    render(cn) {
        const { match, minimized } = this.props;

        return (
            <div className={cn({state: minimized ? 'minimized' : null})}>
                <div className={cn('container')} onClick={this.onWindowClick}>
                    <div className={cn('header')}>
                        <div className={cn('title')}>
                            <Tabs
                                collapsed={minimized}
                                title={
                                    <Title secondaryTitle={match.params.table} />
                                }
                            >
                                <TabsItem label="Rows" url={`${match.url}/rows`} />
                                <TabsItem label="Columns" url={`${match.url}/columns`} />
                            </Tabs>
                        </div>
                        <div className={cn('buttons')}>
                            <button
                                className={cn('button', {action: 'minimize'})}
                                onClick={this.onWindowButtonMinimizeClick} />
                            <button
                                className={cn('button', {action: 'close'})}
                                onClick={this.onWindowButtonCloseClick} />
                        </div>
                    </div>
                    <div className={cn('content')}>
                        <Switch>
                            <Route path={`${match.path}/rows`} component={Rows}/>*/}
                            <Route path={`${match.path}/columns`} component={Columns}/>
                            <Redirect to={`${match.url}/rows`} />
                        </Switch>
                    </div>
                </div>
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