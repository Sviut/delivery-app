import { NavigationContainer } from '@react-navigation/native'
import React from 'react'

import PrivateNavigator from '@/navigation/PrivateNavigator'

const Navigation = () => {
	return (
		<NavigationContainer>
			<PrivateNavigator />
		</NavigationContainer>
	)
}

export default Navigation
