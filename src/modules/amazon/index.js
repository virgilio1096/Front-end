import React from 'react';
import { useState, useEffect, Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Axios from "axios";
import { Grid, Typography } from '@material-ui/core';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import StarIcon from '@material-ui/icons/Star';
import CheckIcon from '@material-ui/icons/Check';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import InfiniteLoaderBar from '../../components/InfiniteLoaderBar';
import DeleteIcon from '@material-ui/icons/Delete';


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
  const [activeTab, setactiveTab] = useState(0);
  const [loading, setLoading] = useState(false);
  const [idEdit, setidEdit] = useState();
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [alerta, setAlerta] = useState(false);
  function getData(){
    setLoading(true);
    var config = {
      method: 'get',
      url: 'http://localhost:5000/consultar_normal',
      headers: { }
    };

    Axios(config)
    .then(function (response) {
      if(response.data.length>0){
        let date_agroup = restructuredData(response.data);
        setData(date_agroup);
        setMensaje('Registros en la tabla')
        setAlerta(true);
      }else{
        setMensaje('No hay registros')
        setAlerta(true);
        setData([]);
      }
      setLoading(false);
    })
    .catch(function (error) {
      setMensaje('Error al momento de consultar'+error)
      setAlerta(true);
      setLoading(false);
    });
  }
  function descargar_productos(){
    setLoading(true);
    var config = {
      method: 'post',
      url: 'http://localhost:5000/insert',
      headers: { }
    };
    Axios(config)
    .then(function (response) {
      setLoading(false);
      setMensaje('Registros Actualizados con Amazon')
      setAlerta(true);
      getData();
    })
    .catch(function (error) {
      setMensaje('Error al actualizar '+error)
      setAlerta(true);
      setLoading(false);
    });
  }
  function limpiar_tabla(){
    setLoading(true);
    var config = {
      method: 'put',
      url: 'http://localhost:5000/eliminar',
      headers: { }
    };
    Axios(config)
    .then(function (response) {
      console.log(response);
      setLoading(false);
      setMensaje('Registros Eliminados')
      setAlerta(true);
      getData();
    })
    .catch(function (error) {
      setMensaje('Error al eliminar los datos'+error)
      setAlerta(true);
      setLoading(false);
    });
  }
  const changeActiveTab = (event, newActiveTab) => {
    setactiveTab(newActiveTab);
  };
  const restructuredData = (date_agroup) => {
    let agruop = {};
    date_agroup.forEach((categoria) => {
      if (categoria.categoria in agruop) {
        agruop[categoria.categoria] = agruop[categoria.categoria].concat([categoria]);
      } else {
        agruop[categoria.categoria] = [categoria];
      }
    });
    return agruop;
  };
  useEffect(() => {
    getData();
  }, []);
  const handleClose = () => {
    setAlerta(false);
  };

  const classes = useStyles();
  return (
    <Grid>
      <Grid container xs={12}>
        <Grid item xs={12} style={{textAlign:'center'}}>
          <Typography variant="h3" gutterBottom>
            PRODUCTOS MAS VENDIDOS
          </Typography>
        </Grid>
      </Grid>
      {loading &&
          <Grid item xs={12}>
            <div style={{ textAlign: 'center', padding: '1rem 0 0' }}>
              <InfiniteLoaderBar show={loading} />
              <Typography color="secondary" variant="h3">
                {'Cargando'}
              </Typography>
            </div>
          </Grid>
      }
      {data && (
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Tabs
              value={activeTab}
              indicatorColor="primary"
              onChange={changeActiveTab}
              textColor="primary"
              style={{ marginBottom: '1.5rem' }}>
              {Object.keys(data).map((type) => {
                return (
                  <Tab
                    key={type}
                    label={type}
                  />
                );
              })}
            </Tabs>
          </Grid>
        </Grid>
      )}
      {data[Object.keys(data)[activeTab]] && !loading && (
        <Fragment>
          <Grid container spacing={2}>
            {data[Object.keys(data)[activeTab]].map((resource,i) => {
                return (
                  <Grid
                    style={{ display: 'grid', maxWidth: '20%' }}
                    key={i}
                    item xs={12} sm={6} md={4} lg={3} xl={2}>
                    <Grid
                      container
                      spacing={1}
                      className={classes.card}
                      style={resource.status == '1' ? {} : { background: '#f0f0f0' }}>
                        <Grid item xs={12}>
                          <Grid item xs={12} align="center">
                            <img style={{height: '50%', width: '50%' }}src={resource.coverImage} />
                          </Grid>
                          <Grid item xs={12} align="center">
                            <Typography className={classes.subtitle}>{resource.name}</Typography>
                          </Grid>
                          <Grid item xs={12} align="center">
                            <Typography className={classes.subtitle}>{resource.author}</Typography>
                          </Grid>
                          <Grid container justify="space-between">
                            <Grid item>
                              <Typography color="secondary" className={classes.title}>
                                {resource.id}
                              </Typography>
                            </Grid>
                            <Grid item>
                              <Grid container spacing={1}>
                                <Grid item sx={6}>
                                  <Grid container spacing={1}>
                                    <Grid item sx={6}>
                                      <StarIcon></StarIcon>
                                    </Grid>
                                    <Grid item sx={6}>
                                      <Typography className={classes.title}>
                                        {resource.value}
                                      </Typography>
                                    </Grid>
                                  </Grid>
                                </Grid>
                                <Grid item sx={6}>
                                  <Grid container spacing={1}>
                                    <Grid item sx={6}>
                                      <CheckIcon></CheckIcon>
                                    </Grid>
                                    <Grid item sx={6}>
                                      <Typography className={classes.title}>
                                        {resource.total}
                                      </Typography>
                                    </Grid>
                                  </Grid>
                                </Grid>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>      
                    </Grid>
                  </Grid>
                );
              })}
          </Grid>
        </Fragment>
      )}
      <div style={{ position: 'fixed', bottom: '1rem', right: '1rem', zIndex: 99999 }}>
        <Grid container spacing={1}>
          <Grid item xs>
            <Fab disabled={loading} color="primary" onClick={()=>descargar_productos()}>
              <AddIcon />
            </Fab>
          </Grid>
          <Grid item xs>
            <Fab disabled={loading} color="primary" onClick={()=>limpiar_tabla()}>
              <DeleteIcon />
            </Fab>
          </Grid>
        </Grid>
      </div>
      <Snackbar
        open={alerta}
        autoHideDuration={4000}
        onClose={handleClose}
        message={mensaje}
        key={'top' + 'center'}
      />
    </Grid>

  );
}