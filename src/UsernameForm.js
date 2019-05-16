// ./src/UsernameForm.js

import React, { Component } from 'react';
import fire, { fireDatabase } from './firebase';
import { __await } from 'tslib';

class UsernameForm extends Component {
	constructor() {
		super();
		this.state = {
			username: '',
			registerEmail: '',
			registerPassword: '',
			email: '',
			password: ''
		};
	}

	handleSubmit = e => {
		e.preventDefault();
		if (this.state.email !== '' || this.state.password !== '') {
			fire
				.auth()
				.signInWithEmailAndPassword(this.state.email, this.state.password)
				.then(() => {
					var currentUser = fire.auth().currentUser;
					var currentDate = new Date().toLocaleString();
					fireDatabase
						.child('users/' + currentUser.uid + '/')
						.child('last_login')
						.set(currentDate);

					fireDatabase
						.child('/users/' + currentUser.uid)
						.once('value')
						.then(snapshot => {
							var username = snapshot.val().username;
							this.props.handleSubmit(username);
						});
				})
				.catch(function(error) {
					if (error != null) {
						alert(error.message);
						return;
					}
				});
		}
	};
	handleRegister = e => {
		e.preventDefault();
		fire
			.auth()
			.createUserWithEmailAndPassword(this.state.registerEmail, this.state.registerPassword)
			.then(() => {
				var currentUser = fire.auth().currentUser;
				var currentDate = new Date().toLocaleString();
				var currentUserUsername = this.state.username;
				fireDatabase.child('users/' + currentUser.uid).set({
					last_login: currentDate,
					email: currentUser.email,
					username: currentUserUsername
				});
				this.props.handleSubmit(currentUserUsername);
			})
			.catch(function(error) {
				if (error != null) {
					alert(error.message);
					return;
				}
			});
	};
	handleChangeEmail = e => {
		this.setState({
			email: e.target.value
		});
	};

	handleChangePassword = e => {
		this.setState({
			password: e.target.value
		});
	};
	handleRegEmail = e => {
		this.setState({
			registerEmail: e.target.value
		});
	};

	handleRegPassword = e => {
		this.setState({
			registerPassword: e.target.value
		});
	};
	handleChangeUsername = e => {
		this.setState({
			username: e.target.value
		});
	};
	render() {
		return (
			<div id="username-form">
				<div id="register-login-card">
					<div id="register-container">
						<form onSubmit={this.handleRegister} id="register-form">
							<label> Welcome </label> {' '}
							<input
								class="register-fields"
								value={this.state.username}
								onChange={this.handleChangeUsername}
								placeholder="Username"
							/>
							<input
								class="register-fields"
								value={this.state.registerEmail}
								onChange={this.handleRegEmail}
								placeholder="Email"
							/>
							<input
								class="register-fields"
								value={this.state.registerPassword}
								onChange={this.handleRegPassword}
								placeholder="Password"
								type="password"
							/>
							<button id="register-button" type="submit">
								Register {' '}
							</button>{' '}
							{' '}
						</form>{' '}
						{' '}
					</div>{' '}
					{' '}
					<div id="login-container">
						<form onSubmit={this.handleSubmit} id="login-form">
							<div id="login-logo" />
							<label id="logo-name"> S T A R D U S T </label> {' '}
							<input
								class="login-fields"
								value={this.state.email}
								onChange={this.handleChangeEmail}
								placeholder="Email"
							/>
							<input
								type="password"
								class="login-fields"
								value={this.state.password}
								onChange={this.handleChangePassword}
								placeholder="Password"
							/>
							<button id="login-button" type="submit">
								Login {' '}
							</button>{' '}
							{' '}
						</form>{' '}
						{' '}
					</div>{' '}
					{' '}
				</div>{' '}
				{' '}
			</div>
		);
	}
}

export default UsernameForm;
