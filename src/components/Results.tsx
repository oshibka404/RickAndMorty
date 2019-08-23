import React from 'react';
import {StyleSheet, FlatList, Text, View} from 'react-native';
import {useEffect, useState} from 'react';

import {CharacterCard} from './CharacterCard';
import {fetchCharacters, CharacterResponseData, Character, ResponseInfo} from '../fetch/fetch';

interface Props {
    setIsLoading(isLoading: boolean): void;
    query: string;
}

const DEFAULT_PAGE = 1;
const DEFAULT_CHARACTERS_LIST = [];

export function Results({query, setIsLoading}: Props) {
    const listRef = React.createRef<FlatList<Character>>();
    let [charactersList, setCharactersList] = useState<Character[]>(DEFAULT_CHARACTERS_LIST);
    let [page, setPage] = useState<number>(DEFAULT_PAGE);
    const [error, setError] = useState<string|null>(null);
    const [responseInfo, setResponseInfo] = useState<ResponseInfo>();

    useEffect(function reset() {
        page = DEFAULT_PAGE;
        charactersList = DEFAULT_CHARACTERS_LIST;
        if (listRef.current) {
            listRef.current.scrollToOffset({offset: 0});
        }
    }, [query]);

    useEffect(function getCharacters() {
        setIsLoading(true);
        fetchCharacters(query, page)
            .then((response: CharacterResponseData) => {
                setError(null);
                setCharactersList([...charactersList, ...response.results]);
                setResponseInfo(response.info);
            })
            .catch(({error}) => {
                setError(error);
            })
            .finally(() => {
                setIsLoading(false)
            });
    }, [page, query]);
    
    function nextPage() {
        if (page < responseInfo.pages) {
            setPage(page + 1);
        }
    }

    return (error 
        ? <View style={styles.errorScreen}>
            <Text>{error}</Text>
        </View>
        : <FlatList
            ref={listRef}
            onEndReached={nextPage}
            data={charactersList}
            keyExtractor={keyExtractor}
            renderItem={CharacterCard}
        />
    )
}

const styles = StyleSheet.create({
    errorScreen: {
        justifyContent: 'center',
        alignItems: 'center'
    }
});


function keyExtractor(item: Character) {
    return String(item.id);
}
