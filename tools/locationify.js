// How many degrees per mile for latitude. This is inaccurate, but good
// enough for test data.
const LAT_MILES = 1 / 69;
// The number of miles per degree of longitude as measuered at the
// equator
const EQUATOR = 69.172;

let conf = {};

// Converts degrees into radians, necessare for some Math functions
const rad = deg => {
  return (deg * Math.PI) / 180;
};

// The miles per degree for longitude changes based on the latitude,
// so it needs to be calculated for each latitude. Of course, this
// is a simple calculation, so very large ranges will not be very
// accurate. Again, it's for test data.
const milesPerDegreeLong = lat => {
  return 1 / (Math.cos(rad(lat)) * EQUATOR);
};

const e = msg => {
  if (!msg) msg = "Locationify error. Please check your inputs.";
  console.log(msg);
};

const setConfig = (pos, range) => {
  conf = {
    lat: { v: pos.lat, DIST: LAT_MILES * range },
    long: { v: pos.long, DIST: Math.abs(milesPerDegreeLong(pos.lat) * range) }
  };
};

const generateCoords = () => {
  const newLat =
    conf.lat.v + (Math.random() * conf.lat.DIST - conf.lat.DIST / 2);
  const newLong =
    conf.long.v + (Math.random() * conf.long.DIST - conf.long.DIST / 2);
  return { latitude: newLat, longitude: newLong };
};

const makeBlankArrayOfRanges = arr => {
  let a = [],
    i;
  for (i = 0; i < arr; i++) {
    a.push(generateCoords());
  }
  return a;
};

const makeRanges = (arr, mapFunc) => {
  if (typeof mapFunc !== "function") {
    mapFunc = (obj, coords) => {
      return { ...obj, ...coords };
    };
  }
  if (Array.isArray(arr)) {
    return arr.map(obj => {
      return mapFunc(obj, generateCoords());
    });
  }
  return mapFunc(arr, generateCoords());
};

// Locationify takes a pos object that holds a lat and a long.
// Arr can take an object for a single set of values to add to,
// and array of objects for multiple generated values to be added
// to, or a number, in which an array of just generated values
// will be returned. The mapFunc takes a function that take the
// values generated and add them to the object itself, returning
// the object. This allows the user to choose where in the object
// they will be added.
const locationify = (pos, arr, range = 10, mapFunc) => {
  if (typeof pos !== "object") return e();
  const lat = pos.lat || pos.latitude;
  if (!lat) return e();
  const long = pos.long || pos.longitude;
  if (!long) return e();
  if (typeof range !== "number") return e();
  setConfig({ lat, long }, range);
  if (!arr) {
    return e();
  } else if (typeof arr === "number") {
    return makeBlankArrayOfRanges(arr);
  }
  return makeRanges(arr, mapFunc);
};

export default locationify;
