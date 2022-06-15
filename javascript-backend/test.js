new Promise(function (resolve, reject) {
  setTimeout(function () {
    resolve(1);
  }, 5000);
})
  .then(function (result) {
    console.log(result); // 1
    return result + 10;
  })
  .then(function (result) {
    console.log(result); // 11
    return result + 100;
  })
  .then(function (result) {
    console.log(result); // 31
  });
