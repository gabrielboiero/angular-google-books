'use strict';

var GoogleBooksPage = function () {

  var searchTerm = element(by.model('vm.search'));
  var updateButton = element(by.buttonText('Update'));
  var bookRepeater = element.all(by.repeater('book in vm.books'));
  var bookNumber = element(by.model('vm.limitBooks'));
  var noBooksMsg = element(by.className("list-group"));
  var realDataCheckbox = element(by.model('vm.useRealData'));

  this.get = function () {
    browser.get('http://localhost:9000/');
  };

  this.searchPresent = function () {
    return searchTerm.isPresent();
  };

  this.setTerm = function (term) {
    searchTerm.clear();
    searchTerm.sendKeys(term);
  };

  this.update = function () {
    updateButton.click();
  };

  this.bookCount = function () {
    return bookRepeater.count();
  };

  this.allResults = function () {
    return bookRepeater;
  };

  this.getBookInputValue = function () {
    return bookNumber.getAttribute('value');
  };

  this.setBookNumber = function (number) {
    bookNumber.clear();
    bookNumber.sendKeys(number);
  };

  this.search = function (term) {
    this.setTerm(term);
    this.update();
  };

  this.noBooksMsg = function () {
    return noBooksMsg.getText();
  };

  this.setRealData = function (newState) {
    var state = realDataCheckbox.isSelected();
    //  newState XOR state
    if( (newState && !state) || (!newState && state) ) {
      realDataCheckbox.click();
    }
  };

};

module.exports = new GoogleBooksPage;

