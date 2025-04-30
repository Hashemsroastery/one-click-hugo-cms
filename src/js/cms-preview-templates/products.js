import React from "react";
import Jumbotron from "./components/jumbotron";

export default class ProductsPreview extends React.Component {
  renderProductSection = (section, index, getAsset) => (
    <div className="mw7 center ph3 pv5" key={index}>
      <h2 className="f2 b mb4 tc">{section.get("heading")}</h2>
      <div className="flex flex-wrap mhn1">
        {(section.get("products") || []).map((product, i) => (
          <div className="w-100 w-33-ns ph2 mb5" key={i}>
            <img
              src={getAsset(product.get("image"))}
              alt=""
              className="db mb3 center br2 shadow-1"
              style={{ width: "100%", maxWidth: "340px", height: "auto" }}
            />
            <p className="tc f5 lh-copy">{product.get("description")}</p>
          </div>
        ))}
      </div>
    </div>
  );

  render() {
    const {entry, getAsset} = this.props;
    const image = getAsset(entry.getIn(["data", "image"]));
    const productSections = entry.getIn(["data", "product_sections"]) || [];

    return (
      <div>
        <Jumbotron image={image} title={entry.getIn(["data", "title"])} />
        {productSections.map((section, index) => this.renderProductSection(section, index, getAsset))}
      </div>
    );
  }
}
