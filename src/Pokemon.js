import React,{useState, useEffect} from 'react';
import { Typography, makeStyles, CircularProgress, Button } from '@material-ui/core';
import axios from "axios";


const useStyles = makeStyles({
    h1Content:{
        textTransform:"capitalize",
        textAlign:"center",
    },
    imageContent:{
        display:"block",
        margin:"auto"
    },
    typeContent:{
        textTransform:"capitalize",
        textAlign:"center",
        marginBottom:"20px"
    },
    button:{
        display:"flex",
        justifyContent:"center",
        alignItems:"center"
    }
})
const Pokemon = (props) => {
    const classes = useStyles();
    const [pokemon,setPokemon] = useState(undefined);
    useEffect(() => {
        axios({
            method: "get",
            url: `https://pokeapi.co/api/v2/pokemon/${props.match.params.pokemonId}/`,
            //withCredentials: true
        })
            .then(function (res) {
                //console.log(res)
                const {data} = res;
                setPokemon(data);
            })
            .catch(function (err) {
                setPokemon(false);
                console.log(err);
            });
    }, [props.match.params.pokemonId])


    const generatePokemon=()=>{
        const { id, name, species, height, weight, types, sprites} = pokemon;
        return(
            <React.Fragment>
                {/* {console.log(sprites.front_default)} */}
                <Typography className={classes.h1Content} variant="h1">
                    {`${id}. ${name}`}
                    <img src={sprites.front_shiny} alt=""/>
                </Typography>
                <img src={`https://pokeres.bastionbot.org/images/pokemon/${id}.png`} className={classes.imageContent} alt="" />
                <Typography variant="h3" className={classes.h1Content}>Pokemon Info</Typography>
                <Typography className={classes.h1Content}>
                    {"Species: "}
                    {console.log(species)}
                    <a href={species.url}>{species.name}</a>
                </Typography>
                <Typography className={classes.h1Content}>Height: {height} </Typography>
                <Typography className={classes.h1Content}>Weight: {weight} </Typography>
                <Typography variant="h6" className={classes.h1Content}> Types:</Typography>
                {types.map((typeInfo) => {
                const { type } = typeInfo;
                const { name } = type;
                return <Typography className={classes.typeContent} key={name}> {`${name}`}</Typography>;
                })}
            </React.Fragment>
        );
    }
    return ( 
        <React.Fragment>
            {pokemon === undefined && <CircularProgress/>}
            {pokemon !== undefined && pokemon && generatePokemon()}
            {pokemon === false && <Typography>Pokemon not found</Typography>}
            {pokemon !== undefined && (
                <Button variant="contained" color="primary" style={{justifyContent:"center"}} onClick={()=>props.history.push("/")}>Back to Pokedex</Button>
            )}
        </React.Fragment>
     );
}
 
export default Pokemon;