import tl = require('azure-pipelines-task-lib/task');
import { sync as globSync } from 'glob-all';
import { safeLoad } from 'js-yaml';

async function run() {

    const templateFilePaths = tl.getInput('templateFiles', true);
    const variablesText = tl.getInput('variables', true);

    const globs = (templateFilePaths as string)
        .split('\n')
        .map(globPath => globSync([globPath]))

    const allFiles = ([] as string[]).concat(...globs);

    const variables = safeLoad(variablesText as string) as {
        [key: string]: string
    };

    console.log(`Processing with variables ${variables}`);

    allFiles.forEach(file => {
        console.log(`File to process: ${file}`);
    });

}

run();
