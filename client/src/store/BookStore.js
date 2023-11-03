import { makeAutoObservable } from "mobx";

export default class BookStore {
    constructor() {
        this._books = [

            {
                "id": 1,
                "name": "Act like a woman, think like a man",
                "price": 50,
                "rating": 4,
                "img": "860bff26-3319-48df-8bed-d210d3045c20.jpg",
                "description": "Why even the most intelligent, successful and attractive women do not always understand the actions of men and are unhappy in their personal lives? According to the author of this book, the host of a super-popular radio show in the United States devoted to relationships, the problem is that women turn to other women for advice. Although a man knows better how to find and keep a man.",
                "createdAt": "2023-10-12T09:44:59.715Z",
                "updatedAt": "2023-10-12T09:44:59.715Z",
                "genreId": 7,
                "autorId": 5
            },
            {
                "id": 2,
                "name": "The Secret of the Seven Dials",
                "price": 55,
                "rating": 5,
                "img": "02e812a3-0b1d-4777-8a1e-8f9e6421c598.jpg",
                "description": "In the Chimneys country mansion, rented for two years by millionaire Sir Oswald Coote, guests gathered for the weekend. One of the guests, a young \"playboy\", strangely dies. At his body, the alleged killer put seven alarm clocks in a row. After a while, another guest dies, a strange young man who whispered before his death: \"... seven dials... tell Jimmy Thesiger.\"",
                "createdAt": "2023-10-12T09:55:24.948Z",
                "updatedAt": "2023-10-12T09:55:24.948Z",
                "genreId": 1,
                "autorId": 2
            },
            {
                "id": 3,
                "name": "A great cookbook",
                "price": 30,
                "rating": 4,
                "img": "a6b65e88-1783-4a36-ac25-d3b9f70f824f.jpg",
                "description": "In the Chimneys country mansion, rented for two years by millionaire Sir Oswald Coote, guests gathered for the weekend. One of the guests, a young \"playboy\", strangely dies. At his body, the alleged killer put seven alarm clocks in a row. After a while, another guest dies, a strange young man who whispered before his death: \"... seven dials... tell Jimmy Thesiger.\"",
                "createdAt": "2023-10-12T09:59:33.755Z",
                "updatedAt": "2023-10-12T09:59:33.755Z",
                "genreId": 6,
                "autorId": 6
            },
            {
                "id": 5,
                "name": "Long Walk to Freedom",
                "price": 80,
                "rating": 3,
                "img": "180ef8e5-1b8b-449d-ba73-57d88da41cb0.jpg",
                "description": "In his book, Mandela talks about early life, coming of age, getting an education and spending 27 years in prison. During the apartheid era, Mandela was considered a terrorist and was imprisoned on Robben Island for participating in the activities of the ANC. Since then, he has achieved international recognition for uniting the people of South Africa. The last chapters of the book describe the political ascent and the belief that the struggle against apartheid continues.",
                "createdAt": "2023-10-12T10:03:37.599Z",
                "updatedAt": "2023-10-12T10:03:37.599Z",
                "genreId": 2,
                "autorId": 7
            },
            {
                "id": 4,
                "name": "Long Walk to Freedom",
                "price": 80,
                "rating": 3,
                "img": "180ef8e5-1b8b-449d-ba73-57d88da41cb0.jpg",
                "description": "In his book, Mandela talks about early life, coming of age, getting an education and spending 27 years in prison. During the apartheid era, Mandela was considered a terrorist and was imprisoned on Robben Island for participating in the activities of the ANC. Since then, he has achieved international recognition for uniting the people of South Africa. The last chapters of the book describe the political ascent and the belief that the struggle against apartheid continues.",
                "createdAt": "2023-10-12T10:03:37.599Z",
                "updatedAt": "2023-10-12T10:03:37.599Z",
                "genreId": 2,
                "autorId": 7
            }
        ]


        this._genre = [
            {
                "id": 1,
                "name": "Detective",
                "description": "It is based on the investigation of crimes, solving mysteries and riddles",
                "createdAt": "2023-10-11T16:11:55.521Z",
                "updatedAt": "2023-10-11T16:11:55.521Z"
            },
            {
                "id": 2,
                "name": "Autobiography",
                "description": "Books describing the life of an outstanding person",
                "createdAt": "2023-10-11T16:17:37.532Z",
                "updatedAt": "2023-10-11T16:17:37.532Z"
            },
            {
                "id": 3,
                "name": "Fantasy ",
                "description": "It is a genre of speculative fiction involving magical elements, usually set in a fictional universe and usually inspired by mythology or folklore.",
                "createdAt": "2023-10-11T16:19:08.547Z",
                "updatedAt": "2023-10-11T16:19:08.547Z"
            },
            {
                "id": 4,
                "name": "Period Drama",
                "description": "A historical drama (also period drama, period piece or just period) is a dramatic work set in a past time period, usually used in the context of film and television, which presents historical events.",
                "createdAt": "2023-10-11T16:21:06.016Z",
                "updatedAt": "2023-10-11T16:21:06.016Z"
            },
            {
                "id": 5,
                "name": "Romance",
                "description": "The romance genre is a storytelling genre that focuses on love and romantic relationships between two or more characters.",
                "createdAt": "2023-10-11T16:23:03.002Z",
                "updatedAt": "2023-10-11T16:23:03.002Z"
            },
            {
                "id": 6,
                "name": "Cookbooks",
                "description": "containing a description of the preparation of various dishes",
                "createdAt": "2023-10-11T16:24:11.696Z",
                "updatedAt": "2023-10-11T16:24:11.696Z"
            },
            {
                "id": 7,
                "name": "Psychology",
                "description": "is a genre describing methods that have already helped thousands of people overcome depression, anxiety, anger, stress, cravings for alcohol and drugs, difficulties in relationships with other people.",
                "createdAt": "2023-10-12T09:24:34.206Z",
                "updatedAt": "2023-10-12T09:24:34.206Z"
            }
        ]

        this._autors = [
            {
                "id": 1,
                "first_name": "Gaton",
                "last_name": "leroux",
                "createdAt": "2023-10-12T08:15:54.611Z",
                "updatedAt": "2023-10-12T08:15:54.611Z"
            },
            {
                "id": 2,
                "first_name": "Agatha",
                "last_name": "Christie",
                "createdAt": "2023-10-12T08:16:51.050Z",
                "updatedAt": "2023-10-12T08:16:51.050Z"
            },
            {
                "id": 3,
                "first_name": "Ivan",
                "last_name": "Turgenev",
                "createdAt": "2023-10-12T08:18:17.349Z",
                "updatedAt": "2023-10-12T08:18:17.349Z"
            },
            {
                "id": 4,
                "first_name": "Phil",
                "last_name": "Knight",
                "createdAt": "2023-10-12T08:20:19.352Z",
                "updatedAt": "2023-10-12T08:20:19.352Z"
            },
            {
                "id": 5,
                "first_name": "Steve",
                "last_name": "Harvey",
                "createdAt": "2023-10-12T08:20:51.701Z",
                "updatedAt": "2023-10-12T08:20:51.701Z"
            },
            {
                "id": 6,
                "first_name": "William",
                "last_name": "Pokhlebkin",
                "createdAt": "2023-10-12T09:56:56.245Z",
                "updatedAt": "2023-10-12T09:56:56.245Z"
            },
            {
                "id": 7,
                "first_name": "Nelson",
                "last_name": "Mandela",
                "createdAt": "2023-10-12T10:01:36.066Z",
                "updatedAt": "2023-10-12T10:01:36.066Z"
            }
        ]
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