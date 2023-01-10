// export const getFeed = async () => {

import { getToken } from "../authentification";
import { getReq, patchReq, deleteReq } from "../requests";

//   const res = await getReq({
//     endpoint: `/:userId`,
//   })

//   return res ? res.data.feed : [];
// };

export const getUserById = async (idUser) =>{
  const res = await getReq({
    endpoint: `/users/${idUser}`,
    token: getToken(),
  })

  return res ? res.data.user : [];
}

export const updatedUser = async (userId, data) =>{
  const res = await patchReq({
    endpoint: `/users/${userId}`,
    token: getToken(),
    data: data
  })

  return res ? res.data.updated : [];
}

export const getAllUsers = async () => {
  const res = await getReq({
    endpoint: `/users/allUsers`,
    token: getToken(),
  })

  return res ? res.data.users : [];
}

export const deleteUserById = async (userId) =>{
  const res = await deleteReq({
    endpoint: `/users/${userId}`,
    token: getToken(),
  })

  return res ? res.data.deleted : [];
}