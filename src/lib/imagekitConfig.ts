import ImageKit from "imagekit";
const imagekit = new ImageKit({
  publicKey: process.env.NEXT_PUBLIC_PUBLICKEY!,
  privateKey: process.env.NEXT_PUBLIC_IKPRIVATEKEY!,
  urlEndpoint: process.env.NEXT_PUBLIC_URLENDPOINT!,
});

export default imagekit;
