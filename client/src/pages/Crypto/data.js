// import { AiOutlineStar } from 'react-icons/ai';

export const columns = [
  // {
  //   name: '#',
  //   selector: row => (
  //   <>
  //     <AiOutlineStar style={{marginRight: '1rem', cursor: 'pointer'}}/>
  //     {row.market_cap_rank}
  //   </>),
  //   width: "7%",
  // },
  {
    name: 'nom',
    selector: row => (
      <>
        <img src={row.image} alt='btc icon' width={20} style={{marginRight: "0.5rem"}} />
        {`${row.name} ${row.symbol.toUpperCase()}`}
      </>),
    width: "25%",
  },
  {
    name: 'prix',
    selector: row => `${row.current_price} €`,
    width: "15%",
  },
  {
    name: '24h %',
    selector: row => (<span style={{color: row.price_change_percentage_24h < 0 ? 'red' : 'green'}}>{`${row.price_change_percentage_24h} %`}</span>),
    width: "15%",
  },
  // {
  //   name: 'plafond du marché',
  //   // selector: row => row.market_cap,
  //   // width: "15%",
  // },
  // {
  //   name: '7d %',
  //   selector: row => row.evolution,
  // },
  // {
  //   name: 'Cap.Marché',
  //   selector: row => row.evolution,
  // },
  // {
  //   name: 'Volume (24h)',
  //   selector: row => row.evolution,
  // },
  // {
  //   name: 'Offre en circulation',
  //   selector: row => row.evolution,
  // },
];