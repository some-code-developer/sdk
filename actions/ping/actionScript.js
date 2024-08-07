// Documentation
// https://www.npmjs.com/package/ping

const ping = require('ping');

actionParameters.ExecutionResult = SUCCESS;
try {
  const res = await ping.promise.probe(actionParameters.host);
  logger.error(JSON.stringify(res));
  if (!res.alive) throw new Error(res.output);
} catch (e) {
  actionParameters.ExecutionResult = ERROR;
  actionParameters.ExecutionMessage = e.message;
  stepExecutionInfo.message = e.message;
  logger.error(e.message);
  logger.error(e.stack.replace(e.message, ""));
}
return actionParameters.ExecutionResult;
