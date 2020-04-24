import { sync as globSync } from 'glob-all';
import readFile from 'read-file-utf8';
import { render } from 'mustache';
import write from 'write';

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
        const result = await write(`${outputDir}${newFile}`, output);

        return result.path;
    });

    return Promise.all(processing);
}
