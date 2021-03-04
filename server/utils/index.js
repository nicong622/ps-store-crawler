function parsePrice(priceString) {
  return priceString.replace(/HK\$\s*/g, '');
}

module.exports = {
  parsePrice,
};
