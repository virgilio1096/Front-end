import React, {Suspense, lazy} from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';


const Amazon = lazy(() => import ('../src/modules/amazon/index'));
const Usuarios = lazy(() => import ('../src/modules/usuario/index'));
const Json = lazy(() => import ('../src/modules/amazon/json'));



const AppRoutes = (props) =>
    <Suspense fallback={<div className="progress"><div className="indeterminate"></div></div>}>
        <BrowserRouter>
            <Switch>
                <Route exact path="/amazon/index" component={Amazon}/>
                <Route exact path="/usuario/index" component={Usuarios}/>
                <Route exact path="/amazon/json" component={Json}/>
            </Switch>
        </BrowserRouter>
    </Suspense>
;

export default AppRoutes;
