const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
const chalk = require('chalk');
const cors = require('cors');
const initDatabase = require('./start_up/init-database');
const routes = require('./routes')

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use('/api', routes);

const PORT = config.get('port') ?? 8080;

// if (process.env.NODE_ENV === 'production') {
//   console.log('Production');
// } else {
//   console.log(process.env.NODE_ENV);
// }

async function start() {
  try {
    mongoose.connection.once('open', () => {
      initDatabase();
    });
    await mongoose.connect(config.get('mongoURI'));
    console.log(chalk.green('MongoDB is connected...'));
    app.listen(PORT, () => {
      console.log(chalk.green(`Server has been started on port ${ PORT }...`));
      if (process.env.NODE_ENV === 'development') {
        console.log(chalk.green(`Follow this link: http://localhost:${ PORT }`));
      }
    });
  } catch (e) {
    console.log(chalk.red(e.message));
    process.exit(1);
  }
}

start();
