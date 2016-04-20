Template.AnalysisGraphs.onRendered(() =>{
  Modules.client.drawAnalysisGraphs(this.data.ppr, this.find('#ppr_chart'));
});
