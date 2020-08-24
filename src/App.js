import React,{useState} from 'react';
import { Grid, Typography, Button, Paper} from "@material-ui/core";
import {ThemeProvider,createMuiTheme} from "@material-ui/core";
import { Router, Route, Switch } from 'react-router-dom';
import Pokedex from './Pokedex';
import Pokemon from './Pokemon';

function App() {
    return (
        <Switch>
            <Route exact path="/" component={Pokedex} />
            <Route exact path="/:pokemonId" component={Pokemon} />
        </Switch>
    );
}


export default App;
