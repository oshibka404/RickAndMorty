import React from 'react';
import renderer from 'react-test-renderer';
import { QueryString } from './QueryString';

describe('Query string component', () => {
  test('Renders correctly', () => {
    const tree = renderer.create(
      <QueryString
        isLoading={false}
        query="Betty"
        setQuery={jest.fn()}
      />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
