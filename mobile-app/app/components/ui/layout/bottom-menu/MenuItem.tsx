import { Feather } from '@expo/vector-icons'
import React, { FC } from 'react'
import { Pressable } from 'react-native'

import { IMenuItem, TypeNavigate } from './menu.interface'

interface IMenuItemProps {
	item: IMenuItem
	nav: TypeNavigate
	currentRoute?: string
}

const MenuItem: FC<IMenuItemProps> = ({ nav, item, currentRoute }) => {
	const isActive = currentRoute === item.path

	return (
		<Pressable
			onPress={() => nav(item.path)}
			className={'items-center w-[20%]'}
		>
			<Feather
				name={item.icon}
				size={26}
				color={isActive ? '#47AA52' : '#374151'}
			/>
		</Pressable>
	)
}

export default MenuItem
