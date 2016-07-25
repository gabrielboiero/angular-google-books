'use strict';


var page = require('./search.po');

describe('Google Books page loaded test', function () {

  //  verify page loaded, finding one element
  it('Should show search page', function () {
    page.get();
    expect(page.searchPresent()).toBe(true);
  });

});


describe('Book search results with default term', function () {

  beforeEach(function () {
    page.get();
  });

  it('Should show default items quantity or less in results', function () {
    page.update();
    expect(page.bookCount()).not.toBeGreaterThan(page.getBookInputValue());
  });

  it('Should show less than default items in result', function () {
    page.setBookNumber(5);
    page.update();
    expect(page.bookCount()).toEqual(5);
  });

  it('Should show empty item list in results and a message', function () {
    page.setBookNumber(0);
    page.update();
    expect(page.bookCount()).toEqual(0);
    expect(page.noBooksMsg()).toEqual('No books');
  });

  it('Show empty results with negative numbers', function () {
    page.setBookNumber(-1);
    page.update();
    expect(page.bookCount()).toEqual(0);
    expect(page.noBooksMsg()).toEqual('No books');
  });

  it('Show more items than default in results', function () {
    page.setBookNumber(15);
    page.update();
    expect(page.bookCount()).toEqual(15);
  });

  it('Show no results on erroneous quantity format', function () {
    page.setBookNumber("1a");
    page.update();
    expect(page.bookCount()).toEqual(0);
    expect(page.noBooksMsg()).toEqual('No books');
  });

});


describe('Book search with non-default term', function () {

  beforeEach(function () {
    page.get();
    page.setRealData(true);
    page.search('history');
  });

  it('Can perform search with term "history"', function () {
    expect(page.bookCount()).not.toBeGreaterThan(page.getBookInputValue());
  });

  it('Contains term "history" either in title or description', function () {
    var allResults = page.allResults().reduce(function (acc, bookRow) {
      return bookRow.getText().then(function(text) {
        return acc && (text.includes("history") || text.includes("History"));
      });
    }, true);
    expect(allResults).toBe(true);
  });

  it('Should show less than default items in result', function () {
    page.setBookNumber(5);
    page.update();
    expect(page.bookCount()).toEqual(5);
  });

  it('Should show empty item list in results and a message', function () {
    page.setBookNumber(0);
    page.update();
    expect(page.bookCount()).toEqual(0);
    expect(page.noBooksMsg()).toEqual('No books');
  });

});


describe('Results layout with real data', function () {

  beforeEach(function () {
    page.get();
    page.setRealData(true);
    page.search('life');
  });

  it('All results contains Author label', function () {
    var allResults = page.allResults().reduce(function (acc, bookRow) {
      return bookRow.getText().then(function(text) {
        return acc && text.includes("Authors:");
      });
    }, true);
    expect(allResults).toBe(true);
  });

  it('Contains thumbnail in each result', function () {
    var allResults = element.all(by.repeater('book in vm.books'));
    var allResults = page.allResults().reduce(function (acc, bookRow) {
      return acc & bookRow.element(by.tagName("img")).isDisplayed();
    }, true);
  });

  it('All results contains Title label', function () {
    var allResults = page.allResults().reduce(function (acc, bookRow) {
      return bookRow.getText().then(function(text) {
        return acc && text.includes("Title:");
      });
    }, true);
    expect(allResults).toBe(true);
  });

  it('All results contains Description label', function () {
    var allResults = page.allResults().reduce(function (acc, bookRow) {
      return bookRow.getText().then(function(text) {
        return acc && text.includes("Description:");
      });
    }, true);
    expect(allResults).toBe(true);
  });

});


describe('Use of mock data', function () {

  it('Should return results always', function () {
    page.get();
    page.setRealData(false);
    page.update();

    expect(page.bookCount()).not.toBeGreaterThan(page.getBookInputValue());
  });

});


