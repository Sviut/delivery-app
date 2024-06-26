import { IUser } from 'app/types/user.interface'
import * as SplashScreen from 'expo-splash-screen'
import React, {
	FC,
	PropsWithChildren,
	createContext,
	useEffect,
	useState
} from 'react'

import {
	IContext,
	TypeUserState
} from '@/providers/auth/auth-provider.interface'

export const AuthContext = createContext({} as IContext)

let ignore = SplashScreen.preventAutoHideAsync()

const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
	const [user, setUser] = useState<TypeUserState>({} as IUser)

	useEffect(() => {
		let mounted = true

		const checkAccessToken = async () => {
			try {
			} catch {
			} finally {
				await SplashScreen.hideAsync()
			}
		}

		let ignore = checkAccessToken()

		return () => {
			mounted = false
		}
	}, [])

	return (
		<AuthContext.Provider value={{ user, setUser }}>
			{children}
		</AuthContext.Provider>
	)
}

export default AuthProvider
