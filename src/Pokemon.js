import React from 'react';


const Pokemon = (props) => {
    return ( 
        <div>
            <h1>POKEMON</h1>
            <h2>ID is #{props.match.params.pokemonId}</h2>
        </div>
     );
}
 
export default Pokemon;