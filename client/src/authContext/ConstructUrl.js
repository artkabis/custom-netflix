const prefix =
  process.env.NODE_ENV === 'production'
    ? 'https://custom-netflix.herokuapp.com/api/'
    : 'http://localhost:5000/api/';
console.log('url de construction : ', prefix);
const ConstructUrl = (url) => {
  return 'https://custom-netflix.herokuapp.com/api/' + url;
};
export default ConstructUrl;
