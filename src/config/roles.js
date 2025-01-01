const AccessControl = require('accesscontrol');

const ac = new AccessControl();

const roleIds = {
	ADMIN: '1',
	SUBADMIN: '2',
	USER: '3',
};


const resources = {
	USERINFO: 'user',
	ROLE: 'role',
};

const grantsObject = {
	[roleIds.ADMIN]: {
		[resources.USERINFO]: {
			'create:any': ['*'],
			'read:any': ['*'],
			'update:any': ['*'],
			'delete:any': ['*'],
		},
		[resources.ROLE]: {
			'create:any': ['*'],
			'read:any': ['*'],
			'update:any': ['*'],
			'delete:any': ['*'],
		},
	},
	[roleIds.SUBADMIN]: {
		[resources.USERINFO]: {
			'read:any': ['*'],
			'update:any': ['*'],
		},
		[resources.ROLE]: {
			'read:any': ['*'],
		},
	},
	[roleIds.USER]: {
		[resources.USERINFO]: {
			'create:own': ['*'],
			'read:own': ['*'],
			'update:own': ['*'],
			'delete:own': ['*'],
		},
	},
};


const roles = (function () {
	ac.setGrants(grantsObject);
	return ac;
})();

module.exports = {
	roles,
	resources,
};
