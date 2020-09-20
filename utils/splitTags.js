const splitTags = (tags) => {
  const splittedTags = tags.split(',').map((tag) => tag.trim());

  const uniqTags = new Set();
  splittedTags.forEach((element) => {
    uniqTags.add(element);
  });

  return Array.from(uniqTags);
};

module.exports = splitTags;
