import { exec } from 'child_process';
export async function checkYarn() {
  return new Promise((resolve, reject) => {
    exec('yarn --version', (err, stdout, stderr) => {
      if (err) {
        reject(err);
      }
      resolve(stdout);
    });
  });
}