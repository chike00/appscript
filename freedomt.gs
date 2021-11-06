/**
 * Creates a forward and backwards traversing file path, I guess.
 */
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
  var id = doc.getId()

  name.setLinkUrl(pO, postOffset, url)

  var newDoc = DocumentApp.openByUrl(url)
  newDoc.getBody().setText(DocumentApp.getActiveDocument().getUrl());

  var spreadsheetFile =  DriveApp.getFileById(DocumentApp.getActiveDocument().getId());
  var folderId = spreadsheetFile.getParents().next()

  DriveApp.getFileById(id).moveTo(folderId) 
}

/*
- Gets the link of the current page
- Gets the highlighted text on the current page
- Converts it to a link
- Creates a new page linked to current page
- Writes to new page back-linking to current page

The point is to allow some sort of traversal. The newly created file
serves as a sort of new canvas to explore an idea on a fresh slate, hopefully helping with creativity and clarity by separating a small idea from its larger playground.

Areas for improvement:
NEWLY CREATED FILE SHOULD BE IN SAME FOLDER = DONE

To take this further, for neatness - the new files should check if a folder called "Freedom Templates" exists and if so, it should move the file there.
*/