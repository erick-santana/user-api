import 'dotenv/config';
import App from './app';
import AuthRoute from './routes/AuthRoute';
import IndexRoute from './routes/IndexRoute';
import UsersRoute from './routes/UsersRoute';

const app = new App([new IndexRoute(), new UsersRoute(), new AuthRoute()]);

app.listen();
