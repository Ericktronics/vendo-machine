-- Drop tables if they exist
DROP TABLE IF EXISTS user_balance;
DROP TABLE IF EXISTS chocolates;

-- Create chocolates table
CREATE TABLE chocolates (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    price NUMERIC(10, 2) NOT NULL,
    quantity INTEGER NOT NULL CHECK (quantity >= 0)
);

-- Create user_balance table (without foreign key)
CREATE TABLE user_balance (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    cash NUMERIC(10, 2) NOT NULL CHECK (cash >= 0)
);

-- Insert initial chocolate inventory
INSERT INTO chocolates (name, price, quantity) VALUES
('Toblerone', 5.00, 10),
('Snickers Pack', 8.00, 10),
('Ferrero', 15.00, 10);

-- Insert initial user balance (user_id = 1)
INSERT INTO user_balance (user_id, cash) VALUES (1, 200.00);
