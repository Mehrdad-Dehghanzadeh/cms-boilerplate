-- Run this file once with psql as a PostgreSQL administrator.
-- The password is requested interactively and is not stored in source control.
\prompt 'Password for cms_user: ' cms_password
-- Create user
CREATE ROLE cms_user
WITH LOGIN
PASSWORD :'cms_password';

-- Create Data Base
CREATE DATABASE cms
WITH
    OWNER = cms_user
    ENCODING = 'UTF8'
    TEMPLATE = template0;

-- Create Table Categories
CREATE TABLE post_categories (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title VARCHAR(255) UNIQUE NOT NULL,
    description TEXT DEFAULT '',
    create_at TIMESTAMPTZ DEFAULT NOW() NOT NULL, 
    update_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
)
