#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    CREATE TABLE todos(
        id SERIAL PRIMARY KEY,
        task VARCHAR(255),
        done BOOLEAN DEFAULT FALSE
    );
EOSQL
