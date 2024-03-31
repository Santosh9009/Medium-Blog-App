import { verify } from 'hono/jwt'


export async function middleware(c:any, next:any){
	const jwt = c.req.header('Authorization');

	if (!jwt || !jwt.startsWith('Bearer ')) {
		c.status(401);
		return c.json({ error: "unauthorized" });
	}
	const token = jwt.split(' ')[1];
	const payload = await verify(token, c.env.JWT_SECRET);
	if (!payload) {
		c.status(401);
		return c.json({ error: "unauthorized" });
	}
	c.set('userId', payload.id);
	await next()
}