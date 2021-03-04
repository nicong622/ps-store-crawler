const fastify = require('fastify')({ logger: true });
const controllers = require('./controllers/index');

fastify.get('/crawl-ps-price', controllers.crawlPage);
fastify.get('/faver/get-all', controllers.getAllFavers);

fastify.post('/faver/add', controllers.addFavor);
fastify.post('/faver/remove', controllers.removeFavor);

const start = async () => {
  try {
    await fastify.listen(3000);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
