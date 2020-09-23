import React, { useState, useEffect, useContext } from 'react';
import {
  Button, Col, Container, Image, Jumbotron, Modal, Row, Spinner,
} from 'react-bootstrap';
import { Link, useParams, useHistory } from 'react-router-dom';
import { useIntl } from 'react-intl';
import Disqus from 'disqus-react';

import Heart from '../../shared/components/Heart';
import ItemTags from '../component/ItemTags';
import { useHttpClient } from '../../shared/hooks/useHttpClient';
import { AuthContext } from '../../shared/context/AuthContext';

export default function ItemDescription() {
  const { isLoading, sendRequest } = useHttpClient();
  const [loadedItem, setLoadedItem] = useState(null);
  const [isModalShowed, setIsModalShowed] = useState(false);

  const auth = useContext(AuthContext);
  const { itemId } = useParams();
  const intl = useIntl().formatMessage;
  const history = useHistory();

  // const disqusShortname = process.env.REACT_APP_DISQUS_NAME;

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/items/${itemId}`,
        );
        setLoadedItem(responseData.item);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
      }
    };
    fetchItem();
  }, [sendRequest, itemId]);

  if (isLoading || !loadedItem) {
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
        `${process.env.REACT_APP_BACKEND_URL}/items/${loadedItem.id}`,
        'DELETE',
        null,
        { Authorization: `Bearer ${auth.currentToken}` },
      );
      history.push('/');
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

      <Container style={{ maxWidth: '800px' }}>
        <Jumbotron className="text-center" style={{ width: '100%', maxWidth: '800px' }}>

          <Row>
            <Col>
              <div className="right">
                <Image className="mw-100 mb-3" style={{ borderRadius: '5px', maxHeight: '400px' }} src={loadedItem.image} alt={loadedItem.title} />
                {auth.userId && <Heart zoom likes={loadedItem.likes} itemId={loadedItem.id} />}
              </div>
            </Col>

            <Col>
              <div className="left">
                <h2>{loadedItem.title}</h2>
                <h5>{loadedItem.description}</h5>
                <ItemTags tags={loadedItem.tags} />

                {auth.userId === loadedItem.creatorId && (
                  <Link to={`/items/${loadedItem.id}/edit`}>
                    <Button className="m-2" variant="info" size="sm">{intl({ id: 'ItemItem.Edit' })}</Button>
                  </Link>
                )}
                {auth.userId === loadedItem.creatorId && (
                  <Button onClick={confirmDelete} className="m-2" variant="danger" size="sm">{intl({ id: 'ItemItem.Delete' })}</Button>
                )}
              </div>
            </Col>
          </Row>

          <hr />

          {loadedItem && (
            <Disqus.DiscussionEmbed
              shortname="tasty-collection"
              config={{
                url: `https://tastycollection.netlify.app/${loadedItem.id}`,
                identifier: `#${loadedItem.id}`,
                title: loadedItem.title,
              }}
            />
          )}

          {console.log('loadedItem.id: ', loadedItem.id)}
        </Jumbotron>
      </Container>
    </>
  );
}
