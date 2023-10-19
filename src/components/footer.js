const Footer = () => {
  return (
    <div id="footer-cont">
      <div className="footer-section" id="footer-left">
        <p>Coin Purse &#169; Eric Culley</p>
        <a id="nomics-link" href="https://www.coingecko.com/">
          Pricing Data Provided By Coin Gecko
        </a>
      </div>
      <div id="vert-rule"></div>
      <div className="footer-section" id="footer-right">
        <a href="https://github.com/ericulley/coin_purse">GitHub</a>
        <a href="https://www.linkedin.com/in/ericculley">LinkedIn</a>
        <a href="https://ericulley.github.io/portfolio">Portfolio</a>
      </div>
    </div>
  );
};

export default Footer;
