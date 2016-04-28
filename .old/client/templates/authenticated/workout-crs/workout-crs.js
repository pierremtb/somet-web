Template.WorkoutCRs.helpers({});

Template.WorkoutCRs.onRendered(function () {
  $(document).ready(() => {
    var circle_crten_eff = Circles.create({
      id: 'circle_crten_eff',
      radius: 30,
      value: wk.get().cr.effort,
      maxValue: 10,
      width: 5,
      text: function (value) {
        return value;
      },
      colors: [getCRBackColor(wk.get().cr.effort), getCRFrontColor(wk.get().cr.effort)],
      duration: null,
      wrpClass: 'circles-wrp',
      textClass: 'circles-text',
      valueStrokeClass: 'circles-valueStroke',
      maxValueStrokeClass: 'circles-maxValueStroke',
      styleWrapper: true,
      styleText: true
    });
    var circle_crten_ple = Circles.create({
      id: 'circle_crten_ple',
      radius: 30,
      value: wk.get().cr.pleasure,
      maxValue: 10,
      width: 5,
      text: function (value) {
        return value;
      },
      colors: [getCRBackColorRev(wk.get().cr.pleasure), getCRFrontColorRev(wk.get().cr.pleasure)],
      duration: null,
      wrpClass: 'circles-wrp',
      textClass: 'circles-text',
      valueStrokeClass: 'circles-valueStroke',
      maxValueStrokeClass: 'circles-maxValueStroke',
      styleWrapper: true,
      styleText: true
    });
    var sensa = Circles.create({
      id: 'sensa',
      radius: 30,
      value: wk.get().cr.sensations,
      maxValue: 10,
      width: 5,
      text: function (value) {
        return value;
      },
      colors: [getCRBackColorRev(wk.get().cr.sensations), getCRFrontColorRev(wk.get().cr.sensations)],
      duration: null,
      wrpClass: 'circles-wrp',
      textClass: 'circles-text',
      valueStrokeClass: 'circles-valueStroke',
      maxValueStrokeClass: 'circles-maxValueStroke',
      styleWrapper: true,
      styleText: true
    });
    var hum = Circles.create({
      id: 'hum',
      radius: 30,
      value: wk.get().cr.mood,
      maxValue: 10,
      width: 5,
      text: function (value) {
        return value;
      },
      colors: [getCRBackColorRev(wk.get().cr.mood), getCRFrontColorRev(wk.get().cr.mood)],
      duration: null,
      wrpClass: 'circles-wrp',
      textClass: 'circles-text',
      valueStrokeClass: 'circles-valueStroke',
      maxValueStrokeClass: 'circles-maxValueStroke',
      styleWrapper: true,
      styleText: true
    });
    $('.modal-trigger').leanModal();
  });
});

function getPercentAndColor(c) {
  var color = c < 3 ? "green" : c < 7 ? "orange" : "red";
  var percent = c > 0 && c < 11 ? c * 10 : 10;
  return percent + " " + color + "-circle";
}

function getCRBackColor(c) {
  return c < 3 ? "#A5D6A7" : c < 7 ? "#FFF59D" : "#EF9A9A";
}

function getCRFrontColor(c) {
  return c < 3 ? "#4CAF50" : c < 7 ? "#FFEB3B" : "#F44336";
}
function getCRBackColorRev(c) {
  return c < 3 ? "#EF9A9A" : c < 7 ? "#FFF59D" : "#A5D6A7";
}

function getCRFrontColorRev(c) {
  return c < 3 ? "#F44336" : c < 7 ? "#FFEB3B" : "#4CAF50";
}
function getPercentAndColorReverse(c) {
  var color = c < 3 ? "red" : c < 7 ? "orange" : "green";
  var percent = c > 0 && c < 11 ? c * 10 : 10;
  return percent + " " + color + "-circle";
}
