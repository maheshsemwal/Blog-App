import { Hono, Context } from 'hono'
import userRoutes from './Routes/userRoutes';
import blogRoute from './Routes/blogRoutes';
import { cors } from 'hono/cors'

interface CustomContext extends Context {
  user: any;
}

const app = new Hono<{
	Bindings: {
		DATABASE_URL: string,
		JWT_SECRET: string,
	}
}>();

app.use('/*', cors())

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.route('/api/v1/user', userRoutes)
app.route('/api/v1/blog', blogRoute)
 
export default app
