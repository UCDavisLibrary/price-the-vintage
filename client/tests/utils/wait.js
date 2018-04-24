module.exports = function wait(time = 100) {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(), time);
  });
}