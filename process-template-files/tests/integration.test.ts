import * as path from 'path';
import readFile from 'read-file-utf8';
import { MockTestRunner } from 'azure-pipelines-task-lib/mock-test';

test('should succeed with simple inputs', async () => {

    const testPath = path.join(__dirname, 'success.integration.js');
    const testMockRunner = new MockTestRunner(testPath);

    testMockRunner.run();

    expect(testMockRunner.succeeded);
    const processedTemplateContents = await readFile('/tmp/tst/template.tpl');
    expect(processedTemplateContents).toEqual('Hello, World');

});
