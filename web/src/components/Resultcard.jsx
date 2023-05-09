/* eslint-disable react/prop-types */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { Button, Card } from '@mui/material';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { addCartItem } from '../fetcher';

function Resultcard({ name, Lawson }) {
  return (
    <Card
      sx={{ maxWidth: 345 }}
      onClick={() => {
        window.location = `/item?id=${name}`;
      }}
    >
      <CardMedia
        sx={{ height: 140 }}
        image="https://media.istockphoto.com/id/900894088/photo/table-top-view-aerial-image-of-accessories-healthcare-medical-background-concept-several.jpg?s=1024x1024&w=is&k=20&c=VY0ifL0cmPHvK-TCJDza5xcEmFOWulscfUExXd9f7F4="
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Lawson Number:
          {' '}
          {Lawson}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => addCartItem(Lawson, name, 'https://media.istockphoto.com/id/900894088/photo/table-top-view-aerial-image-of-accessories-healthcare-medical-background-concept-several.jpg?s=1024x1024&w=is&k=20&c=VY0ifL0cmPHvK-TCJDza5xcEmFOWulscfUExXd9f7F4=', 'description', [])}>Add to Cart</Button>
      </CardActions>
    </Card>
  );
}

export default Resultcard;
