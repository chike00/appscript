/**
 * Function which runs when the document is open.
 * Creates a menu addon on the top ribbon
 */
function onOpen(){
  var ui = DocumentApp.getUi();
  ui.createMenu("Add ons - Chike")
  .addItem("Pass <b><u> to top", "boldAndUnderlined")
  .addSeparator()
  .addSubMenu(ui.createMenu("Sub / Superscript")
  .addItem("Subscript", "subscript")
  .addItem("Superscript", "superscript")
  )
  .addToUi();
}

/**
 * Function which copies all the lines which are simultaneously
 * bold and underlined to the top of the document
 */
function boldAndUnderlined(){
  var doc = DocumentApp.getActiveDocument();

  //push into an array
  var arr = []

  for(var i = 0; i < doc.getBody().getNumChildren(); i++){
    var atts = doc.getBody().getChild(i).asText().getAttributes();
    atts[DocumentApp.Attribute.BOLD] == true && atts[DocumentApp.Attribute.UNDERLINE] == true ? arr.push(doc.getBody().getChild(i).asText().getText()) : false; 
  }

  console.log(arr.length);
  arr.forEach((element) => console.log(element));

  if(doc.getBody().getChild(0) == ""){

  } else {
    for(x in arr){
      doc.getBody().insertParagraph(0, "\n" + arr[x]);
    }
  }
}

/**
 * Function which turns the highlighted text into subscript.
 */
function subscript(){
  var style = {};
  style[DocumentApp.TextAlignment.SUBSCRIPT]
  DocumentApp.getActiveDocument()
  .getSelection()
  .getRangeElements()[0]
  .getElement()
  .asText()
  .setTextAlignment(DocumentApp.getActiveDocument().getSelection().getRangeElements()[0].getStartOffset(),
  DocumentApp.getActiveDocument().getSelection().getRangeElements()[0].getEndOffsetInclusive(),
  DocumentApp.TextAlignment.SUBSCRIPT);
}

/**
 * Function which turns the highlighted text into superscript.
 */
function superscript(){
  var style = {};
  style[DocumentApp.TextAlignment.SUBSCRIPT]
  DocumentApp.getActiveDocument()
  .getSelection()
  .getRangeElements()[0]
  .getElement()
  .asText()
  .setTextAlignment(DocumentApp.getActiveDocument().getSelection().getRangeElements()[0].getStartOffset(),
  DocumentApp.getActiveDocument().getSelection().getRangeElements()[0].getEndOffsetInclusive(),
  DocumentApp.TextAlignment.SUPERSCRIPT);
}