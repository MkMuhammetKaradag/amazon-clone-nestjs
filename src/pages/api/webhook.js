import { buffer } from "micro";
import * as admin from "firebase-admin";

//secure a connection to firebase from the backend
const serviceAccount = require("../../../permissions.json");
const app = !admin.apps.length
  ? admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    })
  : admin.app();

//establish connection to stripe
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const endpointSecret = process.env.STRIPE_SIGNING_SECRET;
const fullfillOrder = async (session) => {
  console.log("Fullfilling order");
  return app
    .firestore()
    .collection("users")
    .doc(session.metadata.email)
    .collection("orders")
    .doc(session.id)
    .set({
      amount: session.amount_total / 100,
      amount_shipping: session.total_details.amount_shipping / 100,
      images: JSON.parse(session.metadata.images),
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
    })
    .then(() => {
      console.log(`Success: Order ${session.id} had been added to the DB`);
    })
    .catch((err) => console.log("lan err:", err.message));
};

export default async (req, res) => {
  if (req.method == "POST") {
    console.log("girdi");
    const requestBuffer = await buffer(req);
    const payload = requestBuffer.toString();
    const sig = req.headers["stripe-signature"];
    let event;
    // verify thet the event posted came from  stripe
    try {
      event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
    } catch (err) {
      console.log("error", err.message);
      return response.status(400).send(`Webhook Error: ${err.message}`);
    }
    // handle the checkout.session.completed event
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      //fullfille the order...
      return fullfillOrder(session)
        .then(() => res.status(200))
        .catch((err) => {
          console.log("errr", err);
          res.status(400).send(`WebHoog Erro: ${err.message}`);
        });
    }
  }
};

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};
