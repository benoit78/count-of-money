export const columns = [
  {
    name: '#',
    selector: row => row.market_cap_rank,
    width: "10%",
  },
  {
    name: 'nom',
    selector: row => (
      <>
        <img src={row.image} alt='btc icon' width={20} style={{marginRight: "0.5rem"}} />
        {`${row.name} ${row.symbol.toUpperCase()}`}
      </>),
    width: "40%",
  },
  {
    name: 'prix',
    selector: row => `${row.current_price} €`,
    width: "30%",
  },
  {
    name: '24h %',
    selector: row => (<span style={{color: row.price_change_percentage_24h < 0 ? 'red' : 'green'}}>{`${row.price_change_percentage_24h} %`}</span>),
    width: "20%",
  },
];

export const data = [
  {
    id: 1,
    name: 'Beetlejuice',
    price: '1988',
    evolution: '15%',
  },
  {
    id: 2,
    name: 'Beetlejuice',
    price: '1988',
    evolution: '15%',
  },
  {
    id: 3,
    name: 'Beetlejuice',
    price: '1988',
    evolution: '15%',
  },
  {
    id: 4,
    name: 'Beetlejuice',
    price: '1988',
    evolution: '15%',
  },
  {
    id: 5,
    name: 'Beetlejuice',
    price: '1988',
    evolution: '15%',
  },
]