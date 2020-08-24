import React,{useState} from 'react';
import MockData from "./MockData";
import { Typography, makeStyles } from '@material-ui/core';


const useStyles = makeStyles({
    h1Content:{
        textTransform:"capitalize",
        textAlign:"center"
    },
    imageContent:{
        display:"block",
        margin:"auto"
    }
})
const Pokemon = (props) => {
    const classes = useStyles();
    const [pokemon,setpokemon] = useState(MockData[props.match.params.pokemonId]);
    const { id, name, species, height, weight, types, sprites} = pokemon;
    return ( 
        <React.Fragment>
            {/* {console.log(sprites.front_default)} */}
            <Typography className={classes.h1Content} variant="h1">
                {`${id}. ${name}`}
                <img src={sprites.front_shiny}/>
            </Typography>
            <img src={`https://pokeres.bastionbot.org/images/pokemon/${id}.png`} className={classes.imageContent} />
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
            return <Typography className={classes.h1Content} key={name}> {`${name}`}</Typography>;
            })}
        </React.Fragment>
     );
}
 
export default Pokemon;