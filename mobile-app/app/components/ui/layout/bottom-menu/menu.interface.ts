import { TypeFeatherIconNames } from '@/types/icon.interface'

import { TypeRootStackParamList } from '@/navigation/navigation.type'

export interface IMenuItem {
	icon: TypeFeatherIconNames
	path: keyof TypeRootStackParamList
}

export type TypeNavigate = (screenName: keyof TypeRootStackParamList) => void
