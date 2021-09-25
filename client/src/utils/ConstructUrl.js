const prefix =
  process.env.NODE_ENV === 'production'
    ? 'https://streaming-netflix.herokuapp.com/api/'
    : 'http://localhost:5000/api/';
const ConstructUrl = (url) => {
  console.log('url de construction : ', prefix + url);
  return prefix + url;
};
export default ConstructUrl;
