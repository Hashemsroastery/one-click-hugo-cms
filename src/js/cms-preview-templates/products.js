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
          .nav-panel {
            background-color: #f5f5f5;
            padding: 10px 0;
            position: sticky;
            top: 0;
            z-index: 100;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
          }
          .nav-container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 15px;
          }
          .nav-buttons {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 8px;
          }
          .nav-btn {
            background-color: #6F4E37;
            color: white;
            border: none;
            border-radius: 4px;
            padding: 8px 12px;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: 0 2px 5px rgba(0,0,0,0.2);
            position: relative;
            overflow: visible;
            white-space: nowrap;
            font-size: 0.9rem;
          }
          .nav-btn:hover {
            transform: translateY(-3px) scale(1.05);
            box-shadow: 0 5px 15px rgba(0,0,0,0.3);
            z-index: 10;
          }
          .nav-btn[data-fullname]:hover::before {
            content: attr(data-fullname);
            position: absolute;
            bottom: 100%;
            left: 50%;
            transform: translateX(-50%);
            background: #6F4E37;
            color: white;
            padding: 6px 10px;
            border-radius: 4px;
            font-size: 0.9rem;
            white-space: nowrap;
            margin-bottom: 8px;
            pointer-events: none;
          }
        `}</style>
        
        <div className="nav-container">
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
        {productSections.map((section, index) => this.renderProductSection(section, index, getAsset))}
      </div>
    );
  }
}
