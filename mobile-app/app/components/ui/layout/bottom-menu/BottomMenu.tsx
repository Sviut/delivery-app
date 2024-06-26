import React, { FC } from 'react'
import { View } from 'react-native'

import MenuItem from './MenuItem'
import { menuItems } from './menu.data'
import { TypeNavigate } from './menu.interface'

interface IBottomMenuProps {
	nav: TypeNavigate
	currentRoute?: string
}

const BottomMenu: FC<IBottomMenuProps> = props => {
	return (
		<View
			className={
				'pt-5 px-2 flex-row justify-between items-center w-full border-t border-t-solid border-t-[#bbbbbb] bg-white mb-5'
			}
		>
			{menuItems.map(menuItem => (
				<MenuItem key={menuItem.path} item={menuItem} {...props} />
			))}
		</View>
	)
}

export default BottomMenu
