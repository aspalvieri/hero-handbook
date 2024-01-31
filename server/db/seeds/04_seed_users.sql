-- users seeds
INSERT INTO users(username, email, password, role_id) VALUES
('alex', 'alex@email.com', '1234', (SELECT roles.id FROM roles WHERE roles.name = 'ADMIN')),
('user', 'user@email.com', '1234', (SELECT roles.id FROM roles WHERE roles.name = 'USER')),
('hero', 'hero@handbook.com', '1234', (SELECT roles.id FROM roles WHERE roles.name = 'ADMIN'));
