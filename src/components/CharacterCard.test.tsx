import React from 'react';
import renderer from 'react-test-renderer';
import {CharacterCard} from './CharacterCard';
import { CharacterResponseData } from '../fetch/fetch';
const {data}: {data: CharacterResponseData} = require('../__mocks__/response-mock');

describe('Character card', () => {
  test('Renders correctly', () => {
    const tree = renderer.create(
      <CharacterCard
        item={data.results[0]}
      />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
