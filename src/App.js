import React, {Suspense, lazy} from 'react';
import Dashboard from "./modules/dashboard/index";
import AppRutas from "./routes";
//import Amazon from '../src/modules/amazon/index';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
 } from "react-router-dom";
// const routes = [
//  {
//    path: "/",
//    exact: true,
//    sidebar: () => <div>home!</div>,
//    main: () => <h2>Home</h2>
//  },
//  {
//    path: "/amazon/index",
//    sidebar: () => <div>bubblegum!</div>,
//    main: () => <Amazon/>
//  },
//  {
//    path: "/shoelaces",
//    sidebar: () => <div>shoelaces!</div>,
//    main: () => <h2>Shoelaces</h2>
//  }
// ];

function SidebarExample() {
 return (
  <Dashboard>
    <AppRutas/>
  </Dashboard>
 );
}
export default SidebarExample;