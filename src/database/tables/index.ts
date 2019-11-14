export const Users = `CREATE TABLE IF NOT EXISTS
     users(
         id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
         first_name VARCHAR(50) NOT NULL,
         last_name VARCHAR(50) NOT NULL,
         email VARCHAR(50)  UNIQUE,
         phone_number VARCHAR(15) NOT NULL  UNIQUE,
         prifile_picture VARCHAR(100),
         role uuid REFERENCES roles(id) ON DELETE RESTRICT,
         create_at DATE NOT NULL DEFAULT CURRENT_DATE,
         updated_at DATE NOT NULL DEFAULT CURRENT_DATE
     )
  `;

export const Roles = `CREATE TABLE IF NOT EXISTS
  roles(
      id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
      name VARCHAR(50) NOT NULL UNIQUE,
      create_at DATE NOT NULL DEFAULT CURRENT_DATE,
      updated_at DATE NOT NULL DEFAULT CURRENT_DATE
  )
`;
