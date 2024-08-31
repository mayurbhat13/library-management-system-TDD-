class Book {
    constructor(identifier, title, author, year) {
        this.identifier = identifier;
        this.title = title;
        this.author = author;
        this.year = year;
        this.available = true;
    }

    toString() {
        return `${this.title} by ${this.author} (${this.year})`;
    }
}

class Library {
    constructor() {
        this.books = new Map();
    }

    addBook(identifier, title, author, year) {
        if (this.books.has(identifier)) {
            throw new Error("Book with this identifier already exists.");
        }
        this.books.set(identifier, new Book(identifier, title, author, year));
    }

    borrowBook(identifier) {
        if (!this.books.has(identifier)) {
            throw new Error("Book not found.");
        }
        const book = this.books.get(identifier);
        if (!book.available) {
            throw new Error("Book is currently borrowed.");
        }
        book.available = false;
    }

    returnBook(identifier) {
        if (!this.books.has(identifier)) {
            throw new Error("Book not found.");
        }
        const book = this.books.get(identifier);
        if (book.available) {
            throw new Error("Book was not borrowed.");
        }
        book.available = true;
    }

    viewAvailableBooks() {
        return Array.from(this.books.values())
            .filter(book => book.available)
            .map(book => book.toString());
    }
}

module.exports = { Library };
