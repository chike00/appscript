/**
 * Builds a menu, to allow a new template to be made
 */
function onOpen() {
  DocumentApp.getUi()
      .createMenu('Freedom Template')
      .addItem('Create new Template', 'freedomt')
      .addToUi();
}

/**
 * Creates a new templated file, creating forwards and backwards links to them
 */
function freedomt(){
  //gets highlighted word
  var highlightedWordstr = ""
  var word = DocumentApp.getActiveDocument().getSelection().getRangeElements()[0];
  var preOffset = word.getStartOffset()
  const pO = word.getStartOffset()
  var postOffset = word.getEndOffsetInclusive()  

  var name = word.getElement().asText()

  //finalises highlighted word
  while(preOffset != postOffset+1){
    var a = word.getElement().asText().getText().charAt(preOffset)
    highlightedWordstr += a;
    preOffset++;
  }

  console.log(highlightedWordstr);

  var docsFile =  DriveApp.getFileById(DocumentApp.getActiveDocument().getId()); //gets current folder iterator
  var folderId = docsFile.getParents().next() //gets current folder - MAY BREAK IF FILE BELONGS IN MULTIPLE FOLDERS. IS THAT POSSIBLE?
  var getFile = DriveApp.getFileById("1hsGgBZQkhKd33gd9GU-YXmXbUHO-Jje_0OAR8qIEls8").makeCopy(); //creates copy of template
  getFile.moveTo(folderId) //moves to current folder
    .setName("Freedom Template: " + highlightedWordstr); //renames template
  name.setLinkUrl(pO, postOffset, getFile.getUrl()); //sets forward link
  var newDoc = DocumentApp.openByUrl(getFile.getUrl()); //opens template 
  newDoc.getBody().insertParagraph(0, "" + DocumentApp.getActiveDocument().getUrl()); //sets backwards  link
}

"""
When I was installing CloudConvert, it had a slightly different set of permissions to mine. It said it will allow it to: "See, edit, create, and delete only the specific Google Drive files you use with this app"

Whereas mine seemed to give it all the power in the world. How do I get my permissions to do this
"""