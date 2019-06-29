const validatePlay = (
  initialOuts,
  initialBaserunners,
  finalOuts,
  finalBaserunners,
  runsScored
) => {
  const validInput =
    validIntialOuts(initialOuts) &&
    validBaserunners(initialBaserunners) &&
    validBaserunners(finalBaserunners) &&
    validFinalOuts(finalOuts) &&
    validRunsScoredPerPlay(runsScored);

  if (!validInput) return false;

  const outsDiff = finalOuts - initialOuts;
  const initPlayerStates = initialBaserunners.length + 1;
  const resolvedPlayerStates = outsDiff + runsScored + finalBaserunners.length;
  // outs cannot decrease
  if (outsDiff < 0) return false;
  // all players must be accounted for
  if (initPlayerStates !== resolvedPlayerStates) return false;

  if (
    finalOuts === 3 &&
    !inningCanEnd(initialOuts, initialBaserunners, runsScored)
  )
    return false;

  return true;
};

const inningCanEnd = (initialOuts, initialBaserunners, runsScored) => {
  return initialBaserunners.length + 1 - runsScored >= 3 - initialOuts;
};

const validRunsScoredPerPlay = runsScored => {
  return typeof runsScored === "number" && runsScored >= 0 && runsScored <= 4;
};

const validIntialOuts = intitalOuts => {
  return (
    typeof intitalOuts === "number" && intitalOuts >= 0 && intitalOuts <= 2
  );
};

const validFinalOuts = finalOuts => {
  return typeof finalOuts === "number" && finalOuts >= 0 && finalOuts <= 3;
};

const validBaserunners = baserunners => {
  if (!Array.isArray(baserunners)) return false;
  if (baserunners.length === 0) return true;

  const valid = baserunners.every(runner => {
    return typeof runner === "number" && runner >= 1 && runner <= 3;
  });

  const unique = [...new Set(baserunners)].length === baserunners.length;

  return valid && unique;
};

module.exports = validatePlay;
