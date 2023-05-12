import { Zoom } from 'zoom-next'
import { getTokenUri } from './index';

export const zoomFetchTokenUris = async (contract, zoom2, address) => {
    const nt = await contract.balanceOf(address);

    const ZoomLibraryInstance = new Zoom({ use_reference_calls: true });
    if (nt > 0) {
        const calls = [];
        for (let i = 0; i < nt; i += 1) {
            const tId = ZoomLibraryInstance.addMappingCountCall(
                contract,
                ['tokenOfOwnerByIndex', [address, i]],
                'tokenOfOwnerByIndex(address,uint256) returns (uint256)',
                [{ contract: contract, mapAndParams: ['tokenURI(uint256)', [i]] }],
            );
            calls.push(tId);

            const tUri = ZoomLibraryInstance.addType5Call(
                contract,
                ['tokenURI(uint256)', [i]],
                'tokenURI(uint256) returns (string)',
            );
            calls.push(tUri);
        }
        const ZoomQueryBinary = ZoomLibraryInstance.getZoomCall();
        const combinedResult = await zoom2.combine(ZoomQueryBinary);
        ZoomLibraryInstance.resultsToCache(combinedResult, ZoomQueryBinary);
        const tokenIds = [];
        for (let i = 0; i < nt * 2; i += 2) {
            const id = ZoomLibraryInstance.decodeCall(calls[i]).toString();
            const tokenURI = ZoomLibraryInstance.decodeCall(calls[i + 1]).toString();
            tokenIds.push({ id, tokenURI });
        }

        const newMetadata = [];

        if (tokenIds.length > 0) {
            const promises = [];
            for (var i = 0; i < tokenIds.length; i++) {
                const { id, tokenURI } = tokenIds[i];
                promises.push(new Promise(async (resolve) => {
                    const metadata = await getTokenUri(id, tokenURI);
                    newMetadata.push(metadata);
                    resolve();
                }))
            }
            await Promise.all(promises)
        }

        return newMetadata.sort((a, b) => {
            return Number(a.tokenId) - Number(b.tokenId)
        })
    }
}

export const getTokenIds = async (contract, zoomContract, ownerAddress) => {

    const numberOfTokens = await contract.balanceOf(ownerAddress).catch(e => { return 0 });

    const ZoomLibraryInstance = new Zoom();
    const tokenIds = [];
    const item_identifiers = [];
    let callNum = 0;

    for (let i = 0; i < numberOfTokens; i++) {
        // request the token ID
        const tokenIdCall = ZoomLibraryInstance.addCall(
            // the contract we're calling
            contract,
            // the method that is returing our ID
            ["tokenOfOwnerByIndex", [ownerAddress, i]],
            // signature used to decode the result
            "tokenOfOwnerByIndex(address,uint256) returns (uint256)"
            // array of next method calls that will use the result of this current call
        );
        item_identifiers.push(tokenIdCall);
        callNum++;
    }

    // Prepare the binary call
    const ZoomQueryBinary = ZoomLibraryInstance.getZoomCall();
    const combinedResult = await zoomContract.combine(ZoomQueryBinary);
    ZoomLibraryInstance.resultsToCache(combinedResult, ZoomQueryBinary);

    for (let i = 0; i < callNum; i++) {
        let tokenId = ZoomLibraryInstance.decodeCall(item_identifiers[i]).toString();
        tokenIds.push({ cardID: Number(tokenId) });
    }
    return tokenIds;
};
