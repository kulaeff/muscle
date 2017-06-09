import React from 'react'
import PropTypes from 'prop-types'
import { Redirect, Route, Switch, withRouter } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as appActions from '../../actions/app'
import Settings from '../../containers/Settings'
import Server from '../../containers/Server'
import Status from '../../containers/Status'
import Button from '../../components/Button'
import Form, { FormButton, FormButtons, FormField, FormColumn } from '../../components/Form'
import NavigationBar, { NavigationBarItem } from '../../components/NavigationBar'
import Textbox from '../../components/Textbox'
import Title from '../../components/Title'
import block from 'bem-cn'
import './style.less'

class App extends React.Component {
    /**
     * Databases container properties
     * @static
     * @property {bool} fetching Is fetching data
     * @property {object} credentials Credentials
     */
    static propTypes = {
        fetching: PropTypes.bool,
        credentials: PropTypes.shape({
            user: PropTypes.string,
            password: PropTypes.string
        })
    };

    constructor(props) {
        super(props);

        this.state = {
            buttonDisabled: false,
            selectedIndex: 1,
            user: 'root',
            password: ''
        };
    }

    componentDidMount() {
        const { getCredentials } = this.props.appActions;

        getCredentials();
    }

    onFormSubmit = (e) => {
        const
            { saveCredentials } = this.props.appActions,
            { history } = this.props;

        this.setState({
            buttonDisabled: true
        });

        saveCredentials(this.state.user, this.state.password)
            .then(() => {
                this.setState({
                    buttonDisabled: false,
                    selectedIndex: 1
                });

                history.push('/server')
            });

        e.preventDefault()
    };

    onNavigationBarItemLogoutClick = () => {
        const
            { history } = this.props,
            { removeCredentials } = this.props.appActions;

        removeCredentials()
            .then(() => {
                this.setState({
                    password: '',
                    user: 'root'
                });

                history.push('/')
            });
    };

    onTextboxUserChange = (e) => {
        this.setState({
            user: e.target.value
        })
    };

    onTextboxPasswordChange = (e) => {
        this.setState({
            password: e.target.value
        })
    };

    render() {
        const
            b = block('app'),
            { credentials } = this.props;

        if (credentials.user !== null && credentials.password !== null) {
            return (
                <div className={b()}>
                    <div className={b('content')}>
                        <Switch>
                            <Route path="/settings" component={Settings}/>
                            <Route path="/server" component={Server}/>
                            <Route path="/status" component={Status}/>
                            <Redirect to="/server" />
                        </Switch>
                    </div>
                    <div className={b('sidebar')}>
                        <div className={b('logo')} title="Muscle">
                            <svg>
                                <use xlinkHref="#icon-logo" />
                            </svg>
                        </div>
                        <div className={b('nav')}>
                            <NavigationBar>
                                <NavigationBarItem id="status" title="Status" url="/status" />
                                <NavigationBarItem id="server" title="Browse" url="/server" />
                                <NavigationBarItem id="settings" title="Settings" url="/settings" />
                            </NavigationBar>
                        </div>
                        <div className={b('logout')}>
                            <NavigationBarItem
                                id="logout"
                                title="Logout"
                                url="/logout" />
                        </div>
                    </div>
                </div>
            )
        } else {
            return (
                <div className={b({state: 'unauthorized'})}>
                    <div className={b('container')}>
                        <div className={b('login')}>
                            <div className={b('login-header')}>
                                <Title primaryTitle="Authorization" />
                            </div>
                            <div className={b('login-form')}>
                                <Form onSubmit={this.onFormSubmit}>
                                    <FormColumn>
                                        <FormField label="User">
                                            <Textbox
                                                id="user"
                                                name="user"
                                                required={true}
                                                value={this.state.user}
                                                onChange={this.onTextboxUserChange} />
                                        </FormField>
                                    </FormColumn>
                                    <FormColumn>
                                        <FormField label="Password">
                                            <Textbox
                                                id="password"
                                                name="password"
                                                type="password"
                                                value={this.state.password}
                                                onChange={this.onTextboxPasswordChange} />
                                        </FormField>
                                    </FormColumn>
                                    <FormButtons>
                                        <FormButton>
                                            <Button
                                                autoSize={true}
                                                disabled={this.state.buttonDisabled}
                                                label="Login"
                                                type="submit" />
                                        </FormButton>
                                    </FormButtons>
                                </Form>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }
}

function mapStateToProps (state) {
    return {
        credentials: state.app.credentials,
        fetching: state.app.fetching
    }
}

function mapDispatchToProps(dispatch) {
    return {
        appActions: bindActionCreators(appActions, dispatch)
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))