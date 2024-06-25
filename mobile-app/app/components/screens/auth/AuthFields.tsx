import React, { FC } from 'react'
import { Control } from 'react-hook-form'

import { validEmail } from '@/components/screens/auth/emmail.regex'
import Field from '@/components/ui/field/Field'

import { IAuthFormData } from '@/types/auth.interface'

interface IAuthFields {
	control: Control<IAuthFormData>
}

const AuthFields: FC<IAuthFields> = ({ control }) => {
	return (
		<>
			<Field<IAuthFormData>
				placeholder={'Enter email'}
				control={control}
				name={'email'}
				rules={{
					required: 'Email is required',
					pattern: {
						value: validEmail,
						message: 'Please enter a valid email address'
					}
				}}
				keyboardType={'email-address'}
			/>

			<Field<IAuthFormData>
				placeholder={'Enter password'}
				control={control}
				secureTextEntry
				name={'password'}
				rules={{
					required: 'Password is required',
					minLength: {
						value: 6,
						message: 'Password must be at least 6 characters'
					}
				}}
				keyboardType={'email-address'}
			/>
		</>
	)
}

export default AuthFields
