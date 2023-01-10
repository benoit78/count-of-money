import { getReq } from "../requests";

export const getAllCrypto = async () => {
  const res = await getReq({
    endpoint: `/crypto`,
  })

  return res ? res.data : [];
};

export const getCryptoById = async (id) => {
    const res = await getReq({
      endpoint: `/crypto/${id}`,
    })
    return res ? res.data : [];
};