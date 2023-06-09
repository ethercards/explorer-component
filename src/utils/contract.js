import { getAddress } from '@ethersproject/address'
import { AddressZero } from '@ethersproject/constants'
import { Contract } from '@ethersproject/contracts'
import { ethers } from 'ethers'

import { abi as ZOOM2_ABI } from '../abi/Zoom2.json';

import {
    ZOOM_2_ADDRESSES
} from '../abi/constants/addresses';


// returns the checksummed address if the address is valid, otherwise returns false
export function isAddress(value) {
    try {
        return getAddress(value)
    } catch {
        return false
    }
}

// account is not optional
function getSigner(library, account) {
    return library.getSigner(account).connectUnchecked();
}

// account is optional
function getProviderOrSigner(library, account) {
    return account ? getSigner(library, account) : library
}

// account is optional
export function getContract(address, ABI, library, account) {
    if (!isAddress(address) || address === AddressZero) {
        throw Error(`Invalid 'address' parameter '${address}'.`)
    }

    return new Contract(address, ABI, getProviderOrSigner(library, account))
}

export const getProvider = (rpcUrl) => {
    return new ethers.providers.JsonRpcProvider(rpcUrl);
};

export function useZoom2Contract(chainId) {
    return getContract(ZOOM_2_ADDRESSES[chainId], ZOOM2_ABI, false);
}