self.addEventListener('message', () => {
  for (let index = 0; index < 50000; index++) {
    console.log(index);
  }

  postMessage('Done');
});
