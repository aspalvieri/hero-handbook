-- ADMIN Permissions
INSERT INTO role_permissions(role_id, permission_id) VALUES
((SELECT roles.id FROM roles WHERE roles.name = 'ADMIN'), 
	(SELECT permissions.id FROM permissions WHERE permissions.name = 'USERS_LIST')),
((SELECT roles.id FROM roles WHERE roles.name = 'ADMIN'), 
	(SELECT permissions.id FROM permissions WHERE permissions.name = 'USERS_DISPLAY')),
((SELECT roles.id FROM roles WHERE roles.name = 'ADMIN'), 
	(SELECT permissions.id FROM permissions WHERE permissions.name = 'ROLES_LIST'));

-- USER Permissions
INSERT INTO role_permissions(role_id, permission_id) VALUES
((SELECT roles.id FROM roles WHERE roles.name = 'USER'), 
	(SELECT permissions.id FROM permissions WHERE permissions.name = 'USERS_DISPLAY'));