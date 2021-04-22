const axios = require("axios");
const { response } = require("express");

const URL = "https://jobs.github.com/positions.json?description=";

async function getJobs(term) {
  const data = await axios.get(URL + term);
  data.headers["access-control-allow-origin"];
  return data;
}

function printData(data) {
  return data;
}

exports.getJobs = getJobs;
