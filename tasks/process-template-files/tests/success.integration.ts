import { TaskMockRunner } from 'azure-pipelines-task-lib/mock-run';
import path = require('path');

let taskPath = path.join(__dirname, '..', 'index.js');
let taskMockRunner = new TaskMockRunner(taskPath);

const variables = `
name: 'World'
`;

taskMockRunner.setInput('templateFiles', '**/.tpl');
taskMockRunner.setInput('outputDir', '/tmp/tst');
taskMockRunner.setInput('variables', variables);

taskMockRunner.run();
