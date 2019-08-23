function getRequestUrl(query: string, page: number) : string {
    return query 
        ? `https://rickandmortyapi.com/api/character/?name=${query}&page=${page}`
        : `https://rickandmortyapi.com/api/character/?page=${page}`;
}

const responseCache : Record<string, CharacterResponseData[]> = {};

export async function fetchCharacters(query: string, page: number) {
    if (responseCache[query] && responseCache[query][page]) {
        return Promise.resolve(responseCache[query][page]);
    }
    const response = await fetch(getRequestUrl(query, page));
    if (!response.ok) {
        return Promise.reject(
            response.status === 404
                ? await response.json()
                : {error: response.statusText}
        );
    }
    const data = await response.json();
    responseCache[query] = responseCache[query] || [];
    return responseCache[query][page] = data;
}

export interface CharacterResponseData {
    info: ResponseInfo;
    results: Character[];
}

export interface ResponseInfo {
    count: number;
    pages: number;
    next: string;
    prev: string;
}

export interface Character {
    id: number;
    name: string;
    status: string;
    image: string;
}
