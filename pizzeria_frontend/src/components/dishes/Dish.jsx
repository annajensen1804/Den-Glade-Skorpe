const Dish = ({ dish }) => {
  return (
    <figure className='dish'>
      <img src={dish.image} alt={dish.title} />
      {dish && <h3>{dish.title}</h3>}
    </figure>
  );
};

export default Dish;
