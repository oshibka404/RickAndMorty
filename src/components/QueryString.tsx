import React from 'react';
import {StyleSheet, View, TextInput, ActivityIndicator} from 'react-native';

interface Props {
    query: string;
    setQuery(q: string): void;
    isLoading: boolean;
}

export function QueryString({query, setQuery, isLoading} : Props) {
    return (
        <View style={styles.header}>
            <TextInput
                placeholder='Search character by name'
                returnKeyType='search'
                style={styles.search}
                clearButtonMode='while-editing'
                onChangeText={setQuery}
                value={query}
            />
            {isLoading && <ActivityIndicator />}
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        borderColor: '#ccc',
        borderBottomWidth: 1,
        paddingHorizontal: 5
    },
    search: {
        height: 40,
        flex: 1
    }
});
