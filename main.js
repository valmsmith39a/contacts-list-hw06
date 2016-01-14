$(document).ready(init);

var arrayOfRowContainersObjectsG=[];
var arrayOfContactsObjectsG=[];
var newContactObjectG; 

function init(){
	initializeLocalStorage(); 
	updateArrayOfRowContainers();
	displayContactsList();
	$('#add-contact-button').on('click', addContactButton);
	$('.contacts-list').on('click', '.delete-button', deleteContactButton);
	$('.contacts-list').on('click', '.edit-button', saveEditsButton);

	$('.contacts-titles').on('click', '.name-output', sortFields);
	$('.contacts-titles').on('click', '.phone-number-output', sortFields);
	$('.contacts-titles').on('click', '.email-output', sortFields);
}

function saveEditsButton(){
	// Get edited contents 
	// Save to array of contacts objects 
	// Update array of row containers 
	// Save to local storage
	var indexOfElementEdited = $(this).closest('.row-container').index();
	debugger;
	console.log('index:', indexOfElementEdited);
  var contact = $(this).closest('.row-container'); 
	var name = contact.find('.name-col').text();
	var phoneNumber = contact.find('.phone-number-col').text();
	var email = contact.find('.email-col').text();	
	var editedContactObject = {
		"name":name,
		"phoneNumber":phoneNumber,
		"email":email
	}
	arrayOfContactsObjectsG.splice(indexOfElementEdited, 1, editedContactObject);
	updateArrayOfRowContainers();
	saveToLocalStorage();
	displayContactsList();
}

function sortFields(event){
  var sortField = $(this).attr('class').split(' ')[1];
	switch(sortField) {
		case 'name-output':
			var sortedArray = arrayOfContactsObjectsG.sort(function(a,b){
				return a.name.localeCompare(b.name);
			});
			updateArrayOfRowContainersForSorting(sortedArray);
			break;
		case 'phone-number-output':
			var sortedArray = arrayOfContactsObjectsG.sort(function(a,b){
				return parseFloat(a.phoneNumber) - parseFloat(b.phoneNumber);
			});
			updateArrayOfRowContainersForSorting(sortedArray);
			break;
		case 'email-output':
			var sortedArray = arrayOfContactsObjectsG.sort(function(a,b){
				return a.email.localeCompare(b.email);
			});
			updateArrayOfRowContainersForSorting(sortedArray);
			break;
		default:
			break;
		}
}

function initializeLocalStorage(){
	if(!localStorage.contactsArray){
		localStorage.contactsArray='[]';
	}
  arrayOfContactsObjectsG=JSON.parse(localStorage.contactsArray);
}

function initializeNewContactObject(name, phoneNumber, email){
	newContactObjectG={
		"name":name,
		"phoneNumber":phoneNumber,
		"email":email
	};
	return newContactObjectG; 
}

function saveToLocalStorage(arrayOfContactsObjects){
	localStorage.contactsArray=JSON.stringify(arrayOfContactsObjectsG);
}

function addContactButton(){
	var name=$('#name-input').val();
  var phoneNumber=$('#phone-number-input').val();
  var email=$('#email-input').val();
  var contactObject=initializeNewContactObject(name, phoneNumber, email);

  arrayOfContactsObjectsG.push(contactObject);
  saveToLocalStorage(arrayOfContactsObjectsG);
  updateArrayOfRowContainers();
  displayContactsList();
}

function deleteContactButton(){
	var indexOfElementToRemove = $(this).closest('.row-container').index();
	arrayOfContactsObjectsG.splice(indexOfElementToRemove,1);
	arrayOfRowContainersObjectsG.splice(indexOfElementToRemove,1);
	saveToLocalStorage(arrayOfContactsObjectsG);
	updateArrayOfRowContainers();
	displayContactsList();
}

function updateArrayOfRowContainers(){
	$('.contacts-list').empty(); 
	arrayOfRowContainersObjectsG.splice(0, arrayOfRowContainersObjectsG.length);

	arrayOfContactsObjectsG.map(function(contact){
		var $rowContainer = $('<div>').addClass('row row-container');
		var $nameColumn = $('<div>').addClass('name-col col-md-2 col-sm-4 col-xs-6').text(contact.name).attr('contenteditable', true);
    $rowContainer.append($nameColumn); 
    var $phoneNumberColumn = $('<div>').addClass('phone-number-col col-md-2 col-sm-4 col-xs-6').text(contact.phoneNumber).attr('contenteditable', true);
		$rowContainer.append($phoneNumberColumn);
		var $emailColumn = $('<div>').addClass('email-col col-md-2 col-sm-4 col-xs-6').text(contact.email).attr('contenteditable', true);
		$rowContainer.append($emailColumn);
    var $deleteButton = $('<div>').addClass('delete-button col-md-2 col-sm-4 col-xs-6');
    var $deleteIcon = $('<i>').addClass('fa fa-trash');
    $deleteButton.append($deleteIcon);
    $rowContainer.append($deleteButton);

    var $editButton = $('<div>').addClass('edit-button col-md-2 col-sm-4 col-xs-6');
    var $editIcon = $('<i>').addClass('fa fa-floppy-o');
    $editButton.append($editIcon);
    $rowContainer.append($editButton);
    
    arrayOfRowContainersObjectsG.push($rowContainer);
	});
}

function displayContactsList(){
	$('.contacts-list').append(arrayOfRowContainersObjectsG);
	$('.input-field').val('');  // Clears all the input fields
}

function updateArrayOfRowContainersForSorting(sortedArray){
	$('.contacts-list').empty(); 
	arrayOfRowContainersObjectsG.splice(0, arrayOfRowContainersObjectsG.length);

	sortedArray.map(function(contact){
		var $rowContainer = $('<div>').addClass('row row-container');
		var $nameColumn = $('<div>').addClass('name-col col-md-2 col-sm-4 col-xs-6').text(contact.name).attr('contenteditable', true);
    $rowContainer.append($nameColumn); 
    var $phoneNumberColumn = $('<div>').addClass('phone-number-col col-md-2 col-sm-4 col-xs-6').text(contact.phoneNumber).attr('contenteditable', true);
		$rowContainer.append($phoneNumberColumn);
		var $emailColumn = $('<div>').addClass('email-col col-md-2 col-sm-4 col-xs-6').text(contact.email).attr('contenteditable', true);
		$rowContainer.append($emailColumn);
    var $deleteButton = $('<div>').addClass('delete-button col-md-2 col-sm-4 col-xs-6');
    var $deleteIcon = $('<i>').addClass('fa fa-trash');
    $deleteButton.append($deleteIcon);
    $rowContainer.append($deleteButton);

    var $editButton = $('<div>').addClass('edit-button col-md-2 col-sm-4 col-xs-6');
    var $editIcon = $('<i>').addClass('fa fa-floppy-o');
    $editButton.append($editIcon);
    $rowContainer.append($editButton);
    
    arrayOfRowContainersObjectsG.push($rowContainer);
	});

	$('.contacts-list').append(arrayOfRowContainersObjectsG);
	$('.input-field').val('');  // Clears all the input fields
}