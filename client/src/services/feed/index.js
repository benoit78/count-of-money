import { getReq } from "../requests";

export const getFeed = async () => {

  const res = await getReq({
    endpoint: `/feed`,
  })

  return res ? res.data.feed : [];
};