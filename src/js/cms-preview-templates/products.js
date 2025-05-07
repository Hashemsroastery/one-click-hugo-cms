import React from "react";
import Jumbotron from "./components/jumbotron";

export default class ProductsPreview extends React.Component {
  renderProductSection = (section, index, getAsset) => (
    <div className="mw7 center ph3 pv3" key={index} id={section.get("heading").replace(/\s+/g, '-').toLowerCase()}>
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

  renderNavigationPanel = (productSections) => (
    <div className="mw7 center ph3 pt4 pb2 sticky top-0 bg-white z-1 shadow-1">
      <div className="overflow-x-auto">
        <div className="flex nowrap pb2">
          {productSections.map((section, index) => (
            <a 
              href={`#${section.get("heading").replace(/\s+/g, '-').toLowerCase()}`}
              className="f5 no-underline dib ph3 pv2 mr2 bg-light-gray hover-bg-light-blue hover-white br2"
              key={index}
            >
              {section.get("heading")}
            </a>
          ))}
        </div>
      </div>
    </div>
  );

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
