import React, { Component, Children } from 'react';
import { drizzleConnect } from 'drizzle-react';
import KittyOutput from '../components/KittyOutput';

class Form extends Component {
  constructor(props, context) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this,this.props.cryptoKitties);
    this.getRandomKitty = this.getRandomKitty.bind(this,this.props.cryptoKitties);
    this.state={
      input: "",
      kittyData: {},
      kittyID: 0,
      totalSupply: 0,
      valid: true
    }
    this.props.cryptoKitties.methods.totalSupply().call().then((totalSupply)=>{
      let randomKittyID = Math.floor(Math.random()*totalSupply) + 1
      this.setState({
        totalSupply: parseInt(totalSupply)
      });
    });
  }
handleChange(input){
  this.setState({input:input.target.value})
}
getRandomKitty(kitty,e){
    e.stopPropagation();
    e.preventDefault();
  kitty.methods.totalSupply().call().then((totalSupply)=>{
    let randomKittyID = Math.floor(Math.random()*totalSupply) + 1
    kitty.methods.getKitty(randomKittyID).call().then((data)=>{
      this.setState({
        kittyData: data,
        kittyID:randomKittyID,
        input:randomKittyID,
        totalSupply: parseInt(totalSupply),
        valid:true
      });
    });
  });
}
handleSubmit( kitty, e){
        e.preventDefault();
  if(this.state.input < 0 || this.state.input > this.state.totalSupply || !/^\d+$/.test(this.state.input)){
    this.setState({ valid:false})
    return false
  }else{
    //  this.props.cryptoKitties.methods.getKitty(this.state.input).call().then(console.log);
        kitty.methods.totalSupply().call().then((totalSupply)=>{
          kitty.methods.getKitty(this.state.input).call().then((data)=>{
            this.setState({
              kittyData: data,
              kittyID:this.state.input,
              totalSupply:parseInt(totalSupply),
              valid:true
            });
        });
      });

  }

}
render(){
  console.log(this.props)
  return(
    <div className="form-container">
      <form onSubmit={this.handleSubmit}>
        <label className="kitty-id" >
          Kitty ID <span className="error">{!this.state.valid ? `Must be a number between 0 and ${this.state.totalSupply}`:null} </span>
          </label>
          <input value={this.state.input} onChange={this.handleChange} type="text"/>
          <input type="submit" value="Find Kitty"/>
          <input value="Random Kitty" onClick={this.getRandomKitty} type="button"/>
      </form>
      <KittyOutput kittyInfo={this.state}/>
    </div>
  )
}
}

export default Form;
