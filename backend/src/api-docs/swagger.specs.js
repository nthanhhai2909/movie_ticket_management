import swaggerJsdoc from 'swagger-jsdoc';
import cfg from '../config';

const options = {
  swaggerDefinition: {
    info: {
      title: 'Moive Ticket Management',
      version: '1.0.0',
      description: 'Moive Ticket API',
    },
    basePath: '/',
    host: `${cfg.express.host}:${cfg.express.port}`
  },
  apis: [ './src/module/**/router/*.js', './src/router.js']
};

const specs = swaggerJsdoc(options);

export default specs;
