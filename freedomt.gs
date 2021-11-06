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
- Backlink directly to highlighted word
>>>>Since I can't make individual words into headers, meaning they don't have their own bespoke links,
I could pass through the information of where the word was in the text file, or maybe this is doing too much. It's
not very future proof considering what happens if I get rid of that bit of text.
- Make it so that new file is in the same directory as old file
*/