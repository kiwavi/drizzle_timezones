import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { drizzle } from 'drizzle-orm/node-postgres';
import { usersTable } from './db/schema';

dotenv.config();

const app: Express = express();
app.use(express.json());
const port = process.env.PORT || 3000;

const db = drizzle(process.env.DATABASE_URL!);

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.post("/user", async (req: Request, res: Response):Promise<any> => {
    try {
	let {name,age,email}:{name:string,age:number,email:string} = req.body;
	if (!name || !age || !email) {
	    return res.status(400).json({success:false})
	}

	const user: typeof usersTable.$inferInsert = {
	    name,
	    age,
	    email,
	};

	await db.insert(usersTable).values(user);
	
	res.send("User created successfully");    
    }
    catch (e) {
	res.status(500).send("User could not be created")
    }
});

app.get("/users", async (req: Request, res: Response):Promise<any> => {
    try {
	const result = await db.select().from(usersTable);
	return res.status(200).json({result})
    }

    catch (e) {
	res.status(500).send("User could not be created")
    }
    
})

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});


