import soda from 'soda-js';

export const getPoints = ({ where = {}, limit = 1000000, offset = 0, order, select } = {}) => {
  let query = new soda.Consumer('data.cdc.gov')
    .query()
    .withDataset('8396-v7yb')
    .limit(limit)
    .offset(offset);
  if (order) {
    query = query.order(order);
  }

  if (select) {
    query = query.select(select);
  }
  Object.keys(where).forEach((key) => (query = query.where({ [key]: where[key] })));

  return new Promise((resolve, reject) => {
    query
      .getRows()
      .on('success', (rows) => resolve(rows))
      .on('error', (error) => reject(error));
  });
};

// export const getPositions = async (stateAndCountry) => {
//   return await Promise.all(
//     stateAndCountry.map(async (item) => {
//       const url = `https://maps.googleapis.com/maps/api/geocode/json?key=${apiKey}&address=${item}`;
//       const { results } = await request(url);
//       return {
//         key: item,
//         position: results ? results[0]?.geometry?.location : null,
//       };
//     }),
//   );
// };
