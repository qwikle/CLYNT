import figlet from 'figlet';
import chalk from 'chalk';
 export function CLYNT(){
  figlet.text('CLYNT', {
    font: 'Standard',
    horizontalLayout: 'full',
    verticalLayout: 'default',
    width: 160,
    whitespaceBreak: true,
  }, function(err, data) {
    if (err) {
      console.log('Something went wrong...');
      console.dir(err);
      return;
    }
    console.log(chalk.magentaBright(data));
    console.log(`(${chalk.magentaBright('C')})lean (${chalk.magentaBright('L')})erna (${chalk.magentaBright('Y')})arn (${chalk.magentaBright('N')})x (${chalk.magentaBright('T')})ypescript`);
  }
  );
}