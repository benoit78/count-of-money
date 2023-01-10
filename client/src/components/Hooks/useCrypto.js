import { useNavigate } from 'react-router-dom';

export const useCrypto = () => {

  const navigate = useNavigate();

  const handleCryptoClick = (row) => {
    navigate(`/crypto/${row.id}`)
  }

  return { handleCryptoClick };
}