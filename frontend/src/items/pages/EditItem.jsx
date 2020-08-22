import React from 'react';
import { useParams } from 'react-router-dom';
import { Container, Form, Button } from 'react-bootstrap';
import { useIntl } from 'react-intl';

import Input from '../../shared/Input';
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from '../../utils/validator';

const ITEMS = [
  {
    id: 'i1',
    type: 'book',
    title: '1984',
    description: 'Exciting book!',
    image: 'https://images-na.ssl-images-amazon.com/images/I/91SZSW8qSsL.jpg',
    tags: ['interesting', 'book', 'dystopia'],
    creatorId: 'u1',
  },
  {
    id: 'i2',
    type: 'book',
    title: 'Flowers for Algernon',
    description: 'My favorite book',
    image: 'https://images-na.ssl-images-amazon.com/images/I/41eDhPsmjbL._SX323_BO1,204,203,200_.jpg',
    tags: ['book', 'fiction'],
    creatorId: 'u2',
  },
  {
    id: 'i3',
    type: 'film',
    title: 'The Shawshank Redemption',
    description: 'The Shawshank Redemption is a 1994 American drama film written and directed by Frank Darabont, based on the 1982 Stephen King novella',
    image: 'https://images-na.ssl-images-amazon.com/images/I/51zUbui%2BgbL.jpg',
    tags: ['drama', 'interesting', 'film', 'fiction'],
    creatorId: 'u1',
  },
];

export default function EditItem() {
  const intl = useIntl().formatMessage;
  const { itemId } = useParams();
  const foundItem = ITEMS.find((item) => item.id === itemId);
  // console.log(foundItem);

  if (!foundItem) {
    return (
      <h2>Not Found</h2>
    );
  }
  return (
    <Container style={{ maxWidth: '600px' }}>
      <Form>
        <Input
          id="dropdown"
          element="select"
          label={intl({ id: 'NewItem.Collection' })}
          validators={[VALIDATOR_REQUIRE()]}
          errorText={intl({ id: 'NewItem.CollectionError' })}
          onInput={() => { }}
          value={foundItem.type}
        />
        <Input
          id="title"
          element="input"
          type="text"
          label={intl({ id: 'NewItem.Title' })}
          validators={[VALIDATOR_REQUIRE()]}
          errorText={intl({ id: 'NewItem.TitleError' })}
          onInput={() => { }}
          value={foundItem.title}
        />
        <Input
          id="description"
          element="textarea"
          label={intl({ id: 'NewItem.Description' })}
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText={intl({ id: 'NewItem.DescriptionError' })}
          onInput={() => { }}
          value={foundItem.description}
        />
        <Input
          id="tags"
          element="input"
          label={intl({ id: 'NewItem.Tags' })}
          validators={[VALIDATOR_REQUIRE()]}
          errorText={intl({ id: 'NewItem.TagsError' })}
          onInput={() => { }}
          value={foundItem.tags}
        />
        <Button
          type="submit"
          variant="info"
          block
          disabled
        >
          {intl({ id: 'NewItem.Submit' })}
        </Button>
      </Form>
    </Container>
  );
}
