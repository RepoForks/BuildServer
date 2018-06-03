
const utils = {};

utils.getMissingParams = (body, params) => {
  const missingParams = [];
  for (let i = 0; i < params.length; i += 1) {
    const param = params[i];
    if (!body[param]) {
      missingParams.push(param);
    }
  }
  if (missingParams.length <= 0) {
    return null;
  }
  return `The following parameters are missing: '${missingParams.join('\', \'')}'`;
};

export default utils;
