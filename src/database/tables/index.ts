export const tables =`
BEGIN;
CREATE TABLE IF NOT EXISTS
     users(
         id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
         first_name VARCHAR(50) ,
         last_name VARCHAR(50) ,
         email VARCHAR(50)  NOT NULL UNIQUE,
         phone_number VARCHAR(15) NOT NULL  UNIQUE,
         password  VARCHAR(100),
         profile_picture VARCHAR(100),
         account_balance NUMERIC(20) NOT NULL,
         is_verified BOOLEAN NOT NULL DEFAULT false,
         created_at timestamp NOT NULL DEFAULT current_timestamp,
         updated_at timestamp NOT NULL DEFAULT current_timestamp
     );
     CREATE TABLE IF NOT EXISTS
  roles(
      id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
      name VARCHAR(50) NOT NULL UNIQUE,
      created_at timestamp NOT NULL DEFAULT current_timestamp,
      updated_at timestamp NOT NULL DEFAULT current_timestamp
  );
  CREATE TABLE IF NOT EXISTS
  transactions(
      id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
      type VARCHAR(100) NOT NULL,
      amount NUMERIC (20) NOT NULL,
      is_deleted BOOLEAN NOT NULL DEFAULT false,
      created_at timestamp  NOT NULL DEFAULT current_timestamp,
      updated_at timestamp  NOT NULL DEFAULT current_timestamp
  );
COMMIT;
`

export const alterTables =`
BEGIN;
  ALTER TABLE users ADD COLUMN
  IF NOT EXISTS role uuid REFERENCES roles(id)
  ON DELETE RESTRICT;
  ALTER TABLE transactions
  ADD COLUMN IF NOT EXISTS user_id uuid REFERENCES users(id)
  ON DELETE CASCADE,
  ADD COLUMN IF NOT EXISTS made_by uuid REFERENCES users(id)
  ON DELETE CASCADE;
COMMIT;
`
