import React, {useState} from 'react';
import {SafeAreaView} from 'react-native';
import {QueryString} from './components/QueryString';
import {Results} from './components/Results';

export function App() {
    const [query, setQuery] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
  
    return (
        <SafeAreaView>
            <QueryString
                isLoading={isLoading}
                query={query}
                setQuery={setQuery}
            />
            <Results
                query={query}
                setIsLoading={setIsLoading}
            />
        </SafeAreaView>
    );
}
