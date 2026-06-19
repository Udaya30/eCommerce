import seedProducts from "./products.seed";
import seedMerchant from "./payment.seed";

async function run() {
  await seedMerchant();
  await seedProducts();
}

run().catch(console.error);