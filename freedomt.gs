/**
 * Creates a new file, creating forwards and backwards links to them
 */
function freedomt(){
  //gets highlighted word
  var gp2 = ""
  var word = DocumentApp.getActiveDocument().getSelection().getRangeElements()[0];
  var preOffset = word.getStartOffset()
  const pO = word.getStartOffset()
  var postOffset = word.getEndOffsetInclusive()  

  var name = word.getElement().asText()

  //finalises highlighted word
  while(preOffset != postOffset+1){
    var a = word.getElement().asText().getText().charAt(preOffset)
    gp2 += a;
    preOffset++;
  }

  console.log(gp2);

  var spreadsheetFile =  DriveApp.getFileById(DocumentApp.getActiveDocument().getId()); //gets current folder iterator
  var folderId = spreadsheetFile.getParents().next() //gets current folder - MAY BREAK IF FILE BELONGS IN MULTIPLE FOLDERS. IS THAT POSSIBLE?
  var getFile = DriveApp.getFileById("1hsGgBZQkhKd33gd9GU-YXmXbUHO-Jje_0OAR8qIEls8").makeCopy(); //creates copy of template
  getFile.moveTo(folderId) //moves to current folder
  .setName("Freedom Template: " + gp2); //renames template
  name.setLinkUrl(pO, postOffset, getFile.getUrl()); //sets forward link
  var newDoc = DocumentApp.openByUrl(getFile.getUrl()); //opens template 
  newDoc.getBody().insertParagraph(0, "" + DocumentApp.getActiveDocument().getUrl()); //sets backwards  link
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

Is there a way of allowing a file to look at a root file and get updated on the template format?
E.g. any new file created in this way will sign up to a register to be updated by the original template file, after that any modification to the host file shows up in the new file.

...The only issue is that I don't want it to overwrite what's already there, it'll just be updating the headings mainly.

Security concerns as well. Soon I'm going to start needing to think about securing my drive
*/