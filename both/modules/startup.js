let startup = () => {
  _addPrototypes();
};

let _addPrototypes = () => {
 /* Array.prototype.average = function () {
    var sum = 0, j = 0;
    for (var i = 0; i < this.length, isFinite(this[i]); i++) {
      sum += parseFloat(this[i]); ++j;
    }
    return j ? sum / j : 0;
  };*/
};

Modules.both.startup = startup;
