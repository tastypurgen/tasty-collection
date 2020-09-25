import React, { useState } from 'react';
import { InstantSearch, SearchBox, Hits } from 'react-instantsearch-dom';
import algoliasearch from 'algoliasearch';
import { Link } from 'react-router-dom';

const searchClient = algoliasearch(
  process.env.REACT_APP_ALGOLIA_ID,
  process.env.REACT_APP_ALGOLIA_KEY,
);

const client = algoliasearch(process.env.REACT_APP_ALGOLIA_ID, process.env.REACT_APP_ALGOLIA_KEY);

const index = client.initIndex(process.env.REACT_APP_ALGOLIA_NAME);

fetch(`${process.env.REACT_APP_BACKEND_URL}/items/all`)
  .then((response) => response.json())
  .then((items) => {
    index.clearObjects();
    return items;
  })
  .then(({ items }) => index.saveObjects(items, {
    autoGenerateObjectIDIfNotExist: true,
  }));

export default function Search() {
  const [searchInput, setSearchInput] = useState('');

  const Hit = ({ hit }) => (
    <Link to={`/items/${hit.id}`} onClick={() => setSearchInput('')}>
      <div className="hit">
        <div className="hit-image">
          <img style={{ width: '50%' }} src={hit.image} alt="" />
        </div>
        <div className="hit-content">
          <div className="hit-name">
            {hit.title}
          </div>
          <div className="hit-desc">
            {hit.description}
          </div>
        </div>
      </div>
    </Link>
  );

  const handleSearch = (event) => {
    setSearchInput(event.target.value);
  };

  return (

    <InstantSearch
      indexName={process.env.REACT_APP_ALGOLIA_NAME}
      searchClient={searchClient}
    >
      <SearchBox
        translations={{ placeholder: '...' }}
        onChange={handleSearch}
        value={searchInput}
      />
      {searchInput && <Hits hitComponent={Hit} />}
    </InstantSearch>
  );
}
