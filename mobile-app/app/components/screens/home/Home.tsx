import React from 'react'
import { Pressable, Text, View } from 'react-native'

import { useTypedNavigation } from '@/hooks/useTypedNavigation'

const Home = () => {
	const { navigate } = useTypedNavigation()

	return (
		<View>
			<Text>Home</Text>
			<Pressable onPress={() => navigate('Auth')}>
				<Text>Go to Auth</Text>
			</Pressable>
		</View>
	)
}

export default Home
