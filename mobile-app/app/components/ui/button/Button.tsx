import cn from 'clsx'
import React, { FC, PropsWithChildren } from 'react'
import { Pressable, Text } from 'react-native'

import { IButton } from '@/components/ui/button/button.interface'

const Button: FC<PropsWithChildren<IButton>> = ({
	children,
	className,
	...rest
}) => {
	return (
		<Pressable
			className={cn(
				'self-center mt-3.5 bg-[#47AA52] w-full py-3 font-light rounded-lg',
				className
			)}
			{...rest}
		>
			<Text className={'text-white text-center font-medium text-lg'}>
				{children}
			</Text>
		</Pressable>
	)
}

export default Button
