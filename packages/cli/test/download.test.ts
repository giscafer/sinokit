const download = require('download-git-repo');

const downloadRepository = (
  repository: string,
  destination = 'sino-cli-demo'
): Promise<any> => {
  return new Promise((resolve, reject) => {
    console.log(`https://github.com:${repository}#master`);
    download(
      `https://github.com:${repository}#master`,
      destination,
      { clone: true },
      (err: any) => {
        if (!err) {
          resolve(111);
        } else {
          reject(err);
        }
      }
    );
  });
};

downloadRepository('giscafer/resume', 'demo').then(res => console.log(res));
