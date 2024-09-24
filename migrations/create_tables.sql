CREATE TABLE users (
    id uuid primary key default gen_random_uuid (),
    name text not null
);

CREATE TABLE companies (
    id uuid primary key default gen_random_uuid (),
    name text not null
);

CREATE TABLE user_visits (
    id serial primary key,
    user_id uuid references users(id),
    company_id uuid references companies(id),
    visit_time timestamp not null default now()
);