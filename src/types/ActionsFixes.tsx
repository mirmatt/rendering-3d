
export interface ExtendedDivRef {
	current: {
		focus: Function
	}
}

export interface ExtendedCameraRef {
	position: {
		set : Function
	},
	lookAt: Function
}