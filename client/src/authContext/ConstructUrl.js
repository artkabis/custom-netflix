const prefix =
  process.env.NODE_ENV === 'production'
    ? 'https://custom-netflix.herokuapp.com/api/'
    : 'http://localhost:5000/api/';
const ConstructUrl = (url) => {
  return prefix + url;
};
export default ConstructUrl;
