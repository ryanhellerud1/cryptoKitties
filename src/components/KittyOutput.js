import React from 'react';
const KittyOutput = props => {

  const {birthTime,genes, generation} = props.kittyInfo.kittyData
  const date = birthTime ? new Date(birthTime * 1000).toLocaleDateString('en-US',{year: 'numeric', month: 'long', day: 'numeric'}) : null;
    //const date = new Date(birthTime * 1000);

  return (
  <div>
    <span>Genes</span>
    <p>

      {genes}
    </p>
    <span>Generation</span>
    <p>

      {generation}
    </p>
    <span>Birth Time</span>
    <p>
      {date}
    </p>
      <img style={{width:'400px'}} src={`https://storage.googleapis.com/ck-kitty-image/0x06012c8cf97bead5deae237070f9587f8e7a266d/${props.kittyInfo.kittyID}.svg`} alt=""/>

  </div>
  );
};
export default KittyOutput
