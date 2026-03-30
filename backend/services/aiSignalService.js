const optimizeSignalTiming = (trafficDensity) => {

  if (trafficDensity > 80) {
    return 90;
  }

  if (trafficDensity > 50) {
    return 70;
  }

  return 60;
};

module.exports = {
  optimizeSignalTiming
};