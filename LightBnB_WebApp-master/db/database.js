const properties = require("./json/properties.json");
const users = require("./json/users.json");
const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: 'labber',
  host: 'localhost',
  database: 'lightbnb',
});


const getUserWithEmail = function (email) {
  return pool
  .query(`SELECT * FROM users WHERE email = $1`, [email])
  .then((result) => {
    if (result.rows.length > 0) {
      return result.rows[0];
    } else {
      return null;
    }
  })
  .catch((err) => {
    console.log(err.message);
  });
};


const getUserWithId = function (id) {
    return pool
      .query(`SELECT * FROM users WHERE id = $1`, [id])
      .then((result) => {
        if (result.rows.length > 0) {
          return result.rows[0]; 
        } else {
          return null;
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };


const addUser = function (user) {
  return pool
    .query(
      `INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *`,
      [user.name, user.email, user.password]
    )
    .then((result) => {
      return result.rows[0];
    })
    .catch((err) => {
      console.log(err.message);
    });
};

const getAllReservations = (guest_id, limit = 10) => {
  const query = `
  SELECT * 
  FROM properties
  JOIN reservations ON property_id = properties.id
  WHERE reservations.guest_id = $1
  `;
  return pool
    .query(query, [guest_id, limit])
    .then((result) => result.rows)
    .catch((err) => {
      console.log(err.message);
    });
};


const getAllProperties = function (options, limit = 10) {
  const queryParams = [];
  let queryString = `
    SELECT properties.*, AVG(property_reviews.rating) AS average_rating
    FROM properties
    JOIN property_reviews ON properties.id = property_id
  `;

  const filters = [];
  if (options.city) {
    queryParams.push(`%${options.city}%`);
    filters.push(`city LIKE $${queryParams.length}`);
  }

  if (options.owner_id) {
    queryParams.push(options.owner_id);
    filters.push(`owner_id = $${queryParams.length}`);
  }

  if (options.minimum_price_per_night) {
    queryParams.push(options.minimum_price_per_night * 100);
    filters.push(`cost_per_night >= $${queryParams.length}`);
  }

  if (options.maximum_price_per_night) {
    queryParams.push(options.maximum_price_per_night * 100);
    filters.push(`cost_per_night <= $${queryParams.length}`);
  }
  
  if (filters.length > 0) {
    queryString += ' WHERE ' + filters.join(' AND ');
  }

  if (options.minimum_rating) {
    queryParams.push(options.minimum_rating);
    filters.push(`HAVING AVG(property_reviews.rating) >= $${queryParams.length}`);
  }

  queryParams.push(limit);
  queryString += `
    GROUP BY properties.id
    ORDER BY cost_per_night
    LIMIT $${queryParams.length};
  `;

  console.log(queryString, queryParams);

  return pool.query(queryString, queryParams).then((res) => res.rows);
};


const addProperty = function (property) {
  const queryParams = [
    property.owner_id,
    property.title,
    property.description,
    property.thumbnail_photo_url,
    property.cover_photo_url,
    property.cost_per_night,
    property.street,
    property.city,
    property.province,
    property.post_code,
    property.country,
    property.parking_spaces,
    property.number_of_bathrooms,
    property.number_of_bedrooms,
  ];

  const queryString = `
    INSERT INTO properties (
      owner_id,
      title,
      description,
      thumbnail_photo_url,
      cover_photo_url,
      cost_per_night,
      street,
      city,
      province,
      post_code,
      country,
      parking_spaces,
      number_of_bathrooms,
      number_of_bedrooms
    ) VALUES (
      $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14
    )
    RETURNING *;
  `;

  return pool
    .query(queryString, queryParams)
    .then((result) => result.rows[0])
    .catch((err) => {
      console.log(err.message);
    });
};


module.exports = {
  getUserWithEmail,
  getUserWithId,
  addUser,
  getAllReservations,
  getAllProperties,
  addProperty,
};

