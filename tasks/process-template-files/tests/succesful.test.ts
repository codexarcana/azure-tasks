import { processTemplates } from '../src/run';
import readFile from 'read-file-utf8';

test('should create output from variables and template', async () => {

    const processedFiles = await processTemplates(
        ['**/*.tpl'],
        '/tmp/tst',
        { name: 'World' }
    );

    const [processedTemplateFileName] = processedFiles;

    expect(processedFiles.length).toEqual(1);
    expect(processedTemplateFileName).toEqual('/tmp/tst/template.tpl');

    const processedFileContents = await readFile(processedTemplateFileName);
    expect(processedFileContents).toEqual('Hello, World');

});
