import React from 'react'
import PropTypes from 'prop-types'
import { Redirect, Route, Switch, withRouter } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actions from '../../actions/app'
import About from '../About'
import Components from '../Components'
import Settings from '../Settings'
import Server from '../Server'
import Status from '../Status'
import Button from '../../components/Button'
import Flex, { FlexItem, FlexSeparator } from '../../components/Flex'
import Form, { FormField } from '../../components/Form'
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
        fetching: PropTypes.bool.isRequired,
        logged: PropTypes.bool.isRequired,
        password: PropTypes.string,
        saving: PropTypes.bool.isRequired,
        user: PropTypes.string.isRequired,
        getCredentials: PropTypes.func.isRequired,
        saveCredentials: PropTypes.func.isRequired,
        setPassword: PropTypes.func.isRequired,
        setUser: PropTypes.func.isRequired
    };

    /**
     * Gets credentials from session storage and navigates to server page if they are valid
     * @override
     */
    componentDidMount() {
        const { getCredentials } = this.props;

        getCredentials();
    }

    /**
     * Saves credentials on form submit
     * @param {Event} e
     */
    onFormSubmit = (e) => {
        const { saveCredentials } = this.props;

        saveCredentials();

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

    /**
     * Stores the user
     * @param {SyntheticEvent} e
     */
    onTextboxUserChange = (e) => {
        const { setUser } = this.props;

        setUser(e.target.value);
    };

    /**
     * Stores the password
     * @param {SyntheticEvent} e
     */
    onTextboxPasswordChange = (e) => {
        const { setPassword } = this.props;

        setPassword(e.target.value);
    };

    /**
     * Render
     * @returns {XML}
     */
    render() {
        const
            b = block('app'),
            { logged, password, saving, user } = this.props;

        if (logged) {
            return (
                <div className={b()}>
                    <div className={b('content')}>
                        <Switch>
                            <Route path="/about" component={About}/>
                            <Route path="/components" component={Components}/>
                            <Route path="/settings" component={Settings}/>
                            <Route path="/server" component={Server}/>
                            <Route path="/status" component={Status}/>
                            <Redirect to="/server" />
                        </Switch>
                    </div>
                    <div className={b('sidebar')}>
                        <div className={b('nav')}>
                            <NavigationBar>
                                <NavigationBarItem id="about" title="About" url="/about" />
                                <NavigationBarItem id="status" title="Status" url="/status" />
                                <NavigationBarItem id="server" title="Browse" url="/server" />
                                <NavigationBarItem id="settings" title="Settings" url="/settings" />
                            </NavigationBar>
                        </div>
                        <div className={b('logout')}>
                            <NavigationBarItem
                                id="logout"
                                title="Logout"
                                url="/logout"
                            />
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
                                    <Flex flow="column">
                                        <FlexItem>
                                            <FormField label="User">
                                                <Textbox
                                                    id="textBoxUser"
                                                    name="user"
                                                    required={true}
                                                    value={user}
                                                    onChange={this.onTextboxUserChange}
                                                />
                                            </FormField>
                                        </FlexItem>
                                        <FlexSeparator size="half" />
                                        <FlexItem>
                                            <FormField label="Password">
                                                <Textbox
                                                    id="textBoxPassword"
                                                    name="password"
                                                    type="password"
                                                    value={password}
                                                    onChange={this.onTextboxPasswordChange}
                                                />
                                            </FormField>
                                        </FlexItem>
                                        <FlexSeparator />
                                        <FlexItem align="right">
                                            <Button
                                                size="stretch"
                                                disabled={user.length === 0 || saving}
                                                label="Login"
                                                type="submit"
                                            />
                                        </FlexItem>
                                    </Flex>
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
        fetching: state.app.fetching,
        logged: state.app.logged,
        password: state.app.password,
        saving: state.app.saving,
        user: state.app.user
    }
}

function mapDispatchToProps(dispatch) {
    const {
        getCredentials,
        saveCredentials,
        setPassword,
        setUser
    } = actions;

    return bindActionCreators({
        getCredentials,
        saveCredentials,
        setPassword,
        setUser
    }, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))