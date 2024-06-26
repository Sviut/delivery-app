import {
	NavigationContainer,
	useNavigationContainerRef
} from '@react-navigation/native'
import { useAuth } from 'app/hooks/useAuth'
import { useEffect, useState } from 'react'

import BottomMenu from '@/components/ui/layout/bottom-menu/BottomMenu'

import PrivateNavigator from './PrivateNavigator'

const Navigation = () => {
	const { user } = useAuth()

	const [currentRoute, setCurrentRoute] = useState<undefined | string>(
		undefined
	)

	const navRef = useNavigationContainerRef()

	useEffect(() => {
		setCurrentRoute(navRef.getCurrentRoute()?.name)

		const listener = navRef.addListener('state', () =>
			setCurrentRoute(navRef.getCurrentRoute()?.name)
		)

		return () => {
			navRef.removeListener('state', listener)
		}
	}, [])

	return (
		<>
			<NavigationContainer ref={navRef}>
				<PrivateNavigator />
			</NavigationContainer>

			{user && currentRoute && (
				<BottomMenu nav={navRef.navigate} currentRoute={currentRoute} />
			)}
		</>
	)
}

export default Navigation
