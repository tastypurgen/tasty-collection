import React, { useEffect, useState, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import {
  Container, Form, Button, Spinner,
} from 'react-bootstrap';
import { useIntl } from 'react-intl';

import Input from '../../shared/components/Input';
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from '../../utils/validator';
import useForm from '../../shared/hooks/useForm';
import { useHttpClient } from '../../shared/hooks/useHttpClient';
import { AuthContext } from '../../shared/context/AuthContext';

export default function EditItem() {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest } = useHttpClient();
  const [loadedItem, setLoadedItem] = useState(null);

  const intl = useIntl().formatMessage;
  const { itemId } = useParams();
  const history = useHistory();

  const [formState, inputHandler, setFormData] = useForm(
    {
      type: {
        value: '',
        isValid: false,
      },
      title: {
        value: '',
        isValid: false,
      },
      description: {
        value: '',
        isValid: false,
      },
      tags: {
        value: '',
        isValid: false,
      },
    },
    false,
  );

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5501/api/items/${itemId}`,
        );
        setLoadedItem(responseData.item);
        setFormData({
          type: {
            value: responseData.item.type,
            isValid: true,
          },
          title: {
            value: responseData.item.title,
            isValid: true,
          },
          description: {
            value: responseData.item.description,
            isValid: true,
          },
          tags: {
            value: responseData.item.tags,
            isValid: true,
          },
        }, true);
      } catch (err) {
        // eslint-disable-next-line no-console
        console.log(err.message);
      }
    };
    fetchItems();
  }, [sendRequest, itemId, setFormData]);

  const submitHandler = async (event) => {
    event.preventDefault();
    let splittedTags = loadedItem.tags.value;
    if (typeof splittedTags === 'string') {
      splittedTags = splittedTags.split(',').map((tag) => tag.trim());
    }
    try {
      await sendRequest(
        `http://localhost:5501/api/items/${itemId}`,
        'PATCH',
        JSON.stringify({
          type: formState.inputs.type.value,
          title: formState.inputs.title.value,
          description: formState.inputs.description.value,
          tags: splittedTags,
        }),
        {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${auth.currentToken}`,
        },
      );
      history.push(`/${auth.userId}/items`);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err.message);
    }
  };

  if (isLoading) {
    return (
      <Container className="text-center">
        <Spinner
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(50%)',
          }}
          animation="grow"
        />
      </Container>
    );
  }

  if (!loadedItem && !error) {
    return (
      <div className="text-center">
        <h2>Not Found</h2>
      </div>
    );
  }

  return (
    <Container style={{ maxWidth: '600px' }}>
      {!isLoading && loadedItem && (
        <Form onSubmit={submitHandler}>
          <Input
            id="type"
            element="select"
            label={intl({ id: 'NewItem.Collection' })}
            validators={[VALIDATOR_REQUIRE()]}
            errorText={intl({ id: 'NewItem.CollectionError' })}
            onInput={inputHandler}
            initialValue={loadedItem.type}
            initialValid
          />
          <Input
            id="title"
            element="input"
            type="text"
            label={intl({ id: 'NewItem.Title' })}
            validators={[VALIDATOR_REQUIRE()]}
            errorText={intl({ id: 'NewItem.TitleError' })}
            onInput={inputHandler}
            initialValue={loadedItem.title}
            initialValid
          />
          <Input
            id="description"
            element="textarea"
            label={intl({ id: 'NewItem.Description' })}
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText={intl({ id: 'NewItem.DescriptionError' })}
            onInput={inputHandler}
            initialValue={loadedItem.description}
            initialValid
          />
          <Input
            id="tags"
            element="input"
            label={intl({ id: 'NewItem.Tags' })}
            validators={[VALIDATOR_REQUIRE()]}
            errorText={intl({ id: 'NewItem.TagsError' })}
            onInput={inputHandler}
            initialValue={loadedItem.tags[0].value}
            initialValid
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
      )}
    </Container>
  );
}
