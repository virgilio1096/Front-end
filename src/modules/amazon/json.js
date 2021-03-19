import React from 'react';
import { useState, useEffect, Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Axios from "axios";
import { Grid, Typography } from '@material-ui/core';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import StarIcon from '@material-ui/icons/Star';
import CheckIcon from '@material-ui/icons/Check';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';


const useStyles = makeStyles((theme) => ({
  image: {
    width: 200,
    height: 220
  },
  spacer: {
    flex: '1 1 100%'
  },

}));

export default function Amazon(props) {
  const [data, setData] = useState({});
  function getData(){

    var config = {
      method: 'get',
      url: 'http://localhost:5000/consultar_compleja',
      headers: { }
    };

    Axios(config)
    .then(function (response) {
      if(response.data.length>0){
        console.log(response.data)
        setData(response.data);
      }
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  useEffect(() => {
    getData();
  }, []);

  const classes = useStyles();
  return (
    <Grid>
      {data && (
          <div><pre>{JSON.stringify(data, null, 2) }</pre></div>
      )}
    </Grid>

  );
}