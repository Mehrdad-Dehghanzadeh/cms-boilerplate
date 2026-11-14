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

/** PUBLIC SCHEMA **/
CREATE TABLE files (
	id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
	name varchar(255),
	url varchar(255) UNIQUE,
    create_at TIMESTAMPTZ DEFAULT NOW() NOT NULL, 
    is_delete boolean DEFAULT false,
    -- image, thumbnail, video, unknown
	file_type varchar(20) DEFAULT 'unknown'

)
/** PUBLIC SCHEMA **/

/** POST SCHEMA **/
CREATE SCHEMA post

-- Create Table Categories
CREATE TABLE post.categories (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title VARCHAR(255) UNIQUE NOT NULL,
    description VARCHAR(255) DEFAULT '',
    create_at TIMESTAMPTZ DEFAULT NOW() NOT NULL, 
    update_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);
/** POST SCHEMA **/
