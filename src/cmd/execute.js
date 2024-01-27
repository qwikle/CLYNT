import { exec } from 'child_process';

// yarn install

export async function installYarn() {
  return new Promise((resolve, reject) => {
    exec('yarn', (err, stdout, stderr) => {
      if (err) {
        reject(err);
      }
      resolve(stdout);
    });
  });
}
