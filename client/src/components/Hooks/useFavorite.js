import React from 'react';
import { useUser } from '../../pages/Hooks/useUser';
import { updatedUser } from '../../services/user';
import { getAllCrypto } from '../../services/crypto';

export const useFavorite = () => {

  const [ cryptoList, setCryptoList ] = React.useState([]);
  const { user, setUser } = useUser();

  const loadCrypto = React.useCallback(() => {
    (async () => {

      const _crypotlist = await getAllCrypto();

      const formatCryptoList = _crypotlist.crypto.map((crypto) => {
        return (
          {id: crypto.id,
          name: crypto.name,
          symbol: crypto.symbol,
          image: crypto.image.small,
          current_price: crypto.market_data.current_price.eur,
          price_change_percentage_24h: crypto.market_data.price_change_percentage_24h,
          market_cap_rank: crypto.market_data.market_cap_rank,
          market_cap: crypto.market_data.market_cap.eur,
          total_volume: crypto.market_data.total_volume.eur,
          circulating_supply: crypto.market_data.circulating_supply,
        }
        )
      })

         setCryptoList(formatCryptoList);
          })();
  }, [setCryptoList]);

  React.useEffect(() => {
    const interval = setInterval(() => loadCrypto(), 20000);

    loadCrypto();

    return () => clearInterval(interval);
  }, [loadCrypto]);

  // React.useEffect(() => {
  //   const interval = setInterval(async() => {
  //      const _crypotlist = await getAllCrypto();
  //      const formatCryptoList = _crypotlist.crypto.map((crypto) => {
  //       return (
  //         {id: crypto.id,
  //         name: crypto.name,
  //         symbol: crypto.symbol,
  //         image: crypto.image.small,
  //         current_price: crypto.market_data.current_price.eur,
  //         price_change_percentage_24h: crypto.market_data.price_change_percentage_24h,
  //         market_cap_rank: crypto.market_data.market_cap_rank,
  //         market_cap: crypto.market_data.market_cap.eur,
  //         total_volume: crypto.market_data.total_volume.eur,
  //         circulating_supply: crypto.market_data.circulating_supply,
  //       }
  //       )
  //     })

  //     setCryptoList(formatCryptoList);
  //      }, 30000);
  
  //     return () => clearInterval(interval);
  // }, []);

  const favorite = async (id) => {
    const _user = { ...user };
    const indexList = cryptoList.findIndex((element) => element.id === id);
    const _crypto = user.list.map((element) => element.id === id ? false : true)
    const findIndex = _crypto.findIndex((element) => element === false);
    if(findIndex === -1) {
      _user.list.push(cryptoList[indexList])
      const newUser = await updatedUser(_user._id, _user);
      setUser(newUser);
      window.location.reload();
    }
  }

  return { cryptoList, favorite };
}