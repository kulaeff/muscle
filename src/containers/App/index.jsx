import React, { Component } from 'react'
import { browserHistory } from 'react-router';
import Button from '../../components/Button'
import Form, { FormButton, FormButtons, FormField, FormRow } from '../../components/Form'
import NavigationBar from '../../components/NavigationBar'
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
    constructor(props) {
        super(props)

        this.state = {
            buttonDisabled: false,
            password: sessionStorage.getItem('password'),
            selectedIndex: 1,
            typedUser: '',
            typedPassword: '',
            user: sessionStorage.getItem('user')
        }
    }

    onFormSubmit = (e) => {
        this.setState({
            buttonDisabled: true
        })

        // REFACTOR
        // Check specified user/password and if they exist, save them to sessionStorage
        sessionStorage.setItem('user', this.state.typedUser)
        sessionStorage.setItem('password', this.state.typedPassword)

        this.setState({
            password: this.state.typedPassword,
            user: this.state.typedUser
        })

        e.preventDefault()
    }

    onNavigationBarChange = (id) => {
        browserHistory.push(`/${id}`)

        this.setState({
            selectedIndex: navigationBarItems.findIndex(item => item.id === id)
        })
    }

    onTextboxUserChange = (e) => {
        this.setState({
            typedUser: e.target.value
        })
    }

    onTextboxPasswordChange = (e) => {
        this.setState({
            typedPassword: e.target.value
        })
    }

    render() {
        const
            b = block('app')

        if (this.state.user !== null && this.state.password !== null) {
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
                                                value={this.state.typedUser}
                                                onChange={this.onTextboxUserChange} />
                                        </FormField>
                                    </FormRow>
                                    <FormRow>
                                        <FormField label="Password">
                                            <Textbox
                                                id="password"
                                                name="password"
                                                required={true}
                                                type="password"
                                                value={this.state.typedPassword}
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

export default App