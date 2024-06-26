import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'

import Auth from '@/components/screens/auth/Auth'

import { useAuth } from '@/hooks/useAuth'

import { TypeRootStackParamList } from '@/navigation/navigation.type'
import { routes } from '@/navigation/routes'

const Stack = createNativeStackNavigator<TypeRootStackParamList>()

const PrivateNavigator = () => {
	const { user } = useAuth()

	return (
		<Stack.Navigator
			screenOptions={{
				headerShown: false,
				contentStyle: {
					backgroundColor: '#fff'
				}
			}}
		>
			{user ? (
				routes.map(route => (
					<Stack.Screen key={route.name} {...route} />
				))
			) : (
				<Stack.Screen name={'Auth'} component={Auth} />
			)}
		</Stack.Navigator>
	)
}

export default PrivateNavigator
