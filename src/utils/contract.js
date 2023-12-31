import { readContract, waitForTransaction, writeContract } from '@wagmi/core';

export const Contract = (address, abi) => {
  return {
    read: async (functionName, args = []) => {
      const data = await readContract({
        abi,
        address,
        functionName,
        args,
      });

      return data;
    },
    write: async (functionName, args = []) => {
      const { hash } = await writeContract({
        abi,
        address,
        args,
        functionName,
      });

      const response = await waitForTransaction({ hash });
      return response;
    },
  };
};
