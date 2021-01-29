/* eslint-disable no-loop-func */
/* eslint-disable prefer-template */
/* eslint-disable indent */
/* eslint-disable no-plusplus */
/* eslint-disable prefer-const */
/* eslint-disable prefer-destructuring */
// const express = require('express');
// const app = express();
// const port = 2800;
// const bodyParser = require('body-parser');
// const path = require('path');
const db = require('./database.js');
const fakeData = require('./dummydatagenerator.js');

const getFormattedDate = (data) => {
  let product_id = data[0].product_id;
  // console.log(data[0].product_id)

  let rate1 = 0;
  let rate2 = 0;
  let rate3 = 0;
  let rate4 = 0;
  let rate5 = 0;
  let difficulty1 = 0;
  let difficulty2 = 0;
  let difficulty3 = 0;
  let difficulty4 = 0;
  let difficulty5 = 0;
  let experience1 = 0;
  let experience2 = 0;
  let experience3 = 0;
  let experience4 = 0;
  let experience5 = 0;
  let value1 = 0;
  let value2 = 0;
  let value3 = 0;
  let value4 = 0;
  let value5 = 0;
  let recommend = 0;

  for (const i of data) {
    switch (i.overall_rate) {
      case 5: rate5++;
        break;
      case 4: rate4++;
        break;
      case 3: rate3++;
        break;
      case 2: rate2++;
        break;
      case 1: rate1++;
        break;
    }
    switch (i.level_difficulty) {
      case 5: difficulty5++;
        break;
      case 4: difficulty4++;
        break;
      case 3: difficulty3++;
        break;
      case 2: difficulty2++;
        break;
      case 1: difficulty1++;
        break;
    }
    switch (i.value_for_money) {
      case 5: value5++;
        break;
      case 4: value4++;
        break;
      case 3: value3++;
        break;
      case 2: value2++;
        break;
      case 1: value1++;
        break;
    }
    switch (i.play_experience) {
      case 5: experience5++;
        break;
      case 4: experience4++;
        break;
      case 3: experience3++;
        break;
      case 2: experience2++;
        break;
      case 1: experience1++;
        break;
    }
    switch (i.recommend) {
      case 1: recommend++;
        break;
    }
  }
//
  let rating = ((5 * rate5 + 4 * rate4 + 3 * rate3 + 2 * rate2 + 1 * rate1) / data.length).toFixed(1);
  let difficulty = ((5 * difficulty5 + 4 * difficulty4 + 3 * difficulty3 + 2 * difficulty2 + 1 * difficulty1) / data.length).toFixed(1);
  let experience = ((5 * experience5 + 4 * experience4 + 3 * experience3 + 2 * experience2 + 1 * experience1) / data.length).toFixed(1);
  let value = ((5 * value5 + 4 * value4 + 3 * value3 + 2 * value2 + 1 * value1) / data.length).toFixed(1);
  // eslint-disable-next-line prefer-template
  let recommendToOther = Math.floor((recommend / data.length) * 100) + '%';
  let ratePercentage1 = Math.floor((rate1 / data.length) * 100) + '%';
  let ratePercentage2 = Math.floor((rate2 / data.length) * 100) + '%';
  let ratePercentage3 = Math.floor((rate3 / data.length) * 100) + '%';
  let ratePercentage4 = Math.floor((rate4 / data.length) * 100) + '%';
  let ratePercentage5 = Math.floor((rate5 / data.length) * 100) + '%';

  // console.log(ratePercentage2)
  return {
    'rating': rating,
    'difficulty': difficulty,
    'experience': experience,
    'value_money': value,
    'rate1': rate1,
    'rate2': rate2,
    'rate3': rate3,
    'rate4': rate4,
    'rate5': rate5,
    'ratePercentage1': ratePercentage1,
    'ratePercentage2': ratePercentage2,
    'ratePercentage3': ratePercentage3,
    'ratePercentage4': ratePercentage4,
    'ratePercentage5': ratePercentage5,
    'recommendToOther': recommendToOther,
    'number_review': data.length,
    'product_id': product_id
  };
};

// app.get('/fakedata', (req, res) => {
  // console.log(req.params.id);
  // });
  // app.post('/fakedata', (req, res) => {
    const allData = [
      fakeData.generateUsers(),
      fakeData.generateProducts(),
      fakeData.generateReviews()
    ];
    db.insertData(allData, (err, results) => {
      if (err) {
        console.log(err);
      }
    });
  // });
  for (let i = 1; i <= 5; i++) {
    db.getReviewsData(i, (err, results) => {
      if (err) {
        console.log(err);
      } else {
        const overallData = getFormattedDate(results);
        // console.log(overallData)
        db.insertOverall(overallData, (error, result) => {
          if (error) {
            console.log(error);
          }
        });
      }
    });
  }
  // app.listen(port, () => {
  //   console.log(`Example app listening at http://localhost:${port}`);
  // });