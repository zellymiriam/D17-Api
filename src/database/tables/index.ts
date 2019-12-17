export const Users = `CREATE TABLE IF NOT EXISTS
     users(
         id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
         first_name VARCHAR(50) ,
         last_name VARCHAR(50) ,
         email VARCHAR(50)  NOT NULL UNIQUE,
         phone_number VARCHAR(15) NOT NULL  UNIQUE,
         password  VARCHAR(100),
         profile_picture VARCHAR(100),
         role uuid REFERENCES roles(id) ON DELETE RESTRICT,
         is_verified BOOLEAN NOT NULL DEFAULT false,
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
