const express = require('express');
const bodyParser = require('body-parser');
const ballotRouter = require('./ballotRouter'); 
const adminRouter = require('./adminRouter'); 
const cors = require('cors');

const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}

const app = express();
app.use(bodyParser.json());
app.use(cors(corsOptions));

app.use('/ballot', ballotRouter);
app.use('/admin', adminRouter);

const PORT = 9000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
