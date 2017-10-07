import React from 'react'
import PropTypes from 'prop-types'
import { Route, Switch } from 'react-router-dom'
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
import { Notifications } from '../../components/Notifications'
import Textbox from '../../components/Textbox'
import Title from '../../components/Title'
import cn from 'cn-decorator';
import './style.less'

@cn('app')
class App extends React.Component {
    /**
     * Properties
     * @static
     */
    static propTypes = {
        error: PropTypes.object,
        fetching: PropTypes.bool.isRequired,
        logged: PropTypes.bool.isRequired,
        password: PropTypes.string,
        saving: PropTypes.bool.isRequired,
        user: PropTypes.string.isRequired,
        getCredentials: PropTypes.func.isRequired,
        removeCredentials: PropTypes.func.isRequired,
        saveCredentials: PropTypes.func.isRequired,
        setPassword: PropTypes.func.isRequired,
        setUser: PropTypes.func.isRequired
    };

    /**
     * Gets credentials and navigates to server page if they are valid
     * @override
     */
    componentDidMount() {
        const { getCredentials } = this.props;

        getCredentials();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.error && this.props.error !== nextProps.error) {
            this.notifications.error({
                message: nextProps.error.message
            });
        }
    }

    /**
     * Saves credentials and navigates to server page if they are valid
     * @param {Event} e
     */
    onFormSubmit = (e) => {
        const { saveCredentials } = this.props;

        saveCredentials();

        e.preventDefault()
    };

    navigationBarItemLogoutClick = () => {
        const { removeCredentials } = this.props;

        removeCredentials();
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
    render(cn) {
        const

            { fetching, logged, password, user } = this.props;

        if (logged) {
            return (
                <main className={cn()}>
                    <section className={cn('content')}>
                        <Switch>
                            <Route path="/about" component={About}/>
                            <Route path="/components" component={Components}/>
                            <Route path="/settings" component={Settings}/>
                            <Route path="/server" component={Server}/>
                            <Route path="/status" component={Status}/>
                        </Switch>
                    </section>
                    <aside className={cn('sidebar')}>
                        <div className={cn('nav')}>
                            <NavigationBar>
                                <NavigationBarItem id="about" title="About" url="/about" />
                                <NavigationBarItem id="status" title="Status" url="/status" />
                                <NavigationBarItem id="server" title="Browse" url="/server" />
                                <NavigationBarItem id="settings" title="Settings" url="/settings" />
                            </NavigationBar>
                        </div>
                        <div className={cn('logout')}>
                            <NavigationBarItem
                                exact
                                id="logout"
                                title="Logout"
                                url="/"
                                onClick={this.navigationBarItemLogoutClick}
                            />
                        </div>
                    </aside>
                </main>
            )
        } else {
            return (
                <div className={cn({state: 'unauthorized'})}>
                    <div className={cn('container')}>
                        <div className={cn('login')}>
                            <div className={cn('login-header')}>
                                <Title primaryTitle="Authorization" />
                            </div>
                            <div className={cn('login-form')}>
                                <Form onSubmit={this.onFormSubmit}>
                                    <Flex flow="column">
                                        <FlexItem>
                                            <FormField label="User">
                                                <Textbox
                                                    disabled={fetching}
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
                                                    disabled={fetching}
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
                                                disabled={user.length === 0 || fetching}
                                                label="Login"
                                                type="submit"
                                            />
                                        </FlexItem>
                                    </Flex>
                                </Form>
                            </div>
                        </div>
                    </div>
                    <Notifications ref={element => this.notifications = element}/>
                </div>
            )
        }
    }
}

function mapStateToProps (state) {
    return {
        error: state.app.error,
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
        removeCredentials,
        saveCredentials,
        setPassword,
        setUser
    } = actions;

    return bindActionCreators({
        getCredentials,
        removeCredentials,
        saveCredentials,
        setPassword,
        setUser
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App)