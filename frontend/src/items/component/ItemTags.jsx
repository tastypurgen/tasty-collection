import React from 'react';
import { Badge } from 'react-bootstrap';

export default function ItemTags({ tags }) {
  return (
    <div>
      {tags.map((tag) => (
        <Badge
          pill
          variant="secondary"
          key={tag.value}
          style={{ marginRight: '3px' }}
        >
          {tag.value}
        </Badge>
      ))}
    </div>
  );
}
