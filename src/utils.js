export function getQueryString(magnitude, timeframe) {
  let startTime;
  let currentTime = new Date(Date.now());

  // Convert time to query string for API call
  const getTimeString = (time) => {
    return time.toISOString().split(".")[0].split("T").join("%20");
  };
  let endTime = getTimeString(currentTime);

  // Set magnitude to float or 8 if significant
  let minmag = parseFloat(magnitude) || 8;
  
  // Build star time query param
  switch (timeframe) {
    case "hour":
      const hour = new Date(currentTime.getTime() - 1000 * 60 * 60);
      startTime = getTimeString(hour);
      break;
    case "day":
      const day = new Date(currentTime.getTime() - 1000 * 60 * 60 * 24);
      startTime = getTimeString(day);
      break;
    case "week":
      const week = new Date(currentTime.getTime() - 1000 * 60 * 60 * 24 * 7);
      startTime = getTimeString(week);
      break;
    case "month":
      const month = new Date(
        currentTime.getTime() - 1000 * 60 * 60 * 24 * 7 * 4
      );
      startTime = getTimeString(month);
      break;
    case "all-time":
      startTime = "1900-01-01%2000:00:00";
      break;
  }
  return [startTime, endTime, minmag];
}
