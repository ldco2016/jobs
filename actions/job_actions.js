import axios from "axios";
import { Location } from "expo";
import qs from "qs";

import { FETCH_JOBS, LIKE_JOB, CLEAR_LIKED_JOBS } from "./types";
// import locationify from "../tools/locationify";

const JOB_ROOT_URL = "https://authenticjobs.com/api/?";

const JOB_QUERY_PARAMS = {
  api_key: "5634cc46389d0d872723b8c46fba672c",
  method: "aj.jobs.search",
  perpage: "10",
  format: "json"
};

const buildJobsUrl = zip => {
  const query = qs.stringify({ ...JOB_QUERY_PARAMS });
  return `${JOB_ROOT_URL}${query}`;
};

export const fetchJobs = (region, callback) => async dispatch => {
  try {
    let zip = await Location.reverseGeocodeAsync(region);
    const url = buildJobsUrl(zip);
    console.log(url);
    let { data } = await axios.get(url);
    dispatch({ type: FETCH_JOBS, payload: data });
    console.log(data);
    callback();
  } catch (e) {
    console.log(e);
  }
};

export const likedJob = job => {
  return {
    payload: job,
    type: LIKE_JOB
  };
};

export const clearLikedJobs = () => {
  return { type: CLEAR_LIKED_JOBS };
};
