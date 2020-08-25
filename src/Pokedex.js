import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Grid, makeStyles, Card, CardContent, CircularProgress, CardMedia, Typography } from "@material-ui/core";
import MockData from "./MockData";
import axios from "axios";

const useStyles = makeStyles({
    pokedexContainer : {
        paddingTop: "20px",
        paddingLeft: "50px",
        paddingRight: "50px"
    },
    cardMedia : {
        margin: "auto"
    },
    cardContent : {
        textTransform: "capitalize",
        textAlign: "center"
    }
})


const Pokedex = (props) => {
    const { history } = props;
    const classes = useStyles();
    const [pokemonData,setPokemonData] = useState({});
    const handleClick = (id) =>{
        //console.log(id,typeof(id))
        history.push(`/${id}`)
    }
    const getPokemonCard = (pokemonid) => {
        //console.log(typeof(pokemonid),typeof(`${pokemonid}`))
        //console.log(pokemonData[pokemonid]);
        const { id, name, sprite } = pokemonData[pokemonid];
        //const sprite = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
        return(
            <Grid item xs={12} sm={4} key={id}>
                <Card onClick={()=>{handleClick(id)}}>
                    <CardMedia className={classes.cardMedia} image={sprite} style={{width:"130px", height:"130px"}} />
                    <CardContent>
                        <Typography className={classes.cardContent}>{`${id}. ${name}`}</Typography>
                    </CardContent>
                </Card>
            </Grid>
        )
    }

    useEffect(() => {
        axios({
            method: "get",
            url: "https://pokeapi.co/api/v2/pokemon?limit=807",
            //withCredentials: true
        })
            .then(function (res) {
                //console.log(res)
                const {data} = res;
                const { results } = data;
                //console.log(results)
                let newPokemonData = {};
                results.forEach((pokemon,index) => {
                    newPokemonData[index+1]={
                        id: index+1,
                        name: pokemon.name,
                        sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index+1}.png`
                    }
                });
                setPokemonData(newPokemonData);
            })
            .catch(function (err) {
                console.log(err);
            });
    }, [])
    
    return ( 
        <React.Fragment>
            <AppBar position="static">
                <Toolbar />
            </AppBar>
            {pokemonData ? (
                <Grid container className={classes.pokedexContainer} spacing={2}>
                    {Object.keys(pokemonData).map(PokemonID => 
                        getPokemonCard(PokemonID)
                    )}
                </Grid>
            ) : (
                <CircularProgress />
            )}
        </React.Fragment>
     );
}
 
export default Pokedex;