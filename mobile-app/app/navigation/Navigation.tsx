import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'

import { TypeRootStackParamList } from '@/navigation/navigation.type'
import { routes } from '@/navigation/routes'

const Stack = createNativeStackNavigator<TypeRootStackParamList>()

const Navigation = () => {
	return (
		<NavigationContainer>
			<Stack.Navigator
				screenOptions={{
					headerShown: false,
					contentStyle: {
						backgroundColor: '#fff'
					}
				}}
			>
				{routes.map(route => (
					<Stack.Screen key={route.name} {...route} />
				))}
			</Stack.Navigator>
		</NavigationContainer>
	)
}

export default Navigation
