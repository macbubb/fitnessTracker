const parseID = (urlPath) => {
  const regex = /\//g;

  let ID = urlPath.slice(11);
  let endOfId = ID.search(regex);
  ID = ID.slice(0, endOfId);

  return ID;
};

exports.parseID = parseID;
