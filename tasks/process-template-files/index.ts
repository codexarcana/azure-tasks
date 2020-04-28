import { processTemplates } from './src/run';
import { safeLoad } from 'js-yaml';
import * as tl from 'azure-pipelines-task-lib/task';

const templateFilePaths = tl.getInput('templateFiles', true) as string;
const variablesText = tl.getInput('variables', true) as string;
const outputDir = tl.getInput('outputDir', true) as string;

const variables = safeLoad(variablesText) as {
    [key: string]: string;
};

const globs = templateFilePaths.split('\n');

processTemplates(globs, outputDir, variables);
