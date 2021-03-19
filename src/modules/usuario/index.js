import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    
}));

export default function Usuarios(props) {
  const classes = useStyles();
  return (
    <Grid item xs={12} style={{textAlign:'center'}}>
        <Typography variant="h1" component="h2" gutterBottom>
           Virgilio Tolentino Velasco
        </Typography>
        <Typography variant="h1" component="h2" gutterBottom>
            virgiliotolentinovelasco@gmail.com
        </Typography>
        <Typography variant="h1" component="h2" gutterBottom>
            Tel: 9191500801
        </Typography>
    </Grid>
  );
}