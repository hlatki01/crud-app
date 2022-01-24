export default {
	rocketAuth: {
		token: 'fG5dURK2dFaIosgM2nFN9cKyjgPRvM27soSFXUUumMG',
		userId: 'hPfCL7truC7T8XBux',
		contentType: 'application/json',
		serverUri: 'https://chat.lgrocket.ga'
	},
	belvoAuth: {
		token: '3a4c7f33-e91f-49c2-917d-cfafd1723963',
		secret: 'KtwR#K9aZ08wh-LC*xyL#WwgACXmC*COw2DUuvf@z-smRrARiDu4t1RkdFkauDnq',
    	env: 'sandbox'
	},
	port: process.env.PORT || 21075,
	folderStorage: process.env.URL_STORAGE || "./storage",
	pictureQuality: process.env.PICTURE_QUALITY || 80,
	secretyKey: process.env.SECRETYKEY || 'f5ccc0f3-cbb6-4788-b4c8-403c22cd110f',
	publicRoutes: process.env.PUBLICROUTES || [
		'users/create',
		'users/auth', 
		'customer/create', 
		'storage', 
		'address'
	]
}
