const validatePlay = (
  initialOuts,
  initialBaserunners,
  finalOuts,
  finalBaserunners,
  runsScored
) => {
  return (
    validIntialOuts(initialOuts) &&
    validBaserunners(initialBaserunners) &&
    validBaserunners(finalBaserunners) &&
    validFinalOuts(finalOuts) &&
    validRunsScoredPerPlay(runsScored)
  );
};

const validRunsScoredPerPlay = runs => {
  return typeof runs === "number" && runs >= 0 && runs <= 4;
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

// there are 24 possible valid plays -- everything else is invalid

module.exports = validatePlay;
