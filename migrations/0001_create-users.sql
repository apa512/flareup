-- Migration number: 0001 	 2024-11-08T19:44:12.425Z

CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email_address TEXT NOT NULL,
  password_digest TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX index_email_address_on_users ON users (email_address);