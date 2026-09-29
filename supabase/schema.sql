create table if not exists public.profiles (
    id uuid primary key references auth.users (id) on delete cascade,
    full_name text not null default '',
    phone text,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

create table if not exists public.recycling_records (
    id uuid primary key default gen_random_uuid(),
    user_id uuid not null references public.profiles (id) on delete cascade,
    waste_type text not null,
    weight_kg numeric(10, 3) not null check (weight_kg > 0),
    reward_points integer not null default 0 check (reward_points >= 0),
    status text not null default 'pending'
        check (status in ('pending', 'verified', 'rejected')),
    collection_center text,
    created_at timestamptz not null default now()
);

create table if not exists public.rewards (
    id uuid primary key default gen_random_uuid(),
    user_id uuid not null references public.profiles (id) on delete cascade,
    recycling_record_id uuid references public.recycling_records (id) on delete set null,
    type text not null check (type in ('earned', 'redeemed')),
    description text not null,
    points integer not null check (points > 0),
    reward_value numeric(10, 2) not null default 0 check (reward_value >= 0),
    status text not null default 'confirmed'
        check (status in ('pending', 'confirmed', 'rejected')),
    created_at timestamptz not null default now()
);

create index if not exists recycling_records_user_created_idx
    on public.recycling_records (user_id, created_at desc);
create index if not exists rewards_user_created_idx
    on public.rewards (user_id, created_at desc);

alter table public.profiles enable row level security;
alter table public.recycling_records enable row level security;
alter table public.rewards enable row level security;

grant usage on schema public to authenticated;
grant select, update on public.profiles to authenticated;
grant select, insert on public.recycling_records to authenticated;
grant select on public.rewards to authenticated;

drop policy if exists "Profiles are readable by their owner" on public.profiles;
create policy "Profiles are readable by their owner"
    on public.profiles for select to authenticated
    using ((select auth.uid()) = id);

drop policy if exists "Profiles are updateable by their owner" on public.profiles;
create policy "Profiles are updateable by their owner"
    on public.profiles for update to authenticated
    using ((select auth.uid()) = id)
    with check ((select auth.uid()) = id);

drop policy if exists "Users can read their recycling records" on public.recycling_records;
create policy "Users can read their recycling records"
    on public.recycling_records for select to authenticated
    using ((select auth.uid()) = user_id);

drop policy if exists "Users can submit pending recycling records" on public.recycling_records;
create policy "Users can submit pending recycling records"
    on public.recycling_records for insert to authenticated
    with check (
        (select auth.uid()) = user_id
        and status = 'pending'
        and reward_points = 0
    );

drop policy if exists "Users can read their rewards" on public.rewards;
create policy "Users can read their rewards"
    on public.rewards for select to authenticated
    using ((select auth.uid()) = user_id);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
    insert into public.profiles (id, full_name, phone)
    values (
        new.id,
        coalesce(new.raw_user_meta_data ->> 'full_name', ''),
        nullif(new.raw_user_meta_data ->> 'phone', '')
    )
    on conflict (id) do update
        set full_name = excluded.full_name,
            phone = excluded.phone;
    return new;
end;
$$;

revoke all on function public.handle_new_user() from public;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
    after insert on auth.users
    for each row execute procedure public.handle_new_user();
