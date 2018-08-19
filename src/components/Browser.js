import React, { Component } from 'react';
import { object } from 'prop-types';
import Web3 from 'web3';
import KittyCoreABI from '../contracts/KittyCoreABI.json';
import { CONTRACT_NAME, CONTRACT_ADDRESS } from '../config';
import Form from '../containers/Form';

class Browser extends Component {
  constructor(props, context) {
    super(props);
    this.state={
      kitties: null
    }
  }

  componentDidMount() {
    const web3 = new Web3(window.web3.currentProvider);

  //  Initialize the contract instance

    const kittyContract = new web3.eth.Contract(
      KittyCoreABI, // import the contracts's ABI and use it here
      CONTRACT_ADDRESS,
    );

  //  Add the contract to the drizzle store

    this.context.drizzle.addContract({
      contractName: CONTRACT_NAME,
      web3Contract: kittyContract,
    });
    this.setState({kitties:kittyContract})
    kittyContract.methods.getKitty(887674).call().then(console.log);
    kittyContract.methods.getKitty(885701).call().then(console.log);
  }

  render() {
    console.log(this.props)
    let kitties = this.state.kitties ? <Form  cryptoKitties = {this.state.kitties}/> : null
    return (
      <div className="browser">
        <h1>
          Kitty Browser
        </h1>
        {kitties}
        {/* Input to type in the kitty ID here */}

        {/* Display Kitty info here */}
      </div>
    );
  }
}

Browser.contextTypes = {
  drizzle: object,
};

export default Browser;

// const mapStateToProps = state => {
//   return {
//     state: state
//   };
// }
//
// export default drizzleConnect(InputField, mapStateToProps);
