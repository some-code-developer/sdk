const fs = require('fs');
const path = require('path');
const anymatch = require('anymatch');

//NOTE: cleanPath function prevents access to the files or folders outside files directory
const { cleanPath } = require('./utils');

actionParameters.ExecutionResult = SUCCESS;
const files = [];
try {
  const fileName = cleanPath(actionParameters.file);
  const directory = path.dirname(fileName);
  const mask = path.basename(fileName);
  const filesList = fs.readdirSync(directory).filter((fn) => anymatch(mask, fn));
  if (filesList.length === 0) throw new Error(`File/Folder: ${fileName} does not exists`);
  filesList.forEach((fn) => {
    const file = path.resolve(directory, fn);
    files.push(file);
  });
  actionParameters.files = files;
} catch (e) {
  actionParameters.ExecutionResult = ERROR;
  actionParameters.ExecutionMessage = e.message;
  stepExecutionInfo.message = e.message;
  logger.error(e.message);
  logger.error(e.stack.replace(e.message, ""));
}
return actionParameters.ExecutionResult;
