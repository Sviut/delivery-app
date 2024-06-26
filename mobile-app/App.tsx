import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'

import { Toast } from '@/components/ui/Toast'

import AuthProvider from '@/providers/auth/AuthProvider'

import Navigation from '@/navigation/Navigation'

export default function App() {
	return (
		<>
			<AuthProvider>
				<SafeAreaProvider>
					<SafeAreaView style={{ flex: 1 }}>
						<Navigation />
					</SafeAreaView>
				</SafeAreaProvider>
			</AuthProvider>
			<StatusBar style={'light'} />
			<Toast />
		</>
	)
}
