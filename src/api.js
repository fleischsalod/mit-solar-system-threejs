const BASIC_URL = 'https://api.le-systeme-solaire.net/rest/bodies/';

const fetchBodyData = (name) => {
  return fetch(BASIC_URL + name)
    .then((data) => data.json())
    .catch((err) => console.log('Error fetching data:', err));
};

export { fetchBodyData };
