import React from 'react';
import {StyleSheet, View, Image, Text} from 'react-native';
import {Character} from '../fetch/fetch';

interface Props {
    item: Character;
}

export function CharacterCard({item}: Props) {
    return (
        <View style={styles.character}>
            <Image
                source={{uri: item.image}}
                style={styles.characterImage}
            />
            <View style={styles.characterInfo}>
                <Text style={styles.characterName}>{item.name}</Text>
                <Text>{item.status}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    character: {
        flexDirection: 'row',
        paddingBottom: 10,
        paddingHorizontal: 5
    },
    characterName: {
        fontSize: 16
    },
    characterImage: {
        width: 100,
        height: 100,
    },
    characterInfo: {
        flexDirection: 'column',
        paddingHorizontal: 5
    }
});
