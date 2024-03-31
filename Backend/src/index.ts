import { Hono } from 'hono'
import { middleware } from './middleware';
import { UserRouter } from './routes/user';
import { BlogRouter } from './routes/blog';


const app = new Hono();

app.route('/api/v1/user',UserRouter)
app.route('/api/v1/blog',BlogRouter)



export default app
