import { sync as globSync } from 'glob-all';
import readFile from 'read-file-utf8';
import { render } from 'mustache';
import write from 'write';
import * as tl from 'azure-pipelines-task-lib/task';

export async function processTemplates(
    templateFilePaths: string[],
    outputDir: string,
    variables: { [key: string]: string }
) {

    const globs = templateFilePaths
        .map(globPath => globSync([globPath]));

    const allFiles = ([] as string[]).concat(...globs);

    const processing = allFiles.map(async file => {

        const contents = await readFile(file);
        const output = render(contents, variables);
        const newFile = file.substr(file.lastIndexOf('/'));
        const outputFile = `${outputDir}${newFile}`;
        const result = await write(outputFile, output);

        tl.debug(`Writing from template '${file}' to path: '${outputFile}'`);

        return result.path;
    });

    return Promise.all(processing);
}
