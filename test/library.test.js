const { Library } = require('../src/library');


describe('Library Management System',()=>{
    test('should add a new book', () => {
    const library = new Library();
    library.addBook('123', 'Book One', 'Author A', 2021);
    const books = library.viewAvailableBooks();
    expect(books).toContain('Book One by Author A (2021)');
});
    test('should not add a book with duplicate identifier', () => {
    const library = new Library();
    library.addBook('123', 'Book One', 'Author A', 2021);
    expect(() => {
        library.addBook('123', 'Book Two', 'Author B', 2022);
    }).toThrow('Book with this identifier already exists.');
});

test('should borrow a book', () => {
    const library = new Library();
    library.addBook('123', 'Book One', 'Author A', 2021);
    library.borrowBook('123');
    const books = library.viewAvailableBooks();
    expect(books).not.toContain('Book One by Author A (2021)');
});

test('should not borrow an unavailable book', () => {
    const library = new Library();
    library.addBook('123', 'Book One', 'Author A', 2021);
    library.borrowBook('123');
    expect(() => {
        library.borrowBook('123');
    }).toThrow('Book is currently borrowed.');
});

test('should return a borrowed book', () => {
    const library = new Library();
    library.addBook('123', 'Book One', 'Author A', 2021);
    library.borrowBook('123');
    library.returnBook('123');
    const books = library.viewAvailableBooks();
    expect(books).toContain('Book One by Author A (2021)');
});

test('should not return a book that was not borrowed', () => {
    const library = new Library();
    library.addBook('123', 'Book One', 'Author A', 2021);
    expect(() => {
        library.returnBook('123');
    }).toThrow('Book was not borrowed.');
});});

