export const getTokenUri = async (tokenId, tokenUri) => {
  //console.log(tokenUri)
  const metadata = await fetch(tokenUri)
    .then((res) => res.json())
    .catch((err) => console.error(err));
  if (metadata) {
    if (!metadata.tokenId) {
      metadata.tokenId = tokenId;
    }
    if (!metadata.id) {
      metadata.id = tokenId;
    }
    return metadata;
  } else
    // Fetching metadata fail, return an object anyway
    return {
      tokenId: tokenId,
      id: tokenId
    }
};