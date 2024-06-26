import RnToast, { BaseToast } from 'react-native-toast-message'

const options = (primaryColor: string) => ({
	style: { backgroundColor: '#080808', borderLeftColor: primaryColor },
	text1Style: {
		color: 'white',
		fontSize: 16
	},
	text2Style: {
		fontSize: 14
	}
})

export const Toast = () => {
	return (
		<RnToast
			topOffset={50}
			config={{
				success: props => (
					<BaseToast {...props} {...options('#67E769')} />
				),
				info: props => <BaseToast {...props} {...options('#65D4FF')} />,
				error: props => <BaseToast {...props} {...options('#FF4949')} />
			}}
		/>
	)
}
