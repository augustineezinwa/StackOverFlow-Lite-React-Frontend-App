
const findData = (dataResource, resourceField, resourceId, neededData) => {
  const result = dataResource.find(x => +x[resourceField] === +resourceId);
  return result[neededData];
}

export default findData;
