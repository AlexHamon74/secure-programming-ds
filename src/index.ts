import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { authMiddleware } from './middleware/auth.js';
import userRoutes from './controllers/user.js'
import apiRoutes from './controllers/api.js'
import { secureHeaders } from 'hono/secure-headers';


const app = new Hono()

app.use('*', secureHeaders())

app.use('/api/*', authMiddleware);

app.route('/', userRoutes)
app.route('/api/', apiRoutes)


export default app;
