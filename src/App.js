import { useMemo, useState } from 'react';
import './App.css';
import { erc20ABI } from 'wagmi';
import { Contract } from './utils/contract';

function App() {

  const [hasAllowance, setAllowance] = useState();

  const contract = useMemo(()=> 
    Contract("0x6a1149ea9Cc1812C1282D653D0103AdF9F77eD6d", erc20ABI),
  [erc20ABI, Contract])
  
  const checkAllowance = async () =>{
    const tokenName = await contract.read("name");
    console.log({tokenName});
  }

  return (
    <div className="App">
      <div className='inner-container'>
        <div>
          Wagmi Practical
        </div>
        <div className='interaction-buttons'>
            <button onClick={checkAllowance}>Read Approvance</button>
            <button>Set Approvance</button>
        </div>
      </div>
    </div>
  );
}

export default App;
