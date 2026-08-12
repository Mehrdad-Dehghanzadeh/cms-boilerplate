-- Run this file once with psql as a PostgreSQL administrator.
-- The password is requested interactively and is not stored in source control.
\prompt 'Password for cms_user: ' cms_password

CREATE ROLE cms_user
WITH LOGIN
PASSWORD :'cms_password';

CREATE DATABASE cms
WITH
    OWNER = cms_user
    ENCODING = 'UTF8'
    TEMPLATE = template0;
