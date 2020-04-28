import { processTemplates } from './src/run';
import { safeLoad } from 'js-yaml';
import * as tl from 'azure-pipelines-task-lib/task';

function run(): Promise<void> {
    return Promise.resolve(undefined);
}

run();
