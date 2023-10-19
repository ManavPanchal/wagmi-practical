import { useMemo, useState } from 'react';
import './App.css';
import { erc20ABI, useAccount, useConnect } from 'wagmi';
import { Contract } from './utils/contract';
import { owner } from './utils/constant';

function App() {
  const [allowance, setAllowance] = useState(null);
  const { address, isConnected } = useAccount();
  const { connectAsync, connectors } = useConnect();

  const contract = useMemo(
    () => Contract('0x6a1149ea9Cc1812C1282D653D0103AdF9F77eD6d', erc20ABI),
    [],
  );

  const checkAllowance = async () => {
    if (isConnected) {
      const allowance = await contract.read('allowance', [owner, address]);
      setAllowance(Number(allowance));
    }
  };

  const setApprovance = async () => {
    if (isConnected) {
      try {
        if (address === owner)
          await contract.write('approve', [
            '0xd96C9ea9c1D0B253A45a7A77435818078980DDeD',
            '100000000000',
          ]);
        else console.log('please connect with correct wallet account');
      } catch (error) {}
    }
  };

  const handleConnect = async () => {
    try {
      await connectAsync({ connector: connectors[0] });
    } catch (error) {
      console.log('Wallet Connection error');
    }
  };

  return (
    <div className="App">
      <div className="connect-wallet-button">
        <button onClick={handleConnect}>Connect Wallet</button>
      </div>
      <div className="inner-container">
        <div>Wagmi Practical</div>
        <div className="interaction-buttons">
          <button onClick={checkAllowance}>
            {allowance ? allowance : 'Read Approvance'}
          </button>
          <button onClick={setApprovance}>Set Approvance</button>
        </div>
      </div>
    </div>
  );
}

export default App;
