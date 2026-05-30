-- create user
CREATE ROLE cms_user
WITH LOGIN
PASSWORD '1';


CREATE DATABASE cms
WITH
    OWNER = cms_user
    ENCODING = 'UTF8'
    LC_COLLATE = 'fa_IR.UTF-8'
    LC_CTYPE = 'fa_IR.UTF-8'
    TEMPLATE = template0;