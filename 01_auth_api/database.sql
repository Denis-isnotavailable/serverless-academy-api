
create TABLE users(
    id VARCHAR(64) PRIMARY KEY,
    email VARCHAR(255),
    password_hash VARCHAR(255),
    refresh_token VARCHAR(255)
);