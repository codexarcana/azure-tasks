import * as path from 'path';
import readFile from 'read-file-utf8';
import { MockTestRunner } from 'azure-pipelines-task-lib/mock-test';

function createMockRunnerForPath(relativePath: string) {
    const testPath = path.join(__dirname, relativePath);
    const testMockRunner = new MockTestRunner(testPath);
    return testMockRunner;
}

test('should succeed with simple inputs', async () => {

    const testMockRunner = createMockRunnerForPath(
        'success.integration.js'
    );

    testMockRunner.run(10);

    expect(testMockRunner.succeeded).toBeTruthy();
    const processedTemplateContents = await readFile('/tmp/tst/template.tpl');
    expect(processedTemplateContents).toEqual('Hello, World');

});

test('should fail given empty outputs', async () => {

    const testMockRunner = createMockRunnerForPath(
        'failure.integration.js'
    );

    testMockRunner.run(10);

    expect(testMockRunner.failed).toBeTruthy();

});
