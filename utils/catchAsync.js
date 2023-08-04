module.exports = (fund) => {
  return (req, res, next) => {
    fund(req, res, next).catch(next);
  };
};
