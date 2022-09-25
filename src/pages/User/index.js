/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import Header from '../../components/Header'
import { FontAwesome } from '@expo/vector-icons'
import Button from '../../components/Button'
import Input from '../../components/Input'
import connectDatabase from '../../connection'
import createUserService from '../../Service/User'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'

export default function User({ navigation }) {
	const [userName, setUserName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')

	connectDatabase.connectDb()
	const auth = getAuth()

	const createUser = () => {
		try {
			if (!userName) {
				return alert('O nome deve ser informado!')
			}
			if (!email) {
				return alert('O email deve ser informado!')
			}
			if (!password) {
				return alert('A senha deve ser informada!')
			}
			if (password !== confirmPassword) {
				return alert('As senhas não conferem!')
			}
			createUserWithEmailAndPassword(auth, email, password)
				.then((userCredential) => {
					userCredential.user.displayName = userName
					const user = userCredential.user
					createUserService.createUser(user.uid, userName, email)
					navigation.navigate('Home', { user })
				})
				.catch((error) => {
					const errorCode = error.code
					const errorMessage = error.message
					if (errorMessage === 'Firebase: Error (auth/email-already-in-use).') {
						return alert('Email já utilizado!')
					}
				})
		} catch (error) {
			alert(error)
		}
	}

	return (
		<View style={styles.constainer}>
			<Header
				name='Cadastrar Usuário'
				showButton={false}
			/>
			<View style={styles.content}>
				<Input
					placeholder='Nome'
					handleOnChange={(e) => setUserName(e.valueOf())}
					value={userName}
				/>
				<Input
					placeholder='E-mail'
					type='emailAddress'
					handleOnChange={(e) => setEmail(e.valueOf())}
					value={email}
				/>
				<Input
					placeholder='Senha'
					showPassWord={true}
					handleOnChange={(e) => setPassword(e.valueOf())}
					value={password}
				/>
				<Input
					placeholder='Confirmar senha'
					showPassWord={true}
					handleOnChange={(e) => setConfirmPassword(e.valueOf())}
					value={confirmPassword}
				/>
				<Button
					name='Cadastrar'
					handleOnPress={createUser}
				/>
				<TouchableOpacity
					style={styles.back}
					onPress={() => navigation.navigate('Login')}>
					<View style={styles.viewButton}>
						<FontAwesome
							name='arrow-circle-left'
							color='#8000ff'
							size={50}
						/>
						<Text style={styles.textButon}>Voltar</Text>
					</View>
				</TouchableOpacity>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	constainer: {
		flex: 1,
	},
	content: {
		alignItems: 'center',
		justifyContent: 'center',
	},
})
