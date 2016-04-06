Template.AnalysisGraphs.onRendered(function(){
  Modules.client.drawAnalysisGraphs(this.data.ppr, this.find('#ppr_chart'));
});
