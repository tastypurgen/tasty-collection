import React, { useState, useContext } from 'react';
import { Card, Button, Modal } from 'react-bootstrap';
import { useIntl } from 'react-intl';
import Markdown from 'markdown-to-jsx';

import { Link } from 'react-router-dom';
import ItemTags from './ItemTags';
import { AuthContext } from '../../shared/context/AuthContext';
import { useHttpClient } from '../../shared/hooks/useHttpClient';
import Heart from '../../shared/components/Heart';

import bookImg from './images/book.svg';
import filmImg from './images/film.svg';
import foodImg from './images/food.svg';
import gameImg from './images/game.svg';

export default function ItemItem({
  // eslint-disable-next-line no-unused-vars
  id, image, type, title, description, tags, creatorId, deleteItem, likes, commonList,
}) {
  const [isModalShowed, setIsModalShowed] = useState(false);
  const { sendRequest } = useHttpClient();

  const auth = useContext(AuthContext);
  const intl = useIntl().formatMessage;

  const confirmDelete = () => {
    setIsModalShowed(true);
  };

  const handleClose = () => {
    setIsModalShowed(false);
  };

  const handleDelete = async () => {
    setIsModalShowed(false);
    try {
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/items/${id}`,
        'DELETE',
        null,
        { Authorization: `Bearer ${auth.currentToken}` },
      );
      deleteItem(id);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err.message);
    }
  };

  const mapping = {
    film: filmImg,
    book: bookImg,
    game: gameImg,
    food: foodImg,
  };

  return (
    <>
      <Modal
        show={isModalShowed}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>{intl({ id: 'ItemItem.ModalTitle' })}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {intl({ id: 'ItemItem.ModalBody' })}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-dark" onClick={handleClose}>
            {intl({ id: 'ItemItem.Cancel' })}
          </Button>
          <Button onClick={handleDelete} variant="danger">{intl({ id: 'ItemItem.Delete' })}</Button>
        </Modal.Footer>
      </Modal>

      <Card>
        <Card.Img src={image} alt={title} />
        <Card.Body>

          <Link to={`/items/${id}`}>
            <Card.Title>
              <span>
                <img
                  style={{ width: '15px', marginRight: '0.5rem' }}
                  src={mapping[type]}
                  alt={title}
                />
              </span>
              {title}
            </Card.Title>
          </Link>
          <Card.Text><Markdown>{description}</Markdown></Card.Text>
          <ItemTags tags={tags} />
          {auth.userId && <Heart likes={likes} itemId={id} />}
          {auth.userId === creatorId && !commonList && (
            <Link to={`/items/${id}/edit`}>
              <Button className="mt-1" variant="info" size="sm">{intl({ id: 'ItemItem.Edit' })}</Button>
            </Link>
          )}
          {auth.userId === creatorId && !commonList && (
            <Button onClick={confirmDelete} className="mt-1" variant="danger" size="sm">{intl({ id: 'ItemItem.Delete' })}</Button>
          )}
        </Card.Body>
      </Card>
    </>
  );
}
