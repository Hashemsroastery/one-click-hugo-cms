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

  renderNavigationPanel = (productSections) => {
    const scrollToSection = (heading) => {
      const id = heading.replace(/[^\w\s]/gi, '').replace(/\s+/g, '-').toLowerCase();
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    };

    const getShortName = (heading) => {
      return heading
        .replace("Featured Coffee Beans", "Coffee")
        .replace("حبوب القهوة", "قهوة")
        .replace("Baladi products", "Baladi")
        .replace("منتجات بلدية", "بلدية")
        .replace("Spices", "Spices")
        .replace("بهارات", "بهارات")
        .replace("Herbs", "Herbs")
        .replace("أعشاب", "أعشاب")
        .replace("Seeds", "Seeds")
        .replace("بذور", "بذور")
        .replace("Raw nuts", "Raw Nuts")
        .replace("Roasted nuts", "Roasted Nuts")
        .replace("Dried fruits", "Dried Fruits")
        .replace("فواكه مجففة", "فواكه")
        .replace("Dates", "Dates")
        .replace("تمور", "تمور")
        .replace("Premium Chocolate", "Chocolate")
        .replace("Premium Malban", "Malban")
        .replace("Other products", "Others")
        .replace("منتجات أخرى", "أخرى");
    };

    return (
      <div className="bg-light-gray ph3 pv2 sticky top-0 z-1 shadow-1">
        <style jsx>{`
          .nav-btn {
            background-color: #6F4E37;
            color: white;
            border: none;
            border-radius: 4px;
            padding: 8px 12px;
            margin: 4px;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: 0 2px 5px rgba(0,0,0,0.2);
            position: relative;
            overflow: hidden;
          }
          .nav-btn:hover {
            transform: translateY(-3px) scale(1.05);
            box-shadow: 0 5px 15px rgba(0,0,0,0.3);
            z-index: 10;
          }
          .nav-btn::after {
            content: attr(data-fullname);
            position: absolute;
            bottom: 100%;
            left: 50%;
            transform: translateX(-50%);
            background: #6F4E37;
            color: white;
            padding: 4px 8px;
            border-radius: 4px;
            font-size: 14px;
            opacity: 0;
            transition: opacity 0.3s;
            white-space: nowrap;
            margin-bottom: 5px;
          }
          .nav-btn:hover::after {
            opacity: 1;
          }
        `}</style>
        
        <div className="mw7 center">
          <div className="flex flex-wrap justify-center">
            {productSections.map((section, index) => (
              <button
                onClick={() => scrollToSection(section.get("heading"))}
                className="nav-btn f5"
                key={index}
                data-fullname={section.get("heading")}
              >
                {getShortName(section.get("heading"))}
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
