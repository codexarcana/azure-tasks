import { TaskMockRunner } from 'azure-pipelines-task-lib/mock-run';
import path = require('path');

const taskPath = path.join(__dirname, '..', 'index.js');
const taskMockRunner = new TaskMockRunner(taskPath);


taskMockRunner.run();
