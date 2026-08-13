import { useLocalStorage } from "@uidotdev/usehooks";
import Swal from "sweetalert2";
import CardItem from "../components/cardItem/CardItem";
import PageHeader from "../components/pageHeader/PageHeader";
import headerImg from "/headerImg.png";
import Button from "../components/button/Button";
import { useCrud } from "../hooks/useCrud";

const Basket = () => {
  const [cardItems, setCardItems] = useLocalStorage("Basket", []);
  const { placeOrder, isLoading } = useCrud();

  // Læg alle linjers pris (pris * antal) sammen til en samlet total.
  const totalPrice = cardItems.reduce(
    (sum, item) => sum + item.price * item.amount,
    0
  );

  const handleOrder = async () => {
    if (cardItems.length === 0) {
      Swal.fire({ icon: "info", title: "Din kurv er tom" });
      return;
    }

    // Byg ordren i det format, API'et forventer.
    const orderData = {
      dishes: cardItems.map((item) => ({
        dish: item.id,
        amount: item.amount,
        size: item.size,
        extraIngredients: item.extraIngredients,
      })),
      comments: "",
      status: "Pending",
      totalPrice,
    };

    try {
      await placeOrder(orderData);
      Swal.fire({
        icon: "success",
        title: "Tak for din bestilling!",
        text: "Vi går straks i gang med at bage.",
      });
      setCardItems([]);
    } catch {
      Swal.fire({
        icon: "error",
        title: "Ups!",
        text: "Din ordre kunne ikke afgives. Prøv igen.",
      });
    }
  };

  return (
    <article>
      <PageHeader title='DEN GLADE' subTitle='SKORPE' headerImg={headerImg} />
      <div className='introText'>
        <h3>Bestilling</h3>
      </div>

      {cardItems.length === 0 ? (
        <p className='empty'>Din kurv er tom.</p>
      ) : (
        <>
          <ul className='basketList'>
            {cardItems.map((item, key) => (
              <CardItem key={key} item={item} />
            ))}
          </ul>
          <div className='basketFooter'>
            <h3>Total: {totalPrice} DKK</h3>
            <Button
              buttonText={isLoading ? "Afgiver ordre..." : "Afgiv ordre"}
              onClick={handleOrder}
            />
          </div>
        </>
      )}
    </article>
  );
};

export default Basket;
