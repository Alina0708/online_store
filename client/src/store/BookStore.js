import { makeAutoObservable } from "mobx";

export default class BookStore {
    constructor() {
        this._books = []
        this._genre = []
        this._autors = []
        this._selectedGenre = {};
        this._selectedAutors = {};
        makeAutoObservable(this)
    }

    setBooks(books) {
        this._books = books;
    }

    setGenre(genre) {
        this._genre = genre;
    }

    setAutors(autors) {
        this._autors = autors;
    }

    setSelectedGenre(genre) {
        this._selectedGenre = genre;
    }
    setSelectedAutors(autors) {
        this._selectedAutors = autors;
    }

    get books() {
        return this._books;
    }

    get genre() {
        return this._genre;
    }

    get autors() {
        return this._autors;
    }

    getSelectedGenre() {
        return this._selectedGenre;
    }
    getSelectedAutors() {
        return this._selectedAutors;
    }
}