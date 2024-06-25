import Auth from '@/components/screens/auth/Auth'
import Home from '@/components/screens/home/Home'

import { IRoute } from '@/navigation/navigation.type'

export const routes: IRoute[] = [
	{
		name: 'Auth',
		component: Auth
	},
	{
		name: 'Home',
		component: Home
	}
]
