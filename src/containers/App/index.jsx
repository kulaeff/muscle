import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router';
import * as appActions from '../../actions/app'
import Button from '../../components/Button'
import Form, { FormButton, FormButtons, FormField, FormRow } from '../../components/Form'
import NavigationBar, { NavigationBarItem } from '../../components/NavigationBar'
import Textbox from '../../components/Textbox'
import Title from '../../components/Title'
import block from 'bem-cn'
import './style.less'

const navigationBarItems = [
    {
        id: 'status',
        title: 'Status',
    },
    {
        id: 'databases',
        title: 'Databases',
    },
    {
        id: 'settings',
        title: 'Settings',
    }
]

class App extends Component {
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
    }

    constructor(props) {
        super(props)

        this.state = {
            buttonDisabled: false,
            selectedIndex: 1,
            user: 'root',
            password: ''
        }
    }

    componentDidMount() {
        const { getCredentials } = this.props.appActions

        getCredentials()
    }

    onFormSubmit = (e) => {
        const
            { saveCredentials } = this.props.appActions,
            { router } = this.props

        this.setState({
            buttonDisabled: true
        })

        saveCredentials(this.state.user, this.state.password)
            .then(() => {
                this.setState({
                    buttonDisabled: false,
                })

                router.push('/databases')
            })

        e.preventDefault()
    }

    onNavigationBarChange = (id) => {
        browserHistory.push(`/${id}`)

        this.setState({
            selectedIndex: navigationBarItems.findIndex(item => item.id === id)
        })
    }

    onNavigationBarItemLogoutClick = () => {
        const { router } = this.props

        sessionStorage.removeItem('user')
        sessionStorage.removeItem('password')

        this.setState({
            password: null,
            user: null
        })

        router.push('/')
    }

    onTextboxUserChange = (e) => {
        this.setState({
            user: e.target.value
        })
    }

    onTextboxPasswordChange = (e) => {
        this.setState({
            password: e.target.value
        })
    }

    render() {
        const
            b = block('app'),
            { credentials } = this.props

        if (credentials.user !== null && credentials.password !== null) {
            return (
                <div className={b()}>
                    <div className={b('panel', {position: 'left'})}>
                        <div className={b('logo')} title="Muscle">
                            <svg>
                                <use xlinkHref="#icon-logo" />
                            </svg>
                        </div>
                        <div className={b('nav')}>
                            <NavigationBar
                                items={navigationBarItems}
                                selectedIndex={this.state.selectedIndex}
                                onChange={this.onNavigationBarChange} />
                        </div>
                        <div className={b('logout')}>
                            <NavigationBarItem
                                id="logout"
                                selected={false}
                                title="Logout"
                                onClick={this.onNavigationBarItemLogoutClick} />
                        </div>
                    </div>
                    <div className={b('panel', {position: 'middle'})}>
                        {this.props.children}
                    </div>
                </div>
            )
        } else {
            return (
                <div className={b({state: 'unauthorized'})}>
                    <div className={b('container')}>
                        <div className={b('login')}>
                            <div className={b('login-header')}>
                                <div className={b('login-title')}>
                                    <Title title="Authorization" />
                                </div>
                                <div className={b('login-logo')}>
                                    <svg>
                                        <use xlinkHref="#icon-logo" />
                                    </svg>
                                </div>
                            </div>
                            <div className={b('login-form')}>
                                <Form onSubmit={this.onFormSubmit}>
                                    <FormRow>
                                        <FormField label="User">
                                            <Textbox
                                                id="user"
                                                name="user"
                                                required={true}
                                                value={this.state.user}
                                                onChange={this.onTextboxUserChange} />
                                        </FormField>
                                    </FormRow>
                                    <FormRow>
                                        <FormField label="Password">
                                            <Textbox
                                                id="password"
                                                name="password"
                                                type="password"
                                                value={this.state.password}
                                                onChange={this.onTextboxPasswordChange} />
                                        </FormField>
                                    </FormRow>
                                    <FormButtons>
                                        <FormButton>
                                            <Button
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

export default connect(mapStateToProps, mapDispatchToProps)(App)