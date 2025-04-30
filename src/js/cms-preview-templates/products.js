import React from "react";
import Jumbotron from "./components/jumbotron";

export default class ProductsPreview extends React.Component {
  renderProductSection = (section, index, getAsset) => (
    <div className="mw7 center ph3 pv4" key={index}>
      <h2 className="f3 b mb3">{section.get("heading")}</h2>
      <div className="flex flex-wrap mhn1">
        {(section.get("products") || []).map((product, i) => (
          <div className="w-100 w-33-ns ph1 mb4" key={i}>
            <img src={getAsset(product.get("image"))} alt="" className="db mb2 center" style={{width: "100%"}} />
            <p className="tc">{product.get("description")}</p>
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
