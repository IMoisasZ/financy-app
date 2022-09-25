import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { MotiText, MotiView, AnimatePresence } from 'moti'

export default function Moviments({ data }) {
	const [showValue, setShowValue] = useState(false)

	return (
		<TouchableOpacity
			style={styles.container}
			onPress={() => setShowValue(!showValue)}>
			<Text style={styles.date}>{data.date}</Text>
			<View style={styles.content}>
				<Text style={styles.label}>{data.label}</Text>
				{showValue ? (
					<AnimatePresence exitBeforeEnter>
						<MotiText
							style={data.type === 0 ? styles.expenses : styles.balance}
							from={{
								translateX: 300,
							}}
							animate={{
								translateX: 0,
							}}
							transition={{
								type: 'timing',
								duration: 500,
							}}>
							R$ {data.type === 0 ? `-${data.value}` : data.value}
						</MotiText>
					</AnimatePresence>
				) : (
					<AnimatePresence exitBeforeEnter>
						<MotiView
							style={styles.skeleton}
							from={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ type: 'timing' }}></MotiView>
					</AnimatePresence>
				)}
			</View>
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,

		borderBottomWidth: 0.5,
		borderBottomColor: '#dadada',
	},
	content: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginTop: 2,
		marginBottom: 8,
	},
	date: {
		color: '#dadada',
		fontWeight: 'bold',
	},
	label: {
		fontWeight: 'bold',
		fontSize: 16,
	},
	balance: {
		fontSize: 16,
		fontWeight: 'bold',
		color: '#2ecc71',
	},
	expenses: {
		fontSize: 16,
		fontWeight: 'bold',
		color: '#e74c3c',
	},
	skeleton: {
		marginTop: 6,
		width: 80,
		height: 10,
		backgroundColor: '#dadada',
		borderRadius: 8,
	},
})
