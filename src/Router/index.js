import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Login from '../pages/Login'
import Home from '../pages/Home'
import User from '../pages/User'
import Releases from '../pages/Releases'

const Stack = createNativeStackNavigator()

export default function Router() {
	return (
		<NavigationContainer initialRouteName='Login'>
			<Stack.Navigator>
				<Stack.Screen
					name='Login'
					component={Login}
					options={{ headerShown: false }}
				/>
				<Stack.Screen
					name='Home'
					component={Home}
					options={{ headerShown: false }}
				/>
				<Stack.Screen
					name='User'
					component={User}
					options={{ headerShown: false }}
				/>
				<Stack.Screen
					name='Releases'
					component={Releases}
					options={{ headerShown: false }}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	)
}
