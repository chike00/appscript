function freedomt(){
  var gp2 = ""
  var word = DocumentApp.getActiveDocument().getSelection().getRangeElements()[0];
  var preOffset = word.getStartOffset()
  const pO = word.getStartOffset()
  var postOffset = word.getEndOffsetInclusive()  

  var name = word.getElement().asText()

  while(preOffset != postOffset+1){
    var a = word.getElement().asText().getText().charAt(preOffset)
    gp2 += a;
    preOffset++;
  }

  console.log(gp2);
  
  var doc = DocumentApp.create("Freedom Template: " + gp2);

  var url = doc.getUrl()

  name.setLinkUrl(pO, postOffset, url)

  var newDoc = DocumentApp.openByUrl(url)
  newDoc.getBody().setText(DocumentApp.getActiveDocument().getUrl());
}