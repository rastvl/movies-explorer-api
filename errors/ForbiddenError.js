module.exports = class ForbittenError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 403;
  }
};
