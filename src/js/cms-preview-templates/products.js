import React from "react";
import Jumbotron from "./components/jumbotron";

export default class ProductsPreview extends React.Component {
  renderProductSection = (section, index, getAsset) => (
    <div className="mw7 center ph3 pv3" key={index} id={section.get("heading").replace(/[^\w\s]/gi, '').replace(/\s+/g, '-').toLowerCase()}>
      <h2 className="f2 b mb3 tc">{section.get("heading")}</h2>
      <div className="product-grid">
        {(section.get("products") || []).map((product, i) => (
          <div className="product-item" key={i}>
            <img
              src={getAsset(product.get("image"))}
              alt=""
              className="product-image"
            />
            <p className="tc f4 lh-copy">{product.get("description")}</p>
          </div>
        ))}
      </div>
    </div>
  );

  renderNavigationPanel = (productSections) => {
    const scrollToSection = (heading) => {
      const id = heading.replace(/[^\w\s]/gi, '').replace(/\s+/g, '-').toLowerCase();
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    };

    return (
      <div className="nav-panel">
        <style jsx>{`
          .nav-btn {
            background-color: #6F4E37;
            color: white;
            border: none;
            border-radius: 4px;
            padding: 10px 12px;
            margin: 4px 0;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: 0 2px 5px rgba(0,0,0,0.2);
            position: relative;
            overflow: visible;
            white-space: normal;
            text-overflow: clip;
            font-size: 0.9rem;
            width: 100%;
            text-align: left;
            word-break: break-word;
            line-height: 1.4;
          }
          
          .nav-btn:hover {
            transform: translateX(5px) scale(1.02);
            box-shadow: 0 5px 15px rgba(0,0,0,0.3);
            z-index: 10;
          }
          
          .nav-btn[data-fullname]:hover::after {
            content: attr(data-fullname);
            position: absolute;
            left: 100%;
            top: 50%;
            transform: translateY(-50%);
            background: #6F4E37;
            color: white;
            padding: 6px 10px;
            border-radius: 4px;
            font-size: 0.9rem;
            white-space: nowrap;
            margin-left: 8px;
            pointer-events: none;
            z-index: 1000;
            min-width: max-content;
          }
          
          .nav-panel {
            background-color: transparent;
            padding: 20px 10px;
            position: fixed;
            left: 0;
            top: 320px; /* Increased to appear well below title/cover */
            height: calc(100vh - 320px); /* Adjusted to match */
            width: 180px;
            z-index: 100;
            overflow-y: auto;
          }
          
          .nav-buttons {
            display: flex;
            flex-direction: column;
          }
          
          .product-grid {
            display: flex;
            flex-wrap: wrap;
            margin: 0 -0.5rem;
          }
          
          .product-item {
            width: 100%;
            padding: 0 0.5rem;
            margin-bottom: 2rem;
          }
          
          .product-image {
            width: 100%;
            height: 250px;
            object-fit: cover;
            border-radius: 4px;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
          }
          
          .content-with-nav {
            margin-left: 200px;
            padding: 20px;
          }
          
          @media (min-width: 600px) {
            .product-item {
              width: 50%;
            }
            .product-image {
              height: 300px;
            }
          }
          
          @media (min-width: 900px) {
            .product-item {
              width: 33.333%;
            }
            .product-image {
              height: 350px;
            }
          }
          
          @media (max-width: 768px) {
            .nav-panel {
              width: 150px;
              top: 260px; /* Increased for mobile */
              height: calc(100vh - 260px); /* Adjusted to match */
            }
            .content-with-nav {
              margin-left: 170px;
            }
          }
        `}</style>
        
        <div className="nav-buttons">
          {productSections.map((section, index) => (
            <button
              onClick={() => scrollToSection(section.get("heading"))}
              className="nav-btn"
              key={index}
              data-fullname={section.get("heading")}
            >
              {section.get("heading")}
            </button>
          ))}
        </div>
      </div>
    );
  };

  render() {
    const {entry, getAsset} = this.props;
    const image = getAsset(entry.getIn(["data", "image"]));
    const productSections = entry.getIn(["data", "product_sections"]) || [];
    const showNavigationPanel = entry.getIn(["data", "navigation_panel"]);

    return (
      <div>
        <Jumbotron image={image} title={entry.getIn(["data", "title"])} />
        {showNavigationPanel && this.renderNavigationPanel(productSections)}
        <div className={showNavigationPanel ? "content-with-nav" : ""}>
          {productSections.map((section, index) => this.renderProductSection(section, index, getAsset))}
        </div>
      </div>
    );
  }
}
