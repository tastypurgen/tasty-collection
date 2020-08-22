import React from 'react';
import { useParams } from 'react-router-dom';
import { Container, Form, Button } from 'react-bootstrap';
import { useIntl } from 'react-intl';

import Input from '../../shared/Input';
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from '../../utils/validator';
import useForm from '../../shared/hooks/useForm';

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

  const [formState, inputHandler] = useForm(
    {
      type: {
        value: foundItem.type,
        isValid: true,
      },
      title: {
        value: foundItem.title,
        isValid: true,
      },
      description: {
        value: foundItem.description,
        isValid: true,
      },
      tags: {
        value: foundItem.tags,
        isValid: true,
      },
    },
    true,
  );

  if (!foundItem) {
    return (
      <h2>Not Found</h2>
    );
  }

  const submitHandler = (event) => {
    event.preventDefault();
    let splittedTags = formState.inputs.tags.value;
    if (typeof splittedTags === 'string') {
      splittedTags = splittedTags.split(',').map((tag) => tag.trim());
    }

    // send to back later
    // eslint-disable-next-line no-console
    console.log({
      ...formState.inputs,
      tags: {
        value: splittedTags,
        isValid: true,
      },
    });
  };

  return (
    <Container style={{ maxWidth: '600px' }}>
      <Form onSubmit={submitHandler}>
        <Input
          id="dropdown"
          element="select"
          label={intl({ id: 'NewItem.Collection' })}
          validators={[VALIDATOR_REQUIRE()]}
          errorText={intl({ id: 'NewItem.CollectionError' })}
          onInput={inputHandler}
          initialValue={formState.inputs.type.value}
          initialValid={formState.inputs.type.isValid}
        />
        <Input
          id="title"
          element="input"
          type="text"
          label={intl({ id: 'NewItem.Title' })}
          validators={[VALIDATOR_REQUIRE()]}
          errorText={intl({ id: 'NewItem.TitleError' })}
          onInput={inputHandler}
          initialValue={formState.inputs.title.value}
          initialValid={formState.inputs.title.isValid}
        />
        <Input
          id="description"
          element="textarea"
          label={intl({ id: 'NewItem.Description' })}
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText={intl({ id: 'NewItem.DescriptionError' })}
          onInput={inputHandler}
          initialValue={formState.inputs.description.value}
          initialValid={formState.inputs.description.isValid}
        />
        <Input
          id="tags"
          element="input"
          label={intl({ id: 'NewItem.Tags' })}
          validators={[VALIDATOR_REQUIRE()]}
          errorText={intl({ id: 'NewItem.TagsError' })}
          onInput={inputHandler}
          initialValue={formState.inputs.tags.value}
          initialValid={formState.inputs.tags.isValid}
        />
        <Button
          type="submit"
          variant="info"
          block
          disabled={!formState.isValid}
        >
          {intl({ id: 'NewItem.Submit' })}
        </Button>
      </Form>
    </Container>
  );
}
