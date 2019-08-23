import {fetchCharacters, CharacterResponseData} from './fetch';
const {data}: {data: CharacterResponseData} = require('../__mocks__/response-mock');

describe('Fetching data without search query', () => {
    beforeAll(() => {
        fetchMock.resetMocks();
        fetchMock.mockResponse(JSON.stringify(data));
    });
    test('Fetch first page of all characters', async () => {
        const res = await fetchCharacters('', 1);
        expect(res).toEqual(data);
        expect(fetchMock).toBeCalledTimes(1);
        expect(fetchMock).toBeCalledWith('https://rickandmortyapi.com/api/character/?page=1');
    });
    test('Use cache: don\'t fetch the same page twice', async () => {
        const res1 = await fetchCharacters('', 1);
        const res2 = await fetchCharacters('', 1);
        expect(res1).toEqual(data);
        expect(res2).toEqual(data);
        expect(fetchMock).toBeCalledTimes(1);
    });
    test('Fetch next page', async () => {
        const page1 = await fetchCharacters('', 1);
        const page2 = await fetchCharacters('', 2);
        expect(page1).toEqual(data);
        expect(page2).toEqual(data);
        expect(fetchMock).toBeCalledTimes(2);
        expect(fetchMock).toBeCalledWith('https://rickandmortyapi.com/api/character/?page=2');
    });
});

describe('Fetching search results', () => {
    beforeAll(() => {
        fetchMock.resetMocks();
        fetchMock.mockResponse(JSON.stringify(data));
    });
    test('Search query', async () => {
        const searchResult = await fetchCharacters('rick', 1);
        expect(searchResult).toEqual(data);
        expect(fetchMock).toBeCalledWith('https://rickandmortyapi.com/api/character/?name=rick&page=1');
    });
    test('Cache search results', async () => {
        const searchResult1 = await fetchCharacters('rick', 1);
        const searchResult2 = await fetchCharacters('rick', 1);
        expect(searchResult1).toEqual(data);
        expect(searchResult2).toEqual(data);
        expect(fetchMock).toBeCalledTimes(1);
    });
    test('Fetch search results for another request', async () => {
        const searchResultRick = await fetchCharacters('rick', 1);
        const searchResultMorty = await fetchCharacters('morty', 1);
        expect(searchResultRick).toEqual(data);
        expect(searchResultMorty).toEqual(data);
        expect(fetchMock).toBeCalledTimes(2);
        expect(fetchMock).toBeCalledWith('https://rickandmortyapi.com/api/character/?name=morty&page=1');
    });
});
