const fs = require("fs");

actionParameters.ExecutionResult = SUCCESS;
try {
  const loopInfo = await getLoopInfo();
  let loopIndex = Number(actionParameters.from);
  if (loopInfo.loopStatus === RUNNING) loopIndex = loopInfo.loopIndex + 1;

  if (loopIndex <= Number(actionParameters.to)) {
    await updateLoopInfo(loopIndex);
    actionParameters.index = loopIndex;
  } else {
    await resetLoopInfo();
    actionParameters.ExecutionResult = LOOP_END;
  }
} catch (e) {
  actionParameters.ExecutionResult = ERROR;
  stepExecutionInfo.message = e.message;
  logger.error(e.message);
}
return actionParameters.ExecutionResult;
