const { getGamePrice, getGameInfo } = require('../services/index');
const { faver } = require('../services/db.ts');

// 爬取页面价格
function crawlPage(request, reply) {
  const { url } = request.query;

  getGamePrice(url)
    .then((info) => {
      reply.send({
        code: 0,
        data: info,
        message: 'ok',
      });
    })
    .catch((err) => {
      request.log.info(err.message);
      reply.send({
        code: 10001,
        message: 'error',
        data: JSON.parse(err),
      });
    });
}

// 添加到收藏夹
async function addFavor(request, reply) {
  const { url } = request.body;

  const gameInfo = await getGameInfo(url);

  const data = {
    ...gameInfo,
    url,
  };

  faver.addOne(data);

  reply.send({
    code: 0,
    data,
    message: 'ok',
  });
}

// 从收藏夹移除
function removeFavor(request, reply) {
  const { id } = request.body;

  faver.removeOne({ id });

  reply.send({
    code: 0,
    message: 'ok',
  });
}

// 获取所有收藏
function getAllFavers(request, reply) {
  const all = faver.getAllFavers();

  reply.send({
    code: 0,
    message: 'ok',
    data: all,
  });
}

module.exports = {
  crawlPage,
  addFavor,
  removeFavor,
  getAllFavers,
};
