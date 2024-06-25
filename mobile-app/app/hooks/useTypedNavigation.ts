import { NavigationProp, useNavigation } from '@react-navigation/native'

import { TypeRootStackParamList } from '@/navigation/navigation.type'

export const useTypedNavigation = () =>
	useNavigation<NavigationProp<TypeRootStackParamList>>()
