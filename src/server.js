require('dotenv').config();
const app = require('./api');
const { postLoginValidation } = require('./database/controllers/loginController');
const { missingDate } = require('./database/middlwares/validationLogin');
const { displayNameTest, emailTesst,
   passwordTestSix } = require('./database/middlwares/validationUsers');
const { postUserValidation, getAllUsers, 
  getIdUsers } = require('./database/controllers/userControllers');
const { tokenValid } = require('./database/middlwares/validationToken');
const { postAddCategory } = require('./database/controllers/categoriesControllers');

// não remova a variável `API_PORT` ou o `listen`
const port = process.env.API_PORT || 3000;

// não remova esse endpoint
app.get('/', (_request, response) => {
  response.send();
});

app.post('/login', missingDate, postLoginValidation);
app.post('/user', displayNameTest, emailTesst, passwordTestSix, postUserValidation);

app.get('/user', tokenValid, getAllUsers);
app.get('/user/:id', tokenValid, getIdUsers);
app.post('/categories', tokenValid, postAddCategory);

app.listen(port, () => console.log('ouvindo porta', port));
