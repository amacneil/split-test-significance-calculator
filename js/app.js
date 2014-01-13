App = Ember.Application.create();

App.Router.map(function() {
  // put your routes here
});

App.IndexRoute = Ember.Route.extend({
  model: function() {
    return ['red', 'yellow', 'blue'];
  }
});

App.IndexController = Ember.ObjectController.extend({
  controlVisitors: 10000,
  controlConversions: 50,
  experimentVisitors: 8000,
  experimentConversions: 70,

  totalVisitors: function() {
    return parseInt(this.get('controlVisitors'), 10) + parseInt(this.get('experimentVisitors'), 10);
  }.property('controlVisitors', 'experimentVisitors'),

  totalConversions: function() {
    return parseInt(this.get('controlConversions'), 10) + parseInt(this.get('experimentConversions'), 10);
  }.property('controlConversions', 'experimentConversions'),

  totalControl: function() {
    return parseInt(this.get('controlVisitors'), 10) + parseInt(this.get('controlConversions'), 10);
  }.property('controlVisitors', 'controlConversions'),

  totalExperiment: function() {
    return parseInt(this.get('experimentVisitors'), 10) + parseInt(this.get('experimentConversions'), 10);
  }.property('experimentVisitors', 'experimentConversions'),

  grandTotal: function() {
    return parseInt(this.get('totalControl'), 10) + parseInt(this.get('totalExperiment'), 10);
  }.property('totalControl', 'totalExperiment'),

  chiSquare: function() {
    var a = parseInt(this.get('controlVisitors'), 10);
    var b = parseInt(this.get('controlConversions'), 10);
    var c = parseInt(this.get('experimentVisitors'), 10);
    var d = parseInt(this.get('experimentConversions'), 10);

    var numerator = (a+b+c+d) * Math.pow((a*d) - (b*c), 2);
    var denominator = (a+b)*(c+d)*(b+d)*(a+c);

    return numerator / denominator;
  }.property('controlVisitors', 'controlConversions', 'experimentVisitors', 'experimentConversions'),

  confidence: function() {
    var x = this.get('chiSquare');

    if (x > 10.828) {
      return '99.9%';
    } else if (x > 6.635) {
      return '99%';
    } else if (x > 5.024) {
      return '97.5%';
    } else if (x > 3.841) {
      return '95%';
    } else {
      return 'Not Significant';
    }
  }.property('chiSquare')
});
