import React from "react";
import Jumbotron from "./components/jumbotron";

export default class ProductsPreview extends React.Component {
  renderProductSection = (section, index, getAsset) => (
    <div className="mw7 center ph3 pv3" key={index} id={section.get("heading").replace(/[^\w\s]/gi, '').replace(/\s+/g, '-').toLowerCase()}>
      <h2 className="f2 b mb3 tc">{section.get("heading")}</h2>
      <div className="flex flex-wrap mhn1">
        {(section.get("products") || []).map((product, i) => (
          <div className="w-100 w-33-ns ph2 mb4" key={i}>
            <img
              src={getAsset(product.get("image"))}
              alt=""
              className="db mb2 center br2 shadow-1"
              style={{
                width: "100%",
                maxWidth: "450px",
                height: "350px",
                objectFit: "cover",
              }}
            />
            <p className="tc f4 lh-copy">{product.get("description")}</p>
          </div>
        ))}
      </div>
    </div>
  );

  getDisplayName = (heading) => {
    if (heading.includes("Featured Coffee Beans")) return "Coffee";
    if (heading.includes("حبوب القهوة")) return "قهوة";
    if (heading.includes("Baladi products")) return "Baladi";
    if (heading.includes("منتجات بلدية")) return "بلدية";
    if (heading.includes("Spices")) return "Spices";
    if (heading.includes("بهارات")) return "بهارات";
    if (heading.includes("Herbs")) return "Herbs";
    if (heading.includes("أعشاب")) return "أعشاب";
    if (heading.includes("Seeds")) return "Seeds";
    if (heading.includes("بذور")) return "بذور";
    if (heading.includes("Raw nuts")) return "Raw Nuts";
    if (heading.includes("Roasted nuts")) return "Roasted Nuts";
    if (heading.includes("Dried fruits")) return "Dried Fruits";
    if (heading.includes("فواكه مجففة")) return "فواكه";
    if (heading.includes("Dates")) return "Dates";
    if (heading.includes("تمور")) return "تمور";
    if (heading.includes("Premium Chocolate")) return "Chocolate";
    if (heading.includes("Premium Malban")) return "Malban";
    if (heading.includes("Other products")) return "Others";
    if (heading.includes("منتجات أخرى")) return "أخرى";
    return heading.split(" ")[0]; // Fallback to first word
  };

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
            padding: 8px 12px;
            margin: 4px 0;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: 0 2px 5px rgba(0,0,0,0.2);
            position: relative;
            overflow: visible;
            white-space: nowrap;
            font-size: 0.9rem;
            width: 100%;
            text-align: left;
          }
          .nav-btn:hover {
            transform: translateX(5px) scale(1.02);
            box-shadow: 0 5px 15px rgba(0,0,0,0.3);
            z-index: 10;
          }
          .nav-btn[data-fullname]:hover::before {
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
          }
          .nav-panel {
            background-color: #f5f5f5;
            padding: 20px 10px;
            position: fixed;
            left: 0;
            top: 0;
            height: 100vh;
            width: 180px;
            z-index: 100;
            box-shadow: 2px 0 5px rgba(0,0,0,0.1);
            overflow-y: auto;
          }
          .nav-buttons {
            display: flex;
            flex-direction: column;
          }
          .content-with-nav {
            margin-left: 200px;
            padding: 20px;
          }
          @media (max-width: 768px) {
            .nav-panel {
              width: 150px;
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
              {this.getDisplayName(section.get("heading"))}
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
