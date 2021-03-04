const axios = require('axios');
const cheerio = require('cheerio');
const { parsePrice } = require('../utils/index');

/**
 * 下载主页内容，并用 cherrio 加载页面内容
 * @param {String} url 游戏主页 url
 */
function loadPage(url) {
  return axios.get(url)
    .then((res) => cheerio.load(res.data));
}

/**
 * 获取游戏价格
 * @param {String} url 游戏主页的 url
 */
async function getGamePrice(url) {
  const page = await loadPage(url);

  const finalPrice = page('span[data-qa="mfeCtaMain#offer0#finalPrice"]').eq(0).text();
  const originalPrice = page('span[data-qa="mfeCtaMain#offer0#originalPrice"]').eq(0).text();

  return {
    finalPrice: parsePrice(finalPrice),
    originalPrice: parsePrice(originalPrice),
  };
}

/**
 * 获取游戏基本信息
 * @param {String} url 游戏主页的 url
 */
async function getGameInfo(url) {
  const page = await loadPage(url);

  const name = page('[data-qa="mfe-game-title#name"]').first().text();
  const rawImg = page('[data-qa="gameBackgroundImage#heroImage#preview"]').attr('src') || '';

  const mainImg = rawImg.split('?')[0] || '';

  return {
    name,
    mainImg,
  };
}

module.exports = {
  getGamePrice,
  getGameInfo,
};
