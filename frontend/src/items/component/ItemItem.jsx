import React, { useState, useContext } from 'react';
import { Card, Button, Modal } from 'react-bootstrap';
import { useIntl } from 'react-intl';

import { Link } from 'react-router-dom';
import ItemTags from './ItemTags';
import { AuthContext } from '../../shared/context/AuthContext';
import { useHttpClient } from '../../shared/hooks/useHttpClient';

export default function ItemItem({
  // eslint-disable-next-line no-unused-vars
  id, image, type, title, description, tags, creatorId, deleteItem,
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
        `http://localhost:5501/api/items/${id}`,
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
          <Card.Title>{title}</Card.Title>
          <Card.Text>{description}</Card.Text>
          <ItemTags tags={tags} />
          {auth.userId === creatorId && (
            <Link to={`/items/${id}`}>
              <Button className="mt-1" variant="info" size="sm">{intl({ id: 'ItemItem.Edit' })}</Button>
            </Link>
          )}
          {auth.userId === creatorId && (
            <Button onClick={confirmDelete} className="mt-1" variant="danger" size="sm">{intl({ id: 'ItemItem.Delete' })}</Button>
          )}
        </Card.Body>
      </Card>
    </>
  );
}
