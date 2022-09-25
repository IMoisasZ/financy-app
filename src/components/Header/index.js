import React, { useState } from 'react'
import {
	View,
	StyleSheet,
	Text,
	StatusBar,
	TouchableOpacity,
} from 'react-native'
import { Feather } from '@expo/vector-icons'
import { MotiView, MotiText } from 'moti'

const statusbarHeigth = StatusBar.currentHeight
	? StatusBar.currentHeight + 22
	: 64

export default function Header({ name, showButton, handlePress }) {
	const [showModal, setShowModal] = useState(false)

	return (
		<View style={styles.container}>
			<MotiView
				style={styles.content}
				from={{
					translateY: -150,
					opacity: 0,
				}}
				animate={{
					translateY: 0,
					opacity: 1,
				}}
				transition={{
					type: 'timing',
					duration: 800,
					delay: 300,
				}}>
				<MotiText
					style={styles.userName}
					from={{
						translateX: -300,
					}}
					animate={{
						translateX: 0,
					}}
					transition={{
						type: 'timing',
						duration: 800,
						delay: 800,
					}}>
					{name}
				</MotiText>
				{showButton && (
					<View style={styles.logOut}>
						<TouchableOpacity
							activeOpacity={0.9}
							style={styles.buttonUser}
							onPress={handlePress}>
							<Feather
								name='user'
								size={27}
								color='#fff'
							/>
						</TouchableOpacity>
						<Text style={styles.logOutText}>Log Out</Text>
					</View>
				)}
			</MotiView>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#8000ff',
		paddingTop: statusbarHeigth,
		flexDirection: 'row',
		paddingHorizontal: 16,
		paddingBottom: 44,
	},
	content: {
		flex: 1,
		alignItems: 'center',
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	userName: {
		fontSize: 18,
		color: '#fff',
		fontWeight: 'bold',
	},
	buttonUser: {
		height: 44,
		width: 44,
		backgroundColor: 'rgba(255,255,255,0.5)',
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 44 / 2,
	},
	logOut: {
		alignItems: 'center',
		justifyContent: 'center',
	},
	logOutText: {
		color: '#fff',
		fontWeight: 'bold',
	},
})
