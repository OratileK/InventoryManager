import bcrypt from "bcrypt";
import usersTable from "../schemas/user.schema";
import db from "../config/db";
import { eq }  from "drizzle-orm";
import jwt from "jsonwebtoken";


const SECRET_KEY = 'b11b55a5470c501e7144e2d07049494e1938e362ee649ea0c3f61592b2fd7bd56358ddd7117eb1dfdcf981a7fcffb331131bf97b12bf6c6ceb1f84ae5342db99';

const loginUserController = async (c: any) => {
  try {
    const { email, password } = await c.req.json(); // Parse request body

    const userInDB = await db.select().from(usersTable).where(eq(usersTable.email, email)).limit(1);

    if (!userInDB) {
      return c.json({ message: 'Cannot find user' }, 400);
    }

    // Compare password with hashed password
    const isPasswordCorrect = await bcrypt.compare(password, userInDB[0].password as string);

    if (!isPasswordCorrect) {
      return c.json({ message: 'Unsuccessful login' });
    }
     // generate jwt (payload, secret_key, options)
    const token = jwt.sign(
      { userId: userInDB[0].id, email: userInDB[0].email },
      SECRET_KEY,                                          
      { expiresIn: '1h' }
    );

    return c.json({ message: 'Login successful', token });
  } catch (error) {
    console.error('Error during login:', error);
    return c.json({ message: 'An error occurred during login' }, 500);
  }
};

const createUserController = async (c: any) => {
  try {
    const { name, email, password } = await c.req.json();
    const saltRounds = 10;

    const passwordHash = await bcrypt.hash(password, saltRounds); //generate password hash

    //check if user already exists in db!!
    
    //save info in database table
    await db.insert(usersTable).values({
      name: name,
      email: email,
      password: passwordHash,
    });

    return c.json({ message: "User Created" });
  } catch (error) {
    throw error;
  }
};



export { createUserController, loginUserController };
