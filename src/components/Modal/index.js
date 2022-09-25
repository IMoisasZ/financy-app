import React, { useEffect, useState } from 'react'
import {
	Alert,
	Modal,
	StyleSheet,
	Text,
	Pressable,
	View,
	TouchableOpacity,
} from 'react-native'
import { Feather } from '@expo/vector-icons'

const App = ({ navigation }) => {
	const [modalVisible, setModalVisible] = useState(false)

	return (
		<View style={styles.centeredView}>
			<Modal
				animationType='slide'
				transparent={true}
				visible={modalVisible}
				onRequestClose={() => {
					Alert.alert('Modal has been closed.')
					setModalVisible(!modalVisible)
				}}>
				<View style={styles.centeredView}>
					<View style={styles.modalView}>
						<Text style={styles.modalText}>Hello World!</Text>
						<Pressable
							style={[styles.button, styles.buttonClose]}
							onPress={logOut}>
							<Text style={styles.textStyle}>Log Out</Text>
						</Pressable>
					</View>
				</View>
			</Modal>
			<TouchableOpacity
				activeOpacity={0.9}
				style={styles.buttonUser}
				onPress={() => setModalVisible(true)}>
				<Feather
					name='user'
					size={27}
					color='#fff'
				/>
			</TouchableOpacity>
		</View>
	)
}

const styles = StyleSheet.create({
	centeredView: {
		justifyContent: 'center',
		alignItems: 'center',
	},
	modalView: {
		margin: 20,
		backgroundColor: 'white',
		borderRadius: 20,
		padding: 35,
		alignItems: 'center',
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
	},
	button: {
		borderRadius: 20,
		padding: 10,
		elevation: 2,
	},
	buttonOpen: {
		backgroundColor: '#F194FF',
	},
	buttonClose: {
		backgroundColor: '#8000ff',
	},
	textStyle: {
		color: 'white',
		fontWeight: 'bold',
		textAlign: 'center',
	},
	modalText: {
		marginBottom: 15,
		textAlign: 'center',
	},
	buttonUser: {
		height: 44,
		width: 44,
		backgroundColor: 'rgba(255,255,255,0.5)',
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 44 / 2,
	},
})

export default App
