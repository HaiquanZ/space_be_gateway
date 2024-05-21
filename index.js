const express = require('express');
const cors = require('cors');
const proxy = require('express-http-proxy');
const authorize = require('./src/middlewares/auth');
const bodyParser = require("body-parser");

const app = express();
const fileUpload = require('express-fileupload');
app.use(fileUpload());
app.use(cors({origin: true, credentials: true}));
app.use(express.json());
app.use(bodyParser. text({type: '/'}));

app.use('/user', authorize, proxy('http://localhost:8001'))
app.use('/group', authorize, proxy('http://localhost:8002'))
app.use('/assignment', authorize, proxy('http://localhost:8003'))
app.use('/file', authorize, proxy('http://localhost:8004'))

app.listen(8000, () => {
    console.log('Gateway listening on 8000')
})