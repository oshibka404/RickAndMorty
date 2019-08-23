import React from 'react';
import renderer from 'react-test-renderer';
import {Results} from './Results';

describe ('Results list component', () => {
  test('Renders correctly', () => {
    const tree = renderer.create(
      <Results
        setIsLoading={jest.fn()}
        query="Betty"
      />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
