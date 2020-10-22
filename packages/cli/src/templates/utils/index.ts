import { Template } from '../template';
const download = require('download-git-repo');

interface ProjectArgs {
  name: string;
  author: string;
}

export const composePackageJson = (template: Template) => ({
  name,
  author,
}: ProjectArgs) => {
  return {
    ...template.packageJson,
    name,
    author,
    module: `dist/${name}.esm.js`,
    'size-limit': [
      {
        path: `dist/${name}.cjs.production.min.js`,
        limit: '10 KB',
      },
      {
        path: `dist/${name}.esm.js`,
        limit: '10 KB',
      },
    ],
  };
};

export const downloadRepository = (
  repository: string,
  destination = 'sino-cli-demo'
): Promise<any> => {
  return new Promise((resolve, reject) => {
<<<<<<< HEAD
    console.log(`https://github.com:${repository}#master`);
=======
    console.log(`from https://github.com:${repository}#master`);
>>>>>>> master
    download(
      `https://github.com:${repository}#master`,
      destination,
      { clone: true },
      (err: any) => {
        if (!err) {
<<<<<<< HEAD
          resolve(111);
=======
          resolve();
>>>>>>> master
        } else {
          reject(err);
        }
      }
    );
  });
};
