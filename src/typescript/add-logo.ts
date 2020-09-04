import logo from "../../assets/images/ipay.png";

const addLogo = () => {
  const image = document.createElement("img")!;
  image.src = logo;
  image.width = 100;
  image.alt = "IPay";

  const container = document.getElementById("ipay-logo-container")!;
  container.appendChild(image);
};

export default addLogo;
